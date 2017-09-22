import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import {DataService} from "../../../shared/services/data.service";
import { TripsService } from '../../../shared/services/TripsService';
import {DirectionsMapDirective} from "../../directives/map-directions.directive";
import { MapsAPILoader } from '@agm/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

declare var google: any;
var bounds: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // MAP CONFIGURATION

  lat: number;
  lng: number;

  truck_lat: number=0;
  truck_lng: number=0;
  truck_marker: any;
  // styles = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 40 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -10 }, { "lightness": 30 }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 10 }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 60 }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }]
  styles = [{ "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#447530" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f8c967" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#e9bc62" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#e98d58" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] }];

  map: any;
  zoom: number = 12;
  scrollwheel: boolean = false;

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
  routes: any = [];

  @Input() trip: Trip;

  firebaseObject: FirebaseObjectObservable<any>;
  firebaseDb: AngularFireDatabase;
  data_bundle : any;

  constructor(
    private _dataService: DataService,
    firebaseDb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private mapsAPILoader: MapsAPILoader,
    private tripsService: TripsService,
  ) {
      console.log(afAuth);
      this.firebaseDb = firebaseDb;
  }

  ngOnInit() {

    // this.distanceData = this.trip;
    // Setting up map center location (pickup position)
    this.lat = this.trip.pickUp.location.lat;
    this.lng = this.trip.pickUp.location.lng;
    this.trip.pickUp.icon = this.pickupMarkerImg;
    this.trip.dropoff.icon = this.dropoffMarkerImg;

    // Pushing to array with all truck positions (pickup, dropoff, stops)
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
    console.log(this);

    this.mapsAPILoader.load().then(() => {
    });

      console.log(this);
      if (this.trip.status == 'ongoing') {
          this.tripsService.getFirebaseToken().subscribe((resp: string) => {
              console.log('got token');
              console.log(this.afAuth.auth.signInWithCustomToken(resp));
          });
          console.log('subscribing');
          var firebase_path = '/active_drivers/' + this.trip.driverMobile;
          //console.log(firebase_path);
          this.firebaseObject = this.firebaseDb.object('/active_drivers/' + this.trip.driverMobile, { preserveSnapshot: true });
          this.firebaseObject.subscribe(snapshot => {
              this.data_bundle = JSON.parse(snapshot.val());
              //console.log(this.data_bundle);
              if (this.data_bundle != null && this.truck_marker != null) {
                  this.truck_marker.setPosition({
                      lat : parseFloat(this.data_bundle.location.lat),
                      lng : parseFloat(this.data_bundle.location.lon),
                  });
              }
          });
      }
  };

    onMapReady (map) {
        console.log('onmapready');
        this.map = map;
        console.log(map);
        if (this.trip.status == 'ongoing') {
            this.truck_marker = new google.maps.Marker({
                position: {lat: this.truck_lat, lng: this.truck_lng},
                map: this.map,
                icon: this.truckIcon,
            });
        }
        bounds = new google.maps.LatLngBounds();
        bounds.extend(this.trip.pickUp.location);
        bounds.extend(this.trip.dropoff.location);
        this.trip.stops.forEach((obj, index) => {
            bounds.extend(obj.location);
        });
        this.map.fitBounds(bounds);
    }

}
