import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { DataService } from "../../../shared/services/data.service";
import { TripsService } from '../../../shared/services/TripsService';
import { DirectionsMapDirective } from "../../directives/map-directions.directive";
import { MapsAPILoader } from '@agm/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { SimpleChanges } from '@angular/core';

declare var google: any;

/**********************************************
 * Parameters to process location updates and
 * filter out noise */
const MIN_DISTANCE_DELTA_METERS = 10;
const MIN_TIMEDELTA_MS = 1000;
const MAX_SPEED_KMPH = 100;
const AUTO_ZOOMOUT_SECONDS = 10;
/*********************************************/

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // MAP CONFIGURATION

  lat: number;
  lng: number;

  bounds: any;
  truck_lat: number=0;
  truck_lng: number=0;
  truck_marker: any;
  // styles = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 40 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -10 }, { "lightness": 30 }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 10 }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 60 }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }]
  styles = [{ "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#447530" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f8c967" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#e9bc62" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#e98d58" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] }];

  map: any;
  zoom: number = 12;

  // MARKER ICON CONFIGURATION

  truckIcon: string = '/assets/Assets-Common/truck_live_tracking.png';
  doneMarkerImg: string = '/assets/Assets-Common/Done-Marker@1x.svg';
  pendingMarkerImg: string = '/assets/Assets-Common/StopBig@1x.svg';
  pickupMarkerImg: string = '/assets/Assets-Common/Blue-Marker@2x.png';
  dropoffMarkerImg: string = '/assets/Assets-Common/Purple-Marker@2x.png';
  markerIterator: any = [];
  leftSVG = "<svg width='35px' height='35px' viewBox='0 0 40 40' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> \ <title>RedMarkerWithNumber@1x</title> \ <desc>Created with Sketch.</desc> \ <defs></defs> \ <g id='Assets' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> \ <g id='Assets-Common' transform='translate(-336.000000, -417.000000)'> \ <g id='RedMarkerWithNumber' transform='translate(336.000000, 417.000000)'> \ <g id='Group' transform='translate(4.000000, 1.000000)'> \ <g id='Shadow' transform='translate(6.600000, 28.826087)' fill='#C9D2D6'> \ <path d='M19.8,4.844634 C19.8,7.51914323 15.3682617,9.68926799 9.90141408,9.68926799 C4.43173832,9.68926799 0,7.51914323 0,4.844634 C0,2.1680055 4.43173832,0 9.90141408,0 C15.3682617,0 19.8,2.1680055 19.8,4.844634' id='Fill-1'></path> \ </g> \ <path d='M10.7047569,32.8376585 L16.5,37.3043478 L22.2952431,32.8376585 C28.5491089,30.4263894 33,24.2256175 33,16.9565217 C33,7.59169337 25.6126984,0 16.5,0 C7.38730163,0 0,7.59169337 0,16.9565217 C0,24.2256175 4.4508911,30.4263894 10.7047569,32.8376585 Z' id='Combined-Shape' fill='#141515'></path> \ <rect id='Rectangle' fill='#D8D8D8' x='6.6' y='6.7826087' width='6.6' height='6.7826087'></rect> \ <ellipse id='Oval-2' fill='#FC3446' cx='16.5' cy='16.9565217' rx='14.85' ry='15.2608696'></ellipse> \ </g> \ <text id='2' font-family='Heebo,Heebo-Bold' font-size='24' font-weight='bold' letter-spacing='-0.300000012' fill='#FFFFFF'> \ <tspan x='13.2476563' y='26'>";
  rightSVG: string = "</tspan> \ </text> \ <rect id='bounds' stroke='#979797' stroke-width='0.01' x='0.005' y='0.005' width='39.99' height='39.99'></rect> \ </g> \ </g> \ </g> \ </svg>";
  fullSVG: string;
  svgICO: string;
  svgIconArray: any = [];
  // VARIABLES

  getMapData: any;
  distanceData: any;
  markers: any = [];
  trace: any = [];
  routes: any = [];

  strokeWeight: number = 4;
  strokeColor: string = '#056DB4';

  @Input() trip: Trip;
  @Input() scrollwheel: boolean = true;

  // Emits the distance travelled from last location to the latest
  // location update received from firebase
  @Output() distanceUpdate = new EventEmitter<number>(); //number = 0;

  firebaseObject: FirebaseObjectObservable<any>;
  firebaseDb: AngularFireDatabase;
  lastLocation: any = null;
  lastFitZoomTime: any = null;

  constructor(
    private _dataService: DataService,
    firebaseDb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private mapsAPILoader: MapsAPILoader,
    private tripsService: TripsService,
  ) {
      //console.log(afAuth);
      this.firebaseDb = firebaseDb;
  }

  ngOnInit() {
    this.myInit();

    this.mapsAPILoader.load().then(() => {
    });

    this.trace = this.trip.route;
    this.startRealTimeUpdates();
  }

  myInit() {

    // this.distanceData = this.trip;
    // Setting up map center location (pickup position)
    this.lat = this.trip.pickUp.location.lat;
    this.lng = this.trip.pickUp.location.lng;
    this.trip.pickUp.icon = this.pickupMarkerImg;
    this.trip.dropoff.icon = this.dropoffMarkerImg;
    //console.log(this.trace);

    // Pushing to array with all truck positions (pickup, dropoff, stops)
    this.markers = [];
    this.markers.push(this.trip.pickUp, this.trip.dropoff);

    this.trip.stops.forEach((obj, index) => {
      this.markerIterator = index + 1;
      this.fullSVG = this.leftSVG + this.markerIterator + this.rightSVG;
      obj.icon = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(this.fullSVG);
      this.markers.push(obj);
    });

    this.markers.forEach((obj, index) => {
      if(obj.status == 'pending'){
        this.markerIterator = index + 1;
        this.fullSVG = this.leftSVG + this.markerIterator + this.rightSVG;
        this.svgICO = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(this.fullSVG);
        this.svgIconArray.push(this.svgICO);
      }
    });

    // Making an array with origin and destination coordinates
    for (let i = 0; i < this.markers.length - 1; i++) {
      this.routes.push(
        [[this.markers[i].location.lat], [this.markers[i].location.lng],
          [this.markers[i + 1].location.lat], [this.markers[i + 1].location.lng]]
      );
    }
    //console.log(this);

    //console.log(this);
  };

  getBounds () {
    let bounds: any = new google.maps.LatLngBounds();
    bounds.extend(this.trip.pickUp.location);
    bounds.extend(this.trip.dropoff.location);
    this.trip.stops.forEach((obj, index) => {
      bounds.extend(obj.location);
    });
    return bounds;
  }

  fitBounds() {
    this.map.fitBounds(this.getBounds());
  }

  fitBoundsWithDriver(driverLocation: any) {
    let now: any = new Date();
    if (this.lastFitZoomTime == null || ((now - this.lastFitZoomTime)/1000 > AUTO_ZOOMOUT_SECONDS)) {
      let bounds : any = this.getBounds();
      bounds.extend(driverLocation);
      this.map.fitBounds(bounds);
    }
  }
  onMapReady (map) {
    //console.log('onmapready');
    this.map = map;
    //console.log(map);
    if (this.trip.status == 'ongoing') {
      this.truck_marker = new google.maps.Marker({
        position: {lat: this.truck_lat, lng: this.truck_lng},
        map: this.map,
        icon: this.truckIcon,
      });
      if (this.trip.route.length > 0) {
        this.truck_marker.setPosition(this.trip.route[this.trip.route.length -1]);
        this.fitBoundsWithDriver(this.trip.route[this.trip.route.length -1]);
      } else {
        this.fitBounds();
      }
    } else {
      this.fitBounds();
    }
  }

  /* Sanity check if latest received location is actually up to date.
   */
  private isNewLocationNewer (old_location, new_location) {
    //console.log(old_location, new_location);
    if (old_location == null) {
      return true;
    } else if (new_location.accuracy_meters > 30) {
      return false;
    }
    let old_: any = new Date(old_location.gpstimestamp);
    let new_: any = new Date(new_location.gpstimestamp);
    let distance_meters =  google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(parseFloat(old_location.lat), parseFloat(old_location.lon)),
      new google.maps.LatLng(parseFloat(new_location.lat), parseFloat(new_location.lon)),
    );
    //console.log(old_, new_);
    let timedelta_ms: number = new_ - old_;
    let speed_kmph: number = (distance_meters * 60 * 60) /timedelta_ms;
    //console.log(timedelta_ms, distance_meters, speed_kmph);
    let newer : boolean = (timedelta_ms > MIN_TIMEDELTA_MS && 
      distance_meters > MIN_DISTANCE_DELTA_METERS &&
      speed_kmph < MAX_SPEED_KMPH
    );

    if (newer) {
      //console.log('Emitting finishedDistance');
      this.distanceUpdate.emit(distance_meters/1000);
    }
    //console.log(newer);
    //console.log('isNewLocationNewer', flag);
    return newer;
  }

  startRealTimeUpdates() {
    if (this.trip.status != 'ongoing') {
      return;
    }

    this.tripsService.getFirebaseToken().subscribe((resp: string) => {
      //console.log('got token');
      //console.log(this.afAuth.auth.signInWithCustomToken(resp));
    });
    //console.log('subscribing');
    var firebase_path = '/active_drivers/' + this.trip.driverMobile;
    //console.log(firebase_path);
    this.firebaseObject = this.firebaseDb.object(firebase_path, { preserveSnapshot: true });
    this.firebaseObject.subscribe(snapshot => {
      let data_bundle : any = JSON.parse(snapshot.val());
      //console.log(data_bundle);
      if (data_bundle != null && this.truck_marker != null && this.isNewLocationNewer(this.lastLocation, data_bundle.location)) {
        let positionObject : any = {
          lat : parseFloat(data_bundle.location.lat),
          lng : parseFloat(data_bundle.location.lon),
        };
        this.lastLocation = data_bundle.location;
        this.truck_marker.setPosition(positionObject);
        this.fitBoundsWithDriver(positionObject);

        // Push point to polyline only if it is ongoing trip
        if (this.trip.status == 'ongoing' && this.trip.pickUp.time != '') {
          this.trace.push(positionObject);
        }
      }
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {

    this.trip = changes.trip.currentValue;
    this.myInit();
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values

  }

}
