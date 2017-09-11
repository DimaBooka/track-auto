import { Trip } from './trip.model';

export class AllTrips {

  public createByJson(json: JSON) {
    let keys = Object.keys(json);
    for (let key in keys) {
      this[`_${keys[key]}`] = json[keys[key]].map((tripData: JSON) => {
        let trip = new Trip();
        trip.createByJson(tripData);
        return trip;
      });
    }
  }

  constructor(
    private _current: Trip[] = [],
    private _past: Trip[] = [],
    private _upcoming: Trip[] = []
  ) {}

  public get current() {
    return this._current;
  }

  public set current(current: Trip[]) {
    this._current = current;
  }

  public get past() {
    return this._past;
  }

  public set past(past: Trip[]) {
    this._past = past;
  }

  public get upcoming() {
    return this._upcoming;
  }

  public set upcoming(upcoming: Trip[]) {
    this._upcoming = upcoming;
  }
}
