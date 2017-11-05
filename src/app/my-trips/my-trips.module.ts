import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './components/current/current.component';
import { PastComponent } from './components/past/past.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { MytripsMainComponent } from './components/mytrips-main/mytrips-main.component';
import { SharedModule } from "../shared/shared.module";
import { TripModule } from '../trip/trip.module';
import { CurrentDetailComponent } from './components/current-detail/current-detail.component';
import { InvoiceTripComponent } from './components/invoice-trip/invoice-trip.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    TripModule,
    SharedModule,
    NgxQRCodeModule
  ],
  declarations: [
    CurrentComponent,
    PastComponent,
    UpcomingComponent,
    MytripsMainComponent,
    CurrentDetailComponent,
    InvoiceTripComponent],
  exports: [
    CurrentComponent,
    PastComponent,
    UpcomingComponent,
    MytripsMainComponent,
    CurrentDetailComponent,
    InvoiceTripComponent
  ]
})
export class MyTripsModule { }
