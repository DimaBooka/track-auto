export class FareBreakup {

  public createByJson(json: JSON) {
    this._waitingCharges = json["waiting_charges"] ? +json["waiting_charges"] : 0;
    this._gst = json["GST"] ? +json["GST"] : 0;
    this._baseFare = json["base_fare"] ? +json["base_fare"] : 0;
  }

  constructor(
    private _waitingCharges: number = 0,
    private _gst: number = 0,
    private _baseFare: number = 0
  ) {}

  public get waitingCharges() {
    return this._waitingCharges;
  }

  public set waitingCharges(waitingCharges: number) {
    this._waitingCharges = waitingCharges;
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
}
