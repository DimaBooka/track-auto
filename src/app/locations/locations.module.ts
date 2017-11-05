import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    LocationsListComponent
  ],
  exports: [
    LocationsListComponent
  ]
})
export class LocationsModule { }
