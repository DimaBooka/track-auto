export class BaseClass {

  public createByJson(json: JSON) {
    this._status = json["status"] || "done";
    this._distance = json["distance"] ? +json["distance"] : 0;
    this._name = json["name"] || "";
    this._address = json["address"] || "";
    this._waitingDuration = json["waiting_duration"] || "";
    this._time = json["time"] || "";
  }

  constructor(
    private _status: string = "",
    private _distance: number = 0,
    private _name: string = "",
    private _address: string = "",
    private _waitingDuration: string = "",
    private _time: string = ""
  ) {}

  public get status(){
    return this._status;
  }

  public set status(status: string) {
    this._status = status;
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

  public get time(){
    return this._time;
  }

  public set time(time: string) {
    this._time = time;
  }
}
