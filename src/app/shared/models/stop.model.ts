import { BaseClass } from './base.class';
import { LocationStop } from './location.model';

export class Stop extends BaseClass {

  constructor(
    status: string = "done",
    distance: number = 0,
    name: string = "",
    address: string = "",
    waitingDuration: string = "",
    location: LocationStop = new LocationStop(),
    time: string = ""
  ) {
    super(status, distance, name, address, waitingDuration, location, time)
  }
}
