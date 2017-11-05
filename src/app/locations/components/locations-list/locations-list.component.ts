import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../../shared/services/TripsService';
import { UserLocation } from '../../../shared/models/user-location.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {

  public locations: UserLocation[] = [];
  public filteredLocations: UserLocation[] = [];
  public selectedLocation: UserLocation;
  public search: string = '';
  constructor(
    private tripService: TripsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.updateLocations();
  }

  updateLocations() {
    this.tripService.getLocations().subscribe(locations => {
      this.locations = locations;
      if (this.search) {
        this.filterLocations();
      } else {
        this.filteredLocations = this.locations;
      }
    });
  }

  filterLocations() {
    this.filteredLocations = this.locations.filter(loc => {
      return loc.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
    });
  }

  public deleteLocationOpen(deleteModal, location: UserLocation) {
    this.selectedLocation = location;
    this.modalService.open(deleteModal).result.then((result) => {
      this.tripService.removeLocation(location.id).subscribe((resp: any) => {
        this.updateLocations();
        this.selectedLocation = null;
      });
    }, (reason) => {
      this.selectedLocation = null;
    });
  }

  // public editLocationOpen(editLocation, location: UserLocation) {
  //   this.selectedLocation = location;
  //   this.modalService.open(editLocation).result.then((result) => {
  //     this.tripService.updateLocation(location).subscribe((resp: any) => {
  //       this.updateLocations();
  //     });
  //   }, (reason) => {
  //
  //   });
  // }
  //
  // public createLocationOpen(createLocation) {
  //   const location = new UserLocation();
  //
  //   this.modalService.open(createLocation).result.then((result) => {
  //     this.tripService.createLocation(location).subscribe((resp: any) => {
  //       this.updateLocations();
  //     });
  //   }, (reason) => {
  //
  //   });
  // }
}
