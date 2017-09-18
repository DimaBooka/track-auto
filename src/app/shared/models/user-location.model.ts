import { AddressLocation } from "./address.model";
import { Contact } from "./contact.model";
import { GeoPoint } from "./geopoint.model";

export class UserLocation {

  createByJson(json: JSON) {
    if (json["address"]) {
      let address = new AddressLocation();
      address.createByJson(json["address"]);
      this._address = address;
    }

    if (json["contact"]) {
      let contact = new Contact();
      contact.createByJson(json["contact"]);
      this._contact = contact;
    }

    if (json["geopoint"]) {
      let geopoint = new GeoPoint();
      geopoint.createByJson(json["geopoint"]);
      this._geopoint = geopoint;
    }

	this._name = json["name"];
  }

  constructor(
    private _address: AddressLocation = new AddressLocation(),
    private _contact: Contact = new Contact(),
    private _geopoint: GeoPoint = new GeoPoint(),
    private _name: string = ""
  ) {}

  public get address() {
    return this._address;
  }

  public set address(address: AddressLocation) {
    this._address = address;
  }

  public get contact() {
    return this._contact;
  }

  public set contact(contact: Contact) {
    this._contact = contact;
  }

  public get geopoint() {
    return this._geopoint;
  }

  public set geopoint(geopoint: GeoPoint) {
    this._geopoint = geopoint;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }
}
