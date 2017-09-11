import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './components/current/current.component';
import { PastComponent } from './components/past/past.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { MytripsMainComponent } from './components/mytrips-main/mytrips-main.component';
import { SharedModule } from "../shared/shared.module";
import { TripModule } from '../trip/trip.module';
import { CurrentDetailComponent } from './components/current-detail/current-detail.component';

@NgModule({
  imports: [
    CommonModule,
    TripModule,
    SharedModule
  ],
  declarations: [
    CurrentComponent,
    PastComponent,
    UpcomingComponent,
    MytripsMainComponent,
    CurrentDetailComponent],
  exports: [
    CurrentComponent,
    PastComponent,
    UpcomingComponent,
    MytripsMainComponent,
    CurrentDetailComponent
  ]
})
export class MyTripsModule { }
