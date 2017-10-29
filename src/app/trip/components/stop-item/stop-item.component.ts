import { Component, Input, OnInit } from '@angular/core';
import { Stop } from '../../../shared/models/stop.model';
import { Pickup } from '../../../shared/models/pickup.model';
import { DropOff } from '../../../shared/models/dropoff.model';

@Component({
  selector: 'app-stop-item',
  templateUrl: './stop-item.component.html',
  styleUrls: ['./stop-item.component.scss']
})
export class StopItemComponent implements OnInit {

  @Input() position: string;
  @Input() stop: Stop | Pickup | DropOff;
  @Input() stopsLeft: number;
  @Input() stopsDone: number = 0;
  constructor() {}

  ngOnInit() {}
}
