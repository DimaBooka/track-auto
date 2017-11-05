import { Routes } from '@angular/router';
import { MytripsMainComponent } from './my-trips/components/mytrips-main/mytrips-main.component';
import { CurrentDetailComponent } from './my-trips/components/current-detail/current-detail.component';
import { DetailResolver } from './shared/resolvers/details.resolver';
import { InvoiceTripComponent } from './my-trips/components/invoice-trip/invoice-trip.component';
import { LocationsListComponent } from './locations/components/locations-list/locations-list.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'mytrips', pathMatch: 'full' },
  {
    path: 'track/:id',
    component: CurrentDetailComponent,
    resolve: {
      details: DetailResolver
    }
  },
  {
    path: 'invoice/:id',
    component: InvoiceTripComponent,
    resolve: {
      details: DetailResolver
    }
  },
  { path: 'mytrips', component: MytripsMainComponent },
  { path: 'locations', component: LocationsListComponent}
  // { path: '**', component: NoContentComponent },
];
