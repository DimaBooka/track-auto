import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TripsService } from './services/TripsService';
import { HttpModule } from '@angular/http';
import { TripModule } from '../trip/trip.module';
import { FormsModule } from '@angular/forms';
import { DetailResolver } from './resolvers/details.resolver';
import { SidebarService } from './services/sidebar.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule,
    TripModule
  ],
  declarations: [HeaderComponent, SidebarComponent],
  exports: [HeaderComponent, SidebarComponent],
  providers: [TripsService, DetailResolver, SidebarService]
})
export class SharedModule { }
