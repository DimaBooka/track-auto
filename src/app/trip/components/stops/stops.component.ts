import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { Stop } from '../../../shared/models/stop.model';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.scss']
})
export class StopsComponent implements OnInit {

  @Input() trip: Trip;
  @Input() vertical: boolean = false;
  private stops: Stop[];
  private calcs: any;
  constructor() { }

  ngOnInit() {
    this.calcs = this.trip.getStopsCalculates();
    this.stops = this.trip.stops;
  }

}
