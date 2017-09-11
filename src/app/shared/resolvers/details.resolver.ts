import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TripsService } from '../services/TripsService';
import { Trip } from '../models/trip.model';


@Injectable()
export class DetailResolver implements Resolve<Trip> {

  constructor(private tripService: TripsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    let id = route.params.id;
    return this.tripService.getTripDetails(id);
  }
}
