import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TripsService } from './services/TripsService';
import { HttpModule } from '@angular/http';
import { TripModule } from '../trip/trip.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailResolver } from './resolvers/details.resolver';
import { SidebarService } from './services/sidebar.service';
import { DataService } from "./services/data.service";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { DatePickerModule } from 'angular-io-datepicker';
import { OverlayModule } from "angular-io-overlay/src/overlay";
import { DetailLocationResolver } from './resolvers/details-location.resolver';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule,
    TripModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    OverlayModule,
    DatePickerModule,
    NgbModule,
    Ng2AutoCompleteModule
  ],
  declarations: [HeaderComponent, SidebarComponent],
  exports: [HeaderComponent, SidebarComponent],
  providers: [TripsService, DetailResolver, DetailLocationResolver, SidebarService, DataService]
})
export class SharedModule { }
