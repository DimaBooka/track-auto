import { Component, OnInit } from '@angular/core';
import { UserLocation } from '../../../shared/models/user-location.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../../shared/services/TripsService';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-interaction',
  templateUrl: './location-interaction.component.html',
  styleUrls: ['./location-interaction.component.scss']
})
export class LocationInteractionComponent implements OnInit {

  public location: UserLocation = new UserLocation();
  public id: string;
  public locationGroup: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
    private tripsService: TripsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {

      this.route.data.subscribe(trip => {
        if (trip.details.length > 0) {
          this.location = <UserLocation>trip.details.filter(location => location.id === +this.id)[0];
          if (!this.location) { this.goToLocations(); }

          this.sidebarService.showSidebar = false;
          this.initForm();
        } else {
          this.goToLocations();
        }
      });

    } else {
      this.location = new UserLocation();
      this.sidebarService.showSidebar = false;
      this.initForm();
    }
  }

  initForm() {
    this.locationGroup = this.fb.group({
      name: [this.location.name, [Validators.required]],

      // TODO: backend doesn't have flat number / building name need to add
      flat: ["", [Validators.required]],
      line: [this.location.address.line, [Validators.required]],
      city: [this.location.address.city, [Validators.required]],
      code: [this.location.address.postalCode, [Validators.required]],
      contactName: [this.location.contact.name, [Validators.required]],
      contactNumber: [this.location.contact.mobile, [Validators.required]],
    });
  }

  goToLocations() {
    this.sidebarService.showSidebar = true;
    this.router.navigate(['/locations']);
  }

  onSubmit() {
    const value = this.locationGroup.value;
    this.location.name = value['name'];
    // Uncomment it when will be on backend
    // this.location.address.flat = value['flat'];
    this.location.address.line = value['line'];
    this.location.address.city = value['city'];
    this.location.address.postalCode = value['code'];
    this.location.contact.name = value['contactName'];
    this.location.contact.mobile = value['contactNumber'];

    // TODO: backend is not ready yet for this
    // remove debuggers when backend will be done
    if (this.id) {
      this.tripsService.updateLocation(this.location).subscribe(resp => {
        debugger;
        this.goToLocations();
      });
    } else {
      this.tripsService.createLocation(this.location).subscribe(resp => {
        debugger;
        this.goToLocations();
      });
    }
  }
}
