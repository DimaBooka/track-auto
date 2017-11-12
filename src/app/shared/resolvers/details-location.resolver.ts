import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TripsService } from '../services/TripsService';
import { Trip } from '../models/trip.model';


@Injectable()
export class DetailLocationResolver implements Resolve<Trip> {

  constructor(private tripService: TripsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    // For now backend returns fake id - so for detail view get all locations
    // and filter them by id from url params (/:id).
    // If backend will be changed just remove last line, and uncomment out this two lines.
    // let id = route.params.id;
    // return this.tripService.getLocation(id);
    return this.tripService.getLocations();
  }
}
