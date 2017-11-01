import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Trip } from '../../../shared/models/trip.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { TripsService } from '../../../shared/services/TripsService';
import { Tabs } from '../../../shared/models/tabs.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PaymentService } from '../../../shared/services/paymentService';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

const FIREBASE_ORDER_UPDATES_PATH = "/orders/v1/";

@Component({
  selector: 'app-current-detail',
  templateUrl: './current-detail.component.html',
  styleUrls: ['./current-detail.component.scss'],
  providers: [PaymentService],
})


export class CurrentDetailComponent implements OnInit, OnDestroy {

  public trip: Trip;
  public isPast: boolean = false;
  public isUpcoming: boolean = false;
  public usersShare: string[] = [];
  public selectedTrip: Trip;
  public showMap: boolean = null;
  public nextStop: any;
  public showCompleteTrip: boolean = false;
  firebaseObject: FirebaseObjectObservable<any>;
  firebaseDb: AngularFireDatabase;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private sidebarService: SidebarService,
              private tripsService: TripsService,
              private modalService: NgbModal,
              private _http: Http,
              public paymentService: PaymentService,
              firebaseDb: AngularFireDatabase,
              public afAuth: AngularFireAuth,
  ) {
    this.firebaseDb = firebaseDb;
    this.route.data.subscribe(trip => {
      this.trip = <Trip>trip.details;
      //console.log(this.trip);
      this.isPast = trip.past;
      this.isUpcoming = trip.upcoming;
      this.showCompleteTrip = (this.trip.status == 'done');

      if (this.tripsService.currentTab === Tabs.PastTrips)
        this.isPast = true;
      else if (this.tripsService.currentTab === Tabs.Upcoming)
        this.isUpcoming = true;

      this.sidebarService.showSidebar = false;
      this.titleService.setTitle('Track - ' + this.trip.orderId);
    });
  }

  ngOnInit() {
    this.nextStop = this.trip.getNextStop();
    //console.log(this.nextStop);

    if (this.trip.status != 'done') {
      this.tripsService.getFirebaseToken().subscribe((resp: string) => {
        //console.log('got token');
        //console.log(this.afAuth.auth.signInWithCustomToken(resp));
      });
      //console.log('subscribing');
      const firebase_path = FIREBASE_ORDER_UPDATES_PATH + this.trip.orderId;
      //console.log(firebase_path);
      this.firebaseObject = this.firebaseDb.object(firebase_path, { preserveSnapshot: true });
      this.firebaseObject.subscribe(snapshot => {
      let data_bundle : any = JSON.parse(snapshot.val());
        // Sometimes data in firebase may not be there, but
        // this call still comes here. Handling that situation
        if (data_bundle == null) {
            return;
        }
        let trip = new Trip();
        trip.createByJson(data_bundle);

        //console.log(trip.last_modified, this.trip.last_modified);
        // Compare this times and only update if the trip data is newer.
        // Firebase just sends an update initially
        if (trip.last_modified > this.trip.last_modified)
          this.trip = trip;
        /*
        //console.log(this.trip.route.length);
        let finishedDistance: number = this.trip.finishedDistance;
        let estimatedDistance: number = this.trip.estimatedDistance;
        let pickup_distance: number = this.trip.pickup_distance;
        this.trip = new Trip();
        this.trip.createByJson(data_bundle);
        //console.log(this.trip.route.length);
        this.trip.finishedDistance = finishedDistance;
        this.trip.estimatedDistance = Math.max(finishedDistance, estimatedDistance);

        if (this.trip.status == 'ongoing') {
          if (this.trip.pickUp.time == '') {
          this.trip.pickup_distance = Math.max(pickup_distance, this.trip.pickup_distance) ;
          }
        }
        */
      });
    }
  }

  ngOnDestroy() {
    this.sidebarService.showSidebar = true;
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

  moveTostartPage() {
    this.router.navigate(["mytrips"]);
  }

  moveToInvoice(orderId: string) {
    this.router.navigate(['invoice', orderId]);
  }

  open(content, trip: Trip) {
    this.selectedTrip  = trip;
    this.usersShare = [];
    this.modalService.open(content).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  setUsersList(users: string[]) {
    this.usersShare = users;
  }

  tripDoneOpen(content, trip: Trip) {
    this.selectedTrip  = trip;
    if (!this.isPast && !this.isUpcoming) {
      this.modalService.open(content).result.then(
        (result) => {},
        (reason) => {}
      );
    }
  }

  public cancelBooking(cancelBooking, trip: Trip) {
    this.selectedTrip = trip;
    this.modalService.open(cancelBooking).result.then((result) => {
      //console.log(trip.orderRealId);
      this.tripsService.removeTrip(trip.orderRealId).subscribe((resp: any) => {
        this.tripsService.refreshTrips();
      });
    }, (reason) => {

    });
  }

  public initiatePayment(trip: Trip) {
      this.paymentService.initiatePayment(trip);
  }

  public toggleShowCompleteTrip() {
    this.showCompleteTrip = !this.showCompleteTrip;
  }

  updateFinishedDistance(distanceUpdate) {
    //console.log('Receving Emit', this.trip.finishedDistance, distanceUpdate);
    // Update distance only if trip is ongoing
    // TODO: update the remaining distance based on current location
    // of driver and the remaining stops
    if (this.trip.status == 'ongoing') {
        //console.log('this.trip.pickUp.time', this.trip.pickUp.time);
      if (this.trip.pickUp.status == 'done') {
        this.trip.finishedDistance += distanceUpdate;
        //console.log('Updating finished Distance');
      } else {
        this.trip.pickup_distance_done += distanceUpdate;
        //console.log('Updating pickup Distance done');
      }
    }
  }

  public getDate(str: string) {
    return str.replace(/-/g, ' ');
  }

}
