import { Routes } from '@angular/router';
import { MytripsMainComponent } from './my-trips/components/mytrips-main/mytrips-main.component';
import { CurrentDetailComponent } from './my-trips/components/current-detail/current-detail.component';
import { DetailResolver } from './shared/resolvers/details.resolver';
import { InvoiceTripComponent } from './my-trips/components/invoice-trip/invoice-trip.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'mytrips', pathMatch: 'full' },
  {
    path: 'past/:id',
    component: CurrentDetailComponent,
    resolve: {
      details: DetailResolver
    },
    data: {
      past: true
    }
  },
  {
    path: 'upcoming/:id',
    component: CurrentDetailComponent,
    resolve: {
      details: DetailResolver
    },
    data: {
      upcoming: true
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
  { path: 'mytrips', component: MytripsMainComponent },
  // { path: '**', component: NoContentComponent },
];
