import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loaderservices/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public  loading: boolean;

  constructor(private loaderservice: LoaderService) { 
    this.loaderservice.isLoading.subscribe((v) => {
      //console.log(v);
      this.loading = v;
    });
  }

  ngOnInit(): void {
  }

}
