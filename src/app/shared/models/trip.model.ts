import { FareBreakup } from './fare-breakup.model';
import { DropOff } from './dropoff.model';
import { Pickup } from './pickup.model';
import { Stop } from './stop.model';

export class Trip {

  public createByJson(json: JSON) {
    this._status = json["status"] || "done";
    this._city = json["city"] || "";
    this._estimatedDistance = json["estimated_distance"] ? +json["estimated_distance"] : 0;
    this._totalDuration = json["total_duration"] ? +json["total_duration"] : 0;
    this._totalDistance = json["total_distance"] ? +json["total_distance"] : 0;
    this._orderId = json["order_id"] || "";
    this._orderKey = json["order_key"] || "";
    this._estimate = json["estimate"] || "";
    this._price = json["price"] ? +json["price"] : 0;
    this._truckType = json["truck_type"] || "";
    this._truckURL = json["truck_url"] || "";
    this._headerTo = json["header_to"] || "";
    this._drivenName = json["driver_name"] || "";
    this._headerFrom = json["header_from"] || "";
    this._driverMobile = json["driver_mobile"] || "";
    this._trackingUrl = json["tracking_url"] || "";
    this._finishedDistance = json["finished_distance"] ? +json["finished_distance"] : 0;
    this._route = json["route_info"] || [];
    this._paymentStatus = json["payment_status"] || "";
    this._dateSortable = json["date_sortable"] || "";
    this._orderRealId = json["order_real_id"] || "";

    if (json["fare_breakup"]) {
      let fareBreakup = new FareBreakup();
      fareBreakup.createByJson(json["fare_breakup"]);
      this._fareBreakup = fareBreakup;
    }

    if (json["dropoff"]) {
      let dropoff = new DropOff();
      dropoff.createByJson(json["dropoff"]);
      this._dropoff = dropoff;
    }

    if (json["pickup"]) {
      let pickup = new Pickup();
      pickup.createByJson(json["pickup"]);
      this._pickUp = pickup;
    }

    if (json["stops"] && json["stops"].length > 0) {
      this._stops = json["stops"].map((stopData: JSON) => {
        let stop = new Stop();
        stop.createByJson(stopData);
        return stop;
      });
    }

    this._date = json["date"] || "";
  }

  public getStopsCalculates() {
    let stopsDone:number = 0;

    for (let stop in this._stops) {
      if (this._stops[stop].status === "done")
        stopsDone += 1;
      else
        break
    }

    let stopsLeft: number = this._stops.length - stopsDone;

    return {
      nextIndex: stopsDone === this._stops.length ? null : stopsDone,
      stopsDone: stopsDone,
      stopsLeft: stopsDone === this._stops.length ? 0 : stopsLeft
    }
  }

  constructor(
    private _status: string = "done",
    private _city: string = "",
    private _estimatedDistance: number = 0,
    private _totalDuration: number = 0,
    private _totalDistance: number = 0,
    private _orderId: string = "",
    private _orderKey: string = "",
    private _orderRealId: string = "",
    private _estimate: number = 0,
    private _price: number = 0,
    private _fareBreakup: FareBreakup = new FareBreakup(),
    private _dropoff: DropOff = new DropOff(),
    private _truckType: string = "",
    private _truckURL: string = "",
    private _headerTo: string = "",
    private _pickUp: Pickup = new Pickup(),
    private _drivenName: string = "",
    private _headerFrom: string = "",
    private _stops: Stop[] = [],
    private _date: any = "",
    private _dateSortable: string = "",
    private _driverMobile: string = "",
    private _trackingUrl: string = "",
    private _finishedDistance: number = 0,
    private _route: any[] = [],
    private _paymentStatus: string = 'unpaid'
  ) {}

  public get status() {
    return this._status;
  }

  public set status(status: string) {
    this._status = status;
  }

  public get city() {
    return this._city;
  }

  public set city(city: string) {
    this._city = city;
  }

  public get estimatedDistance() {
    return this._estimatedDistance;
  }

  public set estimatedDistance(estimatedDistance: number) {
    this._estimatedDistance = estimatedDistance;
  }

  public get totalDuration() {
    return this._totalDuration;
  }

  public set totalDuration(totalDuration: number) {
    this._totalDuration = totalDuration;
  }


  public get totalDistance() {
    return this._totalDistance;
  }

  public set totalDistance(totalDistance: number) {
    this._totalDistance = totalDistance;
  }

  public get orderId() {
    return this._orderId;
  }

  public set orderId(orderId: string) {
    this._orderId = orderId;
  }

  public get orderRealId() {
    return this._orderRealId;
  }

  public set orderRealId(orderRealId: string) {
    this._orderRealId = orderRealId;
  }

  public get orderKey() {
    return this._orderKey;
  }

  public set orderKey(orderKey: string) {
    this._orderKey = orderKey;
  }

  public get estimate() {
    return this._estimate;
  }

  public set estimate(estimate: number) {
    this._estimate = estimate;
  }

  public get price() {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public get fareBreakup() {
    return this._fareBreakup;
  }

  public set fareBreakup(fareBreakup: FareBreakup) {
    this._fareBreakup = fareBreakup;
  }

  public get dropoff() {
    return this._dropoff;
  }

  public set dropoff(dropoff: DropOff) {
    this._dropoff = dropoff;
  }

  public get truckType() {
    return this._truckType;
  }

  public set truckType(truckType: string) {
    this._truckType = truckType;
  }

  public get truckURL() {
    return this._truckURL;
  }

  public set truckURL(truckURL: string) {
    this._truckURL = truckURL;
  }

  public get headerTo() {
    return this._headerTo;
  }

  public set headerTo(headerTo: string) {
    this._headerTo = headerTo;
  }

  public get pickUp() {
    return this._pickUp;
  }

  public set pickUp(pickUp: Pickup) {
    this._pickUp = pickUp;
  }

  public get drivenName() {
    return this._drivenName;
  }

  public set drivenName(drivenName: string) {
    this._drivenName = drivenName;
  }

  public get headerFrom() {
    return this._headerFrom;
  }

  public set headerFrom(headerFrom: string) {
    this._headerFrom = headerFrom;
  }

  public get stops() {
    return this._stops;
  }

  public set stops(stops: Stop[]) {
    this._stops = stops;
  }

  public get date() {
    return this._date;
  }

  public set date(date: any) {
    this._date = date;
  }

  public get dateSortable() {
    return this._dateSortable;
  }

  public set dateSortable(dateSortable: string) {
    this._dateSortable = dateSortable;
  }

  public get driverMobile() {
    return this._driverMobile;
  }

  public set driverMobile(driverMobile: string) {
    this._driverMobile = driverMobile;
  }

  public get trackingUrl() {
    return this._trackingUrl;
  }

  public set trackingUrl(trackingUrl: string) {
    this._trackingUrl = trackingUrl;
  }

  public get route() {
    return this._route;
  }

  public set route(route: any[]) {
    this._route = route;
  }

  public get finishedDistance() {
    return this._finishedDistance;
  }

  public set finishedDistance(finishedDistance: number) {
    this._finishedDistance = finishedDistance;
  }

  public get paymentStatus() {
    return this._paymentStatus;
  }

  public set paymentStatus(paymentStatus: string) {
    this._paymentStatus = paymentStatus;
  }


}
