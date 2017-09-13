import { Routes } from '@angular/router';
import { MytripsMainComponent } from './my-trips/components/mytrips-main/mytrips-main.component';
import { CurrentDetailComponent } from './my-trips/components/current-detail/current-detail.component';
import { DetailResolver } from './shared/resolvers/details.resolver';
import { InvoiceTripComponent } from './my-trips/components/invoice-trip/invoice-trip.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'my_trips', pathMatch: 'full' },
  {
    path: 'my_trips/:id',
    component: CurrentDetailComponent,
    resolve: {
      details: DetailResolver
    },
    data: {
      past: true
    }
  },
  {
    path: 'current/:id',
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
  { path: 'my_trips', component: MytripsMainComponent },
  // { path: '**', component: NoContentComponent },
];
