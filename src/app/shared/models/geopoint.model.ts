import { LocationStop } from "./location.model";

export class GeoPoint extends LocationStop{
  constructor(
    lat: number = 0,
    lng: number = 0
  ) {
    super(lat, lng)
  }
}
