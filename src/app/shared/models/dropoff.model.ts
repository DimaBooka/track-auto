import { BaseClass } from './base.class';
import { LocationStop } from './location.model';

export class DropOff extends BaseClass {

  constructor(
    status: string = "done",
    icon: string = "",
    distance: number = 0,
    name: string = "",
    address: string = "",
    waitingDuration: string = "",
    location: LocationStop = new LocationStop(),
    time: string = ""
  ) {
    super(status, icon, distance, name, address, waitingDuration, location, time)
  }
}
