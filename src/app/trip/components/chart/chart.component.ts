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
  private dataLength: number;
  constructor() {}

  ngOnInit() {
    this.dataLength = this.data.dataToChart.length
  }

  getHeight(num, max) {
    let height = (125 * num) / max;
    return height > 1 ? height : 1;
  }

  getDate(date) {
    return date.replace(/-/g, " ");
  }

  getMargin(i: number) {
    if (i < 3)
      return (3 - i) * 20;
    if (i > (this.dataLength - 4)) {
      return (-this.dataLength + i + 4) * 20;
    }
    return 0
  }
}
