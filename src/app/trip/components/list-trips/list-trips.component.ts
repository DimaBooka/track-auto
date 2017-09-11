import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss']
})
export class ListTripsComponent implements OnInit {

  @Input() trips: Trip[] = [];
  @Input() showMap: boolean = false;
  @Input() done: boolean = false;
  constructor() {}

  ngOnInit() {}

}
