import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assign-map',
  templateUrl: './assign-map.component.html',
  styleUrls: ['./assign-map.component.css']
})
export class AssignMapComponent implements OnInit,AfterViewInit {

  public latitude: number;
    public longitude: number;
    public zoom: number;
    public searchElementRef: ElementRef;
    tmpLatLong;
    @Input() nLat: number;
    @Input() nLong: number;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { 
    
  }

  ngOnInit(): void {
    
  }


  keyUpHandler(){
    // this.findAddress();
   }
 
   ngAfterViewInit(){
    this.zoom = 4;
      this.latitude = this.nLat;
      this.longitude = this.nLong;

    //load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });
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
    //       this.tmpLatLong = this.latitude + " "+ this.longitude;
    //       console.log(this.latitude,this.longitude);
    //       this.zoom = 8;
    //       console.log(this.tmpLatLong);
    //     });
    //   });
    // });
   }
 
  //  private setCurrentPosition() {
  //    if ("geolocation" in navigator) {
  //      navigator.geolocation.getCurrentPosition((position) => {
  //        this.latitude = position.coords.latitude;
  //        this.longitude = position.coords.longitude;
  //        this.zoom = 12;
  //      });
  //    }
  //  }
 
  
 
   markerDragEnd($event: any) {
    console.log($event);
     this.latitude = $event.latLng.lat();
     this.longitude = $event.latLng.lng();
     console.log(this.latitude,this.longitude);
     //this.getAddress(this.latitude, this.longitude);
   }

}
