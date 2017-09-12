import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss']
})
export class ListTripsComponent implements OnInit {

  @Input() trips: Trip[] = [];
  @Input() showMap: boolean = false;
  @Input() done: boolean = false;
  private shareTrip: Trip;
  private usersShare: string[];
  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit() {}

  moveToDetails(orderId) {
    this.router.navigate(['my_trips', orderId]);
  }

  open(content, trip: Trip) {
    this.shareTrip  = trip;
    this.usersShare = [];
    this.modalService.open(content).result.then((result) => {
      console.log(trip.orderId, this.usersShare);
    }, (reason) => {

    });
  }

  setUsersList(users: string[]) {
    this.usersShare = users;
    console.log(users);
  }


}
