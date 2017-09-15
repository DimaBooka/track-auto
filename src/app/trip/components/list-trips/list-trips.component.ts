import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../../shared/services/paymentService';


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
  constructor(
      private router: Router,
      private modalService: NgbModal,
      public paymentService: PaymentService
  ) {}

  ngOnInit() {}

  public moveToDetails(orderId) {
    if (!this.bookingMode)
      this.router.navigate(['past', orderId]);
    else
      this.router.navigate(['upcoming', orderId]);
  }

  public moveToInvoice(orderId) {
    this.router.navigate(['invoice', orderId]);
  }

  public open(content, trip: Trip) {
    this.selectedTrip  = trip;
    this.usersShare = [];
    this.modalService.open(content).result.then((result) => {
      console.log(trip.orderId, this.usersShare);
    }, (reason) => {

    });
  }

  public setUsersList(users: string[]) {
    this.usersShare = users;
  }

  public cancelBooking(cancelBooking, trip: Trip) {
    this.selectedTrip = trip;
    this.modalService.open(cancelBooking).result.then((result) => {
      console.log(trip.orderId);
    }, (reason) => {

    });
  }

  public initiatePayment(trip: Trip) {
      this.paymentService.initiatePayment(trip);
  }
}
