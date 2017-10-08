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


@Component({
  selector: 'app-current-detail',
  templateUrl: './current-detail.component.html',
  styleUrls: ['./current-detail.component.scss'],
  providers: [PaymentService],
})


export class CurrentDetailComponent implements OnInit, OnDestroy {

  private trip: Trip;
  private isPast: boolean = false;
  private isUpcoming: boolean = false;
  private usersShare: string[] = [];
  private selectedTrip: Trip;
  private showMap: boolean = null;
  private nextStop: any;

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
      this.isPast = trip.past;
      this.isUpcoming = trip.upcoming;

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
    console.log(this.nextStop);

    if (this.trip.status != 'done') {
      this.tripsService.getFirebaseToken().subscribe((resp: string) => {
        //console.log('got token');
        //console.log(this.afAuth.auth.signInWithCustomToken(resp));
      });
      //console.log('subscribing');
      var firebase_path = '/orders/v1/' + this.trip.orderId;
      //console.log(firebase_path);
      this.firebaseObject = this.firebaseDb.object(firebase_path, { preserveSnapshot: true });
      this.firebaseObject.subscribe(snapshot => {
        let data_bundle : any = JSON.parse(snapshot.val());
        this.trip = new Trip();
        this.trip.createByJson(data_bundle);
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
      console.log(trip.orderRealId);
      this.tripsService.removeTrip(trip.orderRealId).subscribe((resp: any) => {
        this.tripsService.refreshTrips();
      });
    }, (reason) => {

    });
  }

  public initiatePayment(trip: Trip) {
      this.paymentService.initiatePayment(trip);
  }

}
