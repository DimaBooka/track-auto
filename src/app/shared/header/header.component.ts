import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tabs } from '../models/tabs.enum';
import { TripsService } from '../services/TripsService';
import { UserLocation } from '../models/user-location.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

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
  private filtered_locations: UserLocation[];
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
  private coverage : any;
  private coverage_polygon: any = {};
  @Output() tabChanged: EventEmitter<Tabs> = new EventEmitter<Tabs>();

  constructor(private _tripsService: TripsService,
              private router: Router,
              private mapsAPILoader: MapsAPILoader,
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
      this.coverage = res.city_coverage;
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

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      console.log(this.coverage);
      console.log(google);
      for (let city in this.coverage) {
        var coverage = this.coverage[city];
        this.coverage_polygon[city] = new google.maps.Polygon({
          paths: coverage,
          visible: false,
        });
      }
      console.log(this.coverage_polygon);
    });
  }

  private onFromLocationChange(newValue) {
    this.filtered_locations = [];
    if (!newValue) {
      return;
    }
    var selected_city;
    var geopoint;
    var selected_city_polygon = this.coverage_polygon[selected_city];

    for (let city in this.coverage_polygon) {
      var coverage = this.coverage_polygon[city];
      console.log(newValue.geopoint);
      geopoint = new google.maps.LatLng(newValue.geopoint.lat, newValue.geopoint.lng);
      if (google.maps.geometry.poly.containsLocation(geopoint, coverage)) {
        selected_city = city;
        break;
      }
    }

    selected_city_polygon = this.coverage_polygon[selected_city];
    console.log(this.locations);
    this.locations.forEach((obj, index) => {
      console.log(obj);
      geopoint = new google.maps.LatLng(obj.geopoint.lat, obj.geopoint.lng);
      if (google.maps.geometry.poly.containsLocation(geopoint, selected_city_polygon)) {
        this.filtered_locations.push(obj);
      }
    });
  }
}
