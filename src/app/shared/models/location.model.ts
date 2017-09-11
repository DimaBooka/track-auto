export class LocationStop {

  createByJson(json: JSON){
    this._lat = json["lat"] ? +json["lat"] : 0;
    this._lng = json["lng"] ? +json["lng"] : 0;
  }

  constructor(
    private _lat: number = 0,
    private _lng: number = 0,
  ) {}

  public get lat() {
    return this._lat;
  }

  public set lat(lat: number) {
    this._lat = lat;
  }

  public get lng() {
    return this._lng;
  }

  public set lng(lng: number) {
    this._lng = lng;
  }

}
