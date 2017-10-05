import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tabs } from '../models/tabs.enum';
import { TripsService } from '../services/TripsService';
import { UserLocation } from '../models/user-location.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private tabs: any = Tabs;
  private currentTab: Tabs;
  private quickBook: boolean = false;
  private locations: UserLocation[];
  private fromLocation: UserLocation;
  private toLocation: UserLocation;
  private truckTypeOptions: any[];
  /*
  = [
    {
      value: "ace",
      label: "Tata Ace"
    },
    {
      value: "pickup",
      label: "Tata Pickup"
    }
  ];
   */
  private truckTypeParamVal: string;// = this.truckTypeOptions[0].value;
  private truckTypeParamLabel: string;// = this.truckTypeOptions[0].label;
  public bookingId: string = "";
  public trackingURL: string = "";
  @Output() tabChanged: EventEmitter<Tabs> = new EventEmitter<Tabs>();

  constructor(private _tripsService: TripsService,
              private router: Router,
              private modalService: NgbModal) {
    this.currentTab = this._tripsService.currentTab;
    this._tripsService.getUserLocation().subscribe((res: UserLocation[]) => {
      this.locations = res;
    });
    this._tripsService.getParams().subscribe((res: any) => {
    console.log(res);
      this.truckTypeOptions = res.vehicle_classes;
      this.truckTypeParamVal = this.truckTypeOptions[0].value;
      this.truckTypeParamLabel = this.truckTypeOptions[0].label;
    });
  }

  changeTab(tab: Tabs) {
    if (tab !== this.currentTab) {
      this.currentTab = tab;
      this._tripsService.currentTab = tab;
      this.tabChanged.emit(tab);
    }
  }

  moveTostartPage() {
    this.router.navigate(["mytrips"]);
  }

  private checkValid() {
    return this.locations.indexOf(this.fromLocation) > -1 && this.locations.indexOf(this.toLocation) > -1;
  }

  private resetForm() {
    this.quickBook = false;
    this.fromLocation = null;
    this.toLocation = null;
    this.truckTypeParamVal = this.truckTypeOptions[0].value;
    this.truckTypeParamLabel = this.truckTypeOptions[0].label;
  }

  private toggleQuckBook() {
    this.quickBook = !this.quickBook;
    if (!this.quickBook) {
      this.resetForm();
    }
  }

  private valueFormatter(data: UserLocation): string {
    return `${data.name}`;
  }

  private listFormatter(data: UserLocation): string {
    return `${data.name}`;
  }

  private createQuickBook(tripCreated: any) {

    // For makes creation works need remove next line and uncomment code below
  // this.resetForm();
    this._tripsService.createTrip(
      this.fromLocation,
      this.toLocation,
      this.truckTypeParamVal
    ).subscribe((res: any) => {
    //console.log(res);
      this.bookingId = res.bookingId;
      this.trackingURL = res.trackingURL;
      this.tripCreatedOpen(tripCreated);
      this.resetForm();
    });
  }

  public tripCreatedOpen(content: any) {
    this.modalService.open(content).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  private selectSecondParam(option: any) {
    this.truckTypeParamVal = option.value;
    this.truckTypeParamLabel = option.label;
  }

  ngOnInit() {}
}
