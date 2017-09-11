import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss']
})
export class RightBarComponent implements OnInit {

  @Input() truckType: string;
  @Input() driverName: string;
  @Input() driverMobile: string;
  @Input() horizontal: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
