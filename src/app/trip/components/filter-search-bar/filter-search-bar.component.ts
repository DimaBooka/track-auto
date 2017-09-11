import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-search-bar',
  templateUrl: './filter-search-bar.component.html',
  styleUrls: ['./filter-search-bar.component.scss']
})
export class FilterSearchBarComponent implements OnInit {

  private firstParamVal: string = "newest";
  private firstParamLabel: string = "Newest to oldest";

  private secondParamVal: string = "month";
  private secondParamLabel: string = "This month";

  private firstOptions: any[] = [
    {
      value: "newest",
      label: "Newest to oldest"
    },
    {
      value: "oldest",
      label: "Oldest to newest"
    }
  ];
  private secondOptions: any[] = [
    {
      value: "today",
      label: "Today"
    },
    {
      value: "week",
      label: "This week"
    },
    {
      value: "month",
      label: "This month"
    },
    {
      value: "year",
      label: "This year"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  selectSecondParam(option: any) {
    this.secondParamVal = option.value;
    this.secondParamLabel = option.label;
  }

  selectFirstParam(option: any) {
    this.firstParamVal = option.value;
    this.firstParamLabel = option.label;
  }

}
