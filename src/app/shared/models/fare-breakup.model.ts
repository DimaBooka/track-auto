export class FareBreakup {

  public createByJson(json: JSON) {
    this._baseFare = json["fixed"] ? +json["fixed"] : 0;
    this._timeCharges = json["time"] ? +json["time"] : 0;
    this._distanceCharges = json["distance"] ? +json["distance"] : 0;
    this._adjustment = json["adjustment"] ? +json["adjustment"] : 0;
    this._gst = json["GST"] ? +json["GST"] : 0;
  }

  constructor(
    private _timeCharges: number = 0,
    private _distanceCharges: number = 0,
    private _gst: number = 0,
    private _baseFare: number = 0,
    private _adjustment: number = 0
  ) {}

  public get timeCharges() {
    return this._timeCharges;
  }

  public set timeCharges(timeCharges: number) {
    this._timeCharges = timeCharges;
  }

  public get distanceCharges() {
    return this._distanceCharges;
  }

  public set distanceCharges(distanceCharges: number) {
    this._distanceCharges = distanceCharges;
  }

  public get gst() {
    return this._gst;
  }

  public set gst(gst: number) {
    this._gst = gst;
  }

  public get baseFare() {
    return this._baseFare;
  }

  public set baseFare(baseFare: number) {
    this._baseFare = baseFare;
  }

  public get adjustment() {
    return this._adjustment;
  }

  public set adjustment(adjustment: number) {
    this._adjustment = adjustment;
  }
}
