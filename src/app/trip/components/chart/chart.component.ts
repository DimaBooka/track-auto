import { Component, Input, OnInit } from '@angular/core';
import { TripsSummary } from '../../../shared/models/trips-summary.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() data: TripsSummary;
  @Input() by: string;
  constructor() {}

  ngOnInit() {}

  getHeight(num, max) {
    let height = (125 * num) / max;
    return height > 1 ? height : 1;
  }

  getDate(date) {
    return date.replace(/-/g, " ");
  }
}
