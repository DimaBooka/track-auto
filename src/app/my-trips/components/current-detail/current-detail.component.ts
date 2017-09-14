import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { TripsService } from '../../../shared/services/TripsService';
import { Tabs } from '../../../shared/models/tabs.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private route: ActivatedRoute,
              private router: Router,
              private sidebarService: SidebarService,
              private tripsService: TripsService,
              private modalService: NgbModal) {
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
}
