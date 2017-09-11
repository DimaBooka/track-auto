import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';

@Component({
  selector: 'app-detail-stops',
  templateUrl: './detail-stops.component.html',
  styleUrls: ['./detail-stops.component.scss']
})
export class DetailStopsComponent implements OnInit {

  @Input() trip: Trip;
  constructor() { }

  ngOnInit() {
  }

}
