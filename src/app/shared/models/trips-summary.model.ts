export class TripsSummary {

  public createByJson (json: JSON) {
    this._totralDistance = json['total_distance'] ? +json['total_distance'] : 0;
    this._totralCost = json['total_cost'] ? +json['total_cost'] : 0;
    this._numTrips = json['number_trips'] ? +json['number_trips'] : 0;
    this._dataToChart = json['data'] ? json['data'] : [];

    this._numX = this._dataToChart.length;

    if (this._numX > 0) {
      this._dataToChart.forEach(item => {
        if (+item.trips > this._maxTrips)
          this._maxTrips = +item.trips;
        if (+item.distance > this._maxDistance)
          this._maxDistance = +item.distance;
        if (+item.cost > this._maxCost) {
          this._maxCost = +item.cost;
        }
      });
    }
  }

  constructor(
    private _numX: number = 0,
    private _maxTrips: number = 0,
    private _maxDistance: number = 0,
    private _maxCost: number = 0,
    private _totralDistance: number = 0,
    private _totralCost: number = 0,
    private _numTrips: number = 0,
    private _dataToChart: {[key: string ] : string}[] = []
  ) {}

  public get numX() {
    return this._numX;
  }

  public get maxTrips() {
    return this._maxTrips;
  }

  public get maxDistance() {
    return this._maxDistance;
  }

  public get maxCost() {
    return this._maxCost;
  }

  public get totralDistance() {
    return this._totralDistance;
  }

  public get totalCost() {
    return this._totralCost;
  }

  public get numTrips() {
    return this._numTrips;
  }

  public get dataToChart() {
    return this._dataToChart;
  }

}
