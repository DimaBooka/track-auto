import {Directive, Input} from "@angular/core";
import {GoogleMapsAPIWrapper} from '@agm/core';
declare let google: any;

@Directive({
  selector: 'agm-map-directions'
})
export class DirectionsMapDirective {

  @Input() origin_lat;
  @Input() origin_lng;
  @Input() destination_lat;
  @Input() destination_lng;
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit(){
    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer ({
        suppressMarkers: true
      });

      directionsDisplay.setMap(map);

      directionsService.route({
        origin: new google.maps.LatLng(this.origin_lat, this.origin_lng),
        destination: new google.maps.LatLng(this.destination_lat, this.destination_lng),
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setOptions({ preserveViewport: true });
          directionsDisplay.setDirections(response);
        } else {
          console.log('Can not load results, ' + status);
        }
      });
    });
  }
}
