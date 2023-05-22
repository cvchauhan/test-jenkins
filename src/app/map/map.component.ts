import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;;

  @Output() latLongStr = new EventEmitter<string>();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  ngOnInit(): void {
    // this.zoom = 4;
    this.zoom = 5;
    this.latitude = 24.6029;
    this.longitude = 73.6867;

    let tmpLatLong = this.latitude + " " + this.longitude;
    this.latLongStr.emit(tmpLatLong);
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();


          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          let tmpLatLong = this.latitude + " " + this.longitude;
          this.latLongStr.emit(tmpLatLong);
          //console.log(tmpLatLong);
          // this.zoom = 12;
          this.zoom = 5;
        });
      });
    });
  }
  keyUpHandler() {
    // this.findAddress();
  }

  ngAfterViewInit() {
    // this.findAddress();
  }





  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.zoom = 12;
        this.zoom = 5;
      });
    }
  }


  markerDragEnd($event: any) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    let tmpLatLong = this.latitude + " " + this.longitude;
    this.latLongStr.emit(tmpLatLong);
    //this.getAddress(this.latitude, this.longitude);
  }




  findAddress() {
    // this.mapsAPILoader.load().then(() => {

    //   this.geoCoder = new google.maps.Geocoder;

    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });

    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       // some details
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //       this.address = place.formatted_address;

    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });




  }

}
