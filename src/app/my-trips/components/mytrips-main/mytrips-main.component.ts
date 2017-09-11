import { Component, OnInit } from '@angular/core';
import { Tabs } from '../../../shared/models/tabs.enum';
import { TripsService } from '../../../shared/services/TripsService';
import { AllTrips } from '../../../shared/models/all-trips.model';

@Component({
  selector: 'app-mytrips-main',
  templateUrl: './mytrips-main.component.html',
  styleUrls: ['./mytrips-main.component.scss']
})
export class MytripsMainComponent implements OnInit {

  private tabs: any = Tabs;
  private currentTab: Tabs;
  private allTrips: AllTrips;

  constructor(private _tripsService: TripsService) {
    this.currentTab = this._tripsService.currentTab;
    this._tripsService.getAllTrip().subscribe((res: AllTrips) => {
      this.allTrips = res;
    });
  }

  public updateCurrentTab(tab: Tabs) {
    this.currentTab = tab;
  }

  ngOnInit() {
  }

}
