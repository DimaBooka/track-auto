import { Routes } from '@angular/router';
import { MytripsMainComponent } from './my-trips/components/mytrips-main/mytrips-main.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'my_trips', pathMatch: 'full' },
  { path: 'my_trips', component: MytripsMainComponent },
  // { path: '**', component: NoContentComponent },
];
