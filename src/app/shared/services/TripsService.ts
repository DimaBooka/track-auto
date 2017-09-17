import { Injectable } from "@angular/core";
import { Tabs } from "../models/tabs.enum";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { API_ALL_TRIPS, API_DETAIL_TRIP, API_LOCATIONS, API_SUMMARY_TRIPS } from "../constants";
import { HandleError } from "../handlers/error.handler";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import { AllTrips } from "../models/all-trips.model";
import { TripsSummary } from "../models/trips-summary.model";
import { Trip } from "../models/trip.model";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { UserLocation } from "../models/user-location.model";

@Injectable()
export class TripsService {

  private _currentTab: Tabs = Tabs.Current;
  private _headers: Headers = new Headers();
  private _options: any;
  private tripsSubject = new Subject<any>();

  constructor(private _http: Http) {
    this._headers.append("Content-Type", "text/html");
    this._headers.append("Accept", "text/html");
    this._headers.append("Access-Control-Allow-Origin", "*");
    this._options = new RequestOptions({ headers: this._headers });
  }

  public get currentTab(): Tabs {
    return this._currentTab;
  }

  public set currentTab(tab: Tabs) {
    this._currentTab = tab;
  }

  refreshTrips() {
    this.tripsSubject.next();
  }

  getTripTriggers(): Observable<any> {
    return this.tripsSubject.asObservable();
  }

  public getTripDetails(id: number) {
    return this._http.get(`${API_DETAIL_TRIP}/${id}`).map((resp: any) => {
        let response = resp._body;
        let trip = new Trip();
        trip.createByJson(JSON.parse(response));
        return trip;
      })
        .catch(HandleError);
  }

  public getAllTrip() {
    return this._http.get(API_ALL_TRIPS).map((resp: any) => {
        let response = resp._body;
        let alltrips = new AllTrips();
        alltrips.createByJson(JSON.parse(response));
        return alltrips;
      })
      .catch(HandleError);
  }

  public getSummaryTrips() {
    return this._http.get(API_SUMMARY_TRIPS).map((resp: any) => {
      let response = resp._body;
      let summary = new TripsSummary();
      summary.createByJson(JSON.parse(response));
      return summary;
    })
      .catch(HandleError);
  }

  public getUserLocation() {
    return this._http.get(API_LOCATIONS).map((resp: any) => {
      let response = JSON.parse(resp._body);
      let locations: UserLocation[] = [];

      response.map((item: JSON) => {
        let userLocation = new UserLocation();
        userLocation.createByJson(item);
        locations.push(userLocation);
      });

      return locations;
    });
  }

  public createTrip(fromLoc, toLoc, truckType) {
    let creationData = {
      "from": fromLoc,
      "to": toLoc,
      "truck_type": truckType
    };
    return this._http.post(API_DETAIL_TRIP, creationData).map((resp: any) => {
      return resp;
    });
  }

  public removeTrip(id: string | number) {
    return this._http.delete(`${API_DETAIL_TRIP}/${id}`).map((resp: any) => {
      return resp;
    })
      .catch(HandleError);
  }

}
