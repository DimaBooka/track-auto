import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() trip: Trip;
  constructor() { }

  ngOnInit() {
  }

}
