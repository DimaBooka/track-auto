import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutes } from "./app.routes";
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MyTripsModule } from "./my-trips/my-trips.module";
import { TripModule } from './trip/trip.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHnk-B5voE01PGVefEjnGvHohVA8QDY8M'
    }),
    MyTripsModule,
    TripModule,
    SharedModule,
	NgxQRCodeModule,
	AngularFireModule.initializeApp(environment.firebase),
	AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
