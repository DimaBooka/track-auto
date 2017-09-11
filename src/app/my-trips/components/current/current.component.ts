import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  @Input() trips: Trip[];
  constructor() { }

  ngOnInit() {
  }

}
