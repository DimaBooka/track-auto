import { Injectable } from '@angular/core';
import { Tabs } from '../models/tabs.enum';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { API_ALL_TRIPS, API_DETAIL_TRIP, API_SUMMARY_TRIPS } from '../constants';
import { HandleError } from "../handlers/error.handler";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { AllTrips } from '../models/all-trips.model';
import { TripsSummary } from '../models/trips-summary.model';


@Injectable()
export class TripsService {

  private _currentTab: Tabs = 0;
  private _headers: Headers = new Headers();
  private _options: any;

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

  public getAllTrip() {
    return this._http.get(API_ALL_TRIPS, this._options).map((resp: any) => {
        let response = resp._body;
        let alltrips = new AllTrips();
        alltrips.createByJson(JSON.parse(response));
        return alltrips;
      })
      .catch(HandleError);
  }

  public getSummaryTrips() {
    return this._http.get(API_SUMMARY_TRIPS, this._options).map((resp: any) => {
      let response = resp._body;
      let summary = new TripsSummary();
      summary.createByJson(JSON.parse(response));
      return summary;
    })
      .catch(HandleError);
  }

}
