import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { TripsSummary } from "../../../shared/models/trips-summary.model";
import { TripsService } from "../../../shared/services/TripsService";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() trips: Trip[] = [];
  private summary: TripsSummary;

  private firstParamVal: string = "trips";
  private firstParamLabel: string = "No. of trips";

  private secondParamVal: string = "month";
  private secondParamLabel: string = "This month";

  private firstOptions: any[] = [
    { value: "trips", label: "No. of trips"},
    { value: "distance", label: "Distance travelled"}
  ];
  private secondOptions: any[] = [
    { value: "today", label: "Today"},
    { value: "week", label: "This week"},
    { value: "month", label: "This month"},
    { value: "year", label: "This year"}
  ];

  constructor(private _tripsService: TripsService) {
    this._tripsService.getSummaryTrips().subscribe((res: TripsSummary) => {
      this.summary = res;
    });
  }

  ngOnInit() {}

  selectSecondParam(option: any) {
    this.secondParamVal = option.value;
    this.secondParamLabel = option.label;
  }

  selectFirstParam(option: any) {
    this.firstParamVal = option.value;
    this.firstParamLabel = option.label;
  }

  roundNumber(num) {
    return Math.round(100 * num) / 100
  }
}
