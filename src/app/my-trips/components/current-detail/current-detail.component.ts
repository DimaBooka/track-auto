import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { TripsService } from '../../../shared/services/TripsService';
import { Tabs } from '../../../shared/models/tabs.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var Razorpay: any;

@Component({
  selector: 'app-current-detail',
  templateUrl: './current-detail.component.html',
  styleUrls: ['./current-detail.component.scss']
})


export class CurrentDetailComponent implements OnInit, OnDestroy {

  private trip: Trip;
  private isPast: boolean = false;
  private isUpcoming: boolean = false;
  private usersShare: string[] = [];
  private selectedTrip: Trip;
  razorpay: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sidebarService: SidebarService,
              private tripsService: TripsService,
              private modalService: NgbModal,
              private _http: Http
  ) {
    this.route.data.subscribe(trip => {
      this.trip = <Trip>trip.details;
      this.isPast = trip.past;
      this.isUpcoming = trip.upcoming;
      if (this.isPast)
        this.tripsService.currentTab = Tabs.PastTrips;
      else if (this.isUpcoming)
        this.tripsService.currentTab = Tabs.Upcoming;

      this.sidebarService.showSidebar = false;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sidebarService.showSidebar = true;
  }

  moveTostartPage() {
    this.router.navigate(["mytrips"]);
  }

  moveToInvoice(orderId: number) {
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
      console.log(trip.orderId);
    }, (reason) => {

    });
  }

  public initiatePayment() {
      let amount: any = (this.trip.price * 100).toString();
	  let this_trip: any = this.trip;
	  let this_http: any = this._http;
      var options = {
          "key": 'rzp_test_fTKyjp0r9a2HEx', //'RAZORPAY_KEY_ID',
          "amount": amount,
          "name": "blowhorn",
          "description": "Logistic Services",
          "image": "/static/img/logo.png",
          "prefill": {
              "name": '', //profile_data.name,
              "email": '', //profile_data.email,
              "contact": '', //profile_data.mobile
          },
          "notes" : {
              "booking_id" : this_trip.orderId,
              "booking_key" : this_trip.orderKey,
              'type' : 'booking',
          },

          "handler": function (response) {
			  console.log(response);
              //this._http.get(API_ALL_TRIPS).map((resp: any) => {
              let data: any = {
                  'booking_key': this_trip.orderKey,
                  'txn_id': response.razorpay_payment_id,
                  'amount': amount,
                  'type': 'booking'
              };
			  console.log(data, this_http);
              this_http.post('localhost:8080/razorpay', data ).map((resp: any) => {
                  console.log(resp);
                  this_trip.paymentStatus = 'paid';
                  //let data_json: any = JSON.parse(resp);
                  /*
                          if(data_json['status'] == 'True'){
                              $('#status-placeholder').text("Payment Successful");
                              $("#status-placeholder").css("color", "green");
                          }
                          else {
                              $('#status-placeholder').text("Transaction Failed");
                              $("#status-placeholder").css("color", "red");
                          }
                   */
              }).subscribe();
          },
      };

      this.razorpay = new Razorpay(options);
      this.razorpay.open();

      /*
        constructor(private _tripsService: TripsService) {
    this.currentTab = this._tripsService.currentTab;
    this._tripsService.getAllTrip().subscribe((res: AllTrips) => {
      this.allTrips = res;
    });
       */
  }
}
