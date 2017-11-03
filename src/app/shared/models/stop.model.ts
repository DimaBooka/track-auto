import { BaseClass } from './base.class';
import { LocationStop } from './location.model';
import { Contact } from './contact.model';

export class Stop extends BaseClass {

  constructor(
    status: string = "done",
    icon: string = "",
    distance: number = 0,
    name: string = "",
    address: string = "",
    waitingDuration: string = "",
    location: LocationStop = new LocationStop(),
    time: string = "",
    contact: Contact = new Contact()
  ) {
    super(status, icon, distance, name, address, waitingDuration, location, time)
  }
}
