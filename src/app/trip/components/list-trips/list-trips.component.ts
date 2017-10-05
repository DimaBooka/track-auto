import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../../shared/services/paymentService';
import { TripsService } from '../../../shared/services/TripsService';


@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss'],
  providers: [PaymentService],
})
export class ListTripsComponent implements OnInit {

  @Input() trips: Trip[] = [];
  @Input() showMap: boolean = false;
  @Input() done: boolean = false;
  @Input() bookingMode: boolean = false;
  private selectedTrip: Trip;
  private usersShare: string[];
  private datetime: any;
  private trackingURL: string = "";
  private bookingId: string = "";
  constructor(
      private router: Router,
      private modalService: NgbModal,
      public paymentService: PaymentService,
      public tripService: TripsService
  ) {}

  ngOnInit() {}

  public moveTostartPage() {
    this.router.navigate(['mytrips']);
  }

  public moveToDetails(orderId) {
    this.router.navigate(['track', orderId]);
  }

  public moveToInvoice(orderId) {
    this.router.navigate(['invoice', orderId]);
  }

  public open(content, trip: Trip) {
    this.selectedTrip  = trip;
    this.usersShare = [];
    this.modalService.open(content).result.then((result) => {
      console.log(trip.orderRealId, this.usersShare);
    }, (reason) => {

    });
  }

  public setUsersList(users: string[]) {
    this.usersShare = users;
  }

  public shareInvoice(shareInvoice, trip: Trip) {
    this.selectedTrip = trip;
	  console.log(trip);
    this.modalService.open(shareInvoice).result.then((result) => {
      console.log(trip.orderRealId);
      this.tripService.shareInvoice(trip.orderRealId, this.usersShare).subscribe((resp: any) => {
		  //this.tripService.refreshTrips();
      });
    }, (reason) => {

    });
  }

  public cancelBooking(cancelBooking, trip: Trip) {
    this.selectedTrip = trip;
    this.modalService.open(cancelBooking).result.then((result) => {
      console.log(trip.orderRealId);
      this.tripService.removeTrip(trip.orderRealId).subscribe((resp: any) => {
        this.tripService.refreshTrips();
      });
    }, (reason) => {

    });
  }

  public openRebooking(cancelBooking, rebookPopup, trip: Trip) {
    this.selectedTrip = trip;
    this.modalService.open(cancelBooking).result.then((result) => {
      console.log(this.datetime);
      this.tripService.rebookTrip(this.datetime, this.selectedTrip.orderRealId).subscribe((resp: any) => {
        this.bookingId = resp.bookingId;
        this.trackingURL = resp.trackingURL;
        this.tripRebookCreatedOpen(rebookPopup);
        this.tripService.refreshTrips();
      });
    }, (reason) => {

    });
  }

  public tripRebookCreatedOpen(content: any) {
    this.modalService.open(content).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  public initiatePayment(trip: Trip) {
      this.paymentService.initiatePayment(trip);
  }
}
