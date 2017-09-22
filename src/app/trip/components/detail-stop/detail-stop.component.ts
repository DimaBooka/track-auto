import { Component, Input, OnInit } from '@angular/core';
import { Stop } from '../../../shared/models/stop.model';

@Component({
  selector: 'app-detail-stop',
  templateUrl: './detail-stop.component.html',
  styleUrls: ['./detail-stop.component.scss']
})
export class DetailStopComponent implements OnInit {

  @Input() stop: Stop;
  @Input() lastStop: boolean = false;
  @Input() name: string;
  @Input() index: number;
  constructor() {}

  ngOnInit() {}
}
