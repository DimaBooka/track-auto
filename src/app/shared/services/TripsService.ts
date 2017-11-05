import { Injectable } from "@angular/core";
import { Tabs } from "../models/tabs.enum";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { API_ALL_TRIPS, API_DETAIL_TRIP, API_QUICKBOOK, API_REBOOK, API_LOCATIONS, API_SUMMARY_TRIPS, API_PARAMS, API_SHARE_INVOICE, API_FIREBASE_TOKEN } from "../constants";
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

  public getLocations() {
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

  public createLocation(location: UserLocation) {
    return this._http.post(API_LOCATIONS, location).map((resp: any) => {
      let response = JSON.parse(resp._body);
      return response;
    });
  }

  public updateLocation(location: UserLocation) {
    return this._http.patch(`API_LOCATIONS/${location.id}`, location).map((resp: any) => {
      let response = JSON.parse(resp._body);
      let locations: UserLocation[] = [];
debugger;
      response.map((item: JSON) => {
        let userLocation = new UserLocation();
        userLocation.createByJson(item);
        locations.push(userLocation);
      });

      return locations;
    });
  }

  public removeLocation(locationId: number) {
    return this._http.delete(`API_LOCATIONS/${locationId}`).map((resp: any) => {
      let response = JSON.parse(resp._body);
      return response;
    });
  }

  public getParams() {
    return this._http.get(API_PARAMS).map((resp: any) => {
      let response = JSON.parse(resp._body);
      return response;
    });
  }

  public createTrip(fromLoc, toLoc, truckType) {
    let creationData = {
      "from": fromLoc,
      "to": toLoc,
      "truck_type": truckType
    };
    console.log(creationData);
    return this._http.post(API_QUICKBOOK, JSON.stringify(creationData)).map((resp: any) => {
      let response = JSON.parse(resp._body);
      return response;
    });
  }

  public rebookTrip(datetime: any, id: string) {
    return this._http.post(`${API_REBOOK}/${id}`, JSON.stringify({datetime})).map((resp: any) => {
      let response = JSON.parse(resp._body);
      return response;
    });
  }

  public shareInvoice(id: string | number, emails : string[]) {
    console.log(id, emails);
    return this._http.post(`${API_SHARE_INVOICE}/${id}`, emails).map((resp: any) => {
      return resp;
    })
      .catch(HandleError);
  }

  public removeTrip(id: string | number) {
    return this._http.delete(`${API_DETAIL_TRIP}/${id}`).map((resp: any) => {
      return resp;
    })
      .catch(HandleError);
  }

  public getFirebaseToken() {
    return this._http.get(`${API_FIREBASE_TOKEN}?token_id=tracking`).map((resp: any) => {
      console.log(resp._body);
      let response = JSON.parse(resp._body);
      return response.firebase_auth_token;
    });
  }


}
