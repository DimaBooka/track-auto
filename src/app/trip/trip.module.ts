import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistanceDoneComponent } from './components/distance-done/distance-done.component';
import { RightBarComponent } from './components/right-bar/right-bar.component';
import { StopsComponent } from './components/stops/stops.component';
import { StopItemComponent } from './components/stop-item/stop-item.component';
import { MapComponent } from './components/map/map.component';
import { ListTripsComponent } from './components/list-trips/list-trips.component';
import { RouterModule } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from './components/chart/chart.component';
import { DetailStopsComponent } from './components/detail-stops/detail-stops.component';
import { DetailStopComponent } from './components/detail-stop/detail-stop.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AgmCoreModule } from '@agm/core';
import {DirectionsMapDirective} from "./directives/map-directions.directive";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    AgmCoreModule,
  ],
  declarations: [
    DistanceDoneComponent,
    RightBarComponent,
    StopsComponent,
    StopItemComponent,
    MapComponent,
    ListTripsComponent,
    SummaryComponent,
    FilterSearchBarComponent,
    ChartComponent,
    DetailStopsComponent,
    DetailStopComponent,
    UserListComponent,
    DirectionsMapDirective
  ],
  exports: [
    DistanceDoneComponent,
    RightBarComponent,
    StopsComponent,
    StopItemComponent,
    MapComponent,
    ListTripsComponent,
    SummaryComponent,
    FilterSearchBarComponent,
    ChartComponent,
    DetailStopsComponent,
    DetailStopComponent,
    UserListComponent
  ]
})
export class TripModule { }
