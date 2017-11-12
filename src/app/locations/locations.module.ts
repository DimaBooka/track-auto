import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationInteractionComponent } from './components/location-interaction/location-interaction.component';
import { RouterModule } from '@angular/router';
import { TripModule } from '../trip/trip.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    TripModule
  ],
  declarations: [
    LocationsListComponent,
    LocationInteractionComponent
  ],
  exports: [
    LocationsListComponent,
    LocationInteractionComponent
  ]
})
export class LocationsModule { }
