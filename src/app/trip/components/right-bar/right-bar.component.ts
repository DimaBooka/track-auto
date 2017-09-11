import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() orderId: number;
  constructor(private router: Router) {}

  ngOnInit() {}

  moveToDetails() {
    this.router.navigate(['current', this.orderId]);
  }

}
