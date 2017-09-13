import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss']
})
export class PastComponent implements OnInit {

  @Input() trips: Trip[];
  constructor() {}

  ngOnInit() {}
}
