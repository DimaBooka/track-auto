import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Trip } from '../../../shared/models/trip.model';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { ActivatedRoute, Router } from "@angular/router";
import { TripsService } from '../../../shared/services/TripsService';

@Component({
  selector: 'app-invoice-trip',
  templateUrl: './invoice-trip.component.html',
  styleUrls: ['./invoice-trip.component.scss']
})
export class InvoiceTripComponent implements OnInit, OnDestroy {

  private trip: Trip;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private sidebarService: SidebarService,
              private tripsService: TripsService) {
    this.route.data.subscribe(trip => {
      this.trip = <Trip>trip.details;
      this.sidebarService.showSidebar = false;
      this.titleService.setTitle('Invoice - ' + this.trip.orderId);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sidebarService.showSidebar = true;
  }


}
