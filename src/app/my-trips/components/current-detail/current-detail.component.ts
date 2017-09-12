import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { TripsService } from '../../../shared/services/TripsService';
import { Tabs } from '../../../shared/models/tabs.enum';

@Component({
  selector: 'app-current-detail',
  templateUrl: './current-detail.component.html',
  styleUrls: ['./current-detail.component.scss']
})
export class CurrentDetailComponent implements OnInit, OnDestroy {

  private trip: Trip;
  private isPast: boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private sidebarService: SidebarService,
              private tripsService: TripsService) {
    this.route.data.subscribe(trip => {
      this.trip = <Trip>trip.details;
      this.isPast = trip.past;
      if (this.isPast)
        this.tripsService.currentTab = Tabs.PastTrips;
      this.sidebarService.showSidebar = false;
    });
  }

  ngOnInit() {
    console.log(this.trip);
  }

  ngOnDestroy() {
    this.sidebarService.showSidebar = true;
  }

  moveTostartPage() {
    this.router.navigate(["my_trips"]);
  }
}
