import { BaseClass } from './base.class';

export class Stop extends BaseClass {

  constructor(
    status: string = "done",
    distance: number = 0,
    name: string = "",
    address: string = "",
    waitingDuration: string = "",
    time: string = ""
  ) {
    super(status, distance, name, address, waitingDuration, time)
  }
}
