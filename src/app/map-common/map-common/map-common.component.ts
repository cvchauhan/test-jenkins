import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.css']
})
export class MapCommonComponent implements OnInit {
  public address: string;
  public latitude: number;
  public longitude: number;
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  // public searchControl: FormControl;
  public zoom: number;;
  @Input() Name: string = '';
  @Output() latLong = new EventEmitter<string>();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes != undefined) {
      var splited = changes.Name['currentValue'].split(')');
      this.latitude = splited[0];
      this.longitude = splited[1];
    }
    // this.val = this.Name;
    console.log(changes);
  }
  ngOnInit(): void {
    this.zoom = 18;
    this.address = "";
    // this.latitude = 24.6029;
    // this.longitude = 73.6867;
    // let tmpLatLong = this.latitude + " "+ this.longitude;
    // this.latLong.emit(tmpLatLong);

    let tmpAddressLatLong = this.address + ")" + this.latitude + ")" + this.longitude;
    this.latLong.emit(tmpAddressLatLong);

    //create search FormControl
    // this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

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
          this.address = place.formatted_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          let tmpAddressLatLong = this.address + ")" + this.latitude + ")" + this.longitude;
          this.latLong.emit(tmpAddressLatLong);
          console.log(this.address, this.latitude, this.longitude);
          this.zoom = 18;
        });
      });
    });
  }

  FindAddress() {
    let latlong = this.searchElementRef.nativeElement.value;
    let arraylatlong = latlong.split(',');
    let aray1 = arraylatlong[0];
    let aray2 = arraylatlong[1];
    this.mapsAPILoader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {
        lat: parseFloat(aray1),
        lng: parseFloat(aray2)
      };
      let ad;
      let lat;
      let long;
      let tmpAddress;
      geocoder.geocode({
        'location': latlng
      }, function (results) {
        if (results != null) {
          ad = results[0].formatted_address;
          lat = aray1;
          long = aray2;
          let tmpAddressLatLong = ad + ")" + lat + ")" + long;
          tmpAddress = tmpAddressLatLong;
          console.log(ad, lat, long);
        }
      });
      setTimeout(() => {
        this.ngZone.run(() => {
          this.address = ad;
          this.latitude = lat;
          this.longitude = long;
          this.latLong.emit(tmpAddress);
          this.zoom = 18;
        });
      }, 500);
    });
  }



  keyUpHandler() {
    // this.findAddress();
  }

  ngAfterViewInit() {
    // this.findAddress();
  }

  private setCurrentPosition() {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.latitude = position.coords.latitude;
    //     this.longitude = position.coords.longitude;

    //     let tmpLatLong = "" + ")" + this.latitude + ")" + this.longitude;
    //     this.latLong.emit(tmpLatLong);
    //     this.zoom = 12;
    //   });
    // }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.ShowLocation(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  private ShowLocation(position: any): void {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    let tmpLatLong = "" + ")" + this.latitude + ")" + this.longitude;
    this.latLong.emit(tmpLatLong);
    this.zoom = 18;
  }


  markerDragEnd($event: any) {
    this.searchElementRef.nativeElement.value = '';
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    let tmpLatLong = "" + ")" + this.latitude + ")" + this.longitude;
    this.latLong.emit(tmpLatLong);
    // console.log(this.latitude,this.longitude);
    //this.getAddress(this.latitude, this.longitude);
  }

  findAddress() { }

  getLatLong(evt) {
    console.log(evt);
    // this.latLong = evt;
    this.latLong.emit(evt);

    // console.log('latest latlong',evt);
  }

}
