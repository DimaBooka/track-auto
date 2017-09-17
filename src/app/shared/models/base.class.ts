import { LocationStop } from './location.model';

export class BaseClass {

  public createByJson(json: JSON) {
    this._status = json["status"] || "done";
    this._distance = json["distance"] ? +json["distance"] : 0;
    this._name = json["name"] || "";
    this._address = json["address"] || "";
    this._waitingDuration = json["wait_duration"] || "";
    this._time = json["time"] || "";

    if(json["location"]) {
      let location = new LocationStop();
      location.createByJson(json["location"]);
      this._location = location;
    }
  }

  constructor(
    private _status: string = "",
    private _icon: string = "",
    private _distance: number = 0,
    private _name: string = "",
    private _address: string = "",
    private _waitingDuration: string = "",
    private _location: LocationStop = new LocationStop(),
    private _time: string = ""
  ) {}

  public get status(){
    return this._status;
  }

  public set status(status: string) {
    this._status = status;
  }

  public get icon(){
    return this._icon;
  }

  public set icon(icon: string) {
    this._icon = icon;
  }

  public get distance(){
    return this._distance;
  }

  public set distance(distance: number) {
    this._distance = distance;
  }

  public get name(){
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get address(){
    return this._address;
  }

  public set address(adress: string) {
    this._address = adress;
  }

  public get waitingDuration(){
    return this._waitingDuration;
  }

  public set waitingDuration(waitingDuration: string) {
    this._waitingDuration = waitingDuration;
  }

  public get location() {
    return this._location;
  }

  public set location(location: LocationStop) {
    this._location = location;
  }

  public get time(){
    return this._time;
  }

  public set time(time: string) {
    this._time = time;
  }
}
