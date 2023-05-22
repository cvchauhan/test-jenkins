import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = +params['id']; // (+) converts string 'id' to a number
  //     console.log(this.id)
  //     // In a real app: dispatch action to load the details here.
  //  });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
