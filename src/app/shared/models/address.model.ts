export class AddressLocation {

  createByJson(json: JSON) {
    this._area = json["area"] || "";
    this._city = json["city"] || "";
    this._country = json["country"] || "";
    this._fullAddress = json["full_address"] || "";
    this._landmark = json["landmark"] || "";
    this._line = json["line"] || "";
    this._postalCode = json["postal_code"] || "";
    this._state = json["state"] || "";
    this._what3words = json["what3words"] || "";
  }

  constructor(
    private _area: string = "",
    private _city: string = "",
    private _country: string = "",
    private _fullAddress: string = "",
    private _landmark: string = "",
    private _line: string = "",
    private _postalCode: string = "",
    private _state: string = "",
    private _what3words: string = ""
  ) {}

  public get area() {
    return this._area;
  }

  public set area(area: string) {
    this._area = area;
  }

  public get city() {
    return this._city;
  }

  public set city(city: string) {
    this._city = city;
  }

  public get country() {
    return this._country;
  }

  public set country(country: string) {
    this._country = country;
  }

  public get fullAddress() {
    return this._fullAddress;
  }

  public set fullAddress(fullAddress: string) {
    this._fullAddress = fullAddress;
  }

  public get landmark() {
    return this._landmark;
  }

  public set landmark(landmark: string) {
    this._landmark = landmark;
  }

  public get line() {
    return this._line;
  }

  public set line(line: string) {
    this._line = line;
  }

  public get postalCode() {
    return this._postalCode;
  }

  public set postalCode(postalCode: string) {
    this._postalCode = postalCode;
  }

  public get state() {
    return this._state;
  }

  public set state(state: string) {
    this._state = state;
  }

  public get what3words() {
    return this._what3words;
  }

  public set what3words(what3words: string) {
    this._what3words = what3words;
  }
}
