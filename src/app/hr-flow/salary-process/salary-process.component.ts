import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salary-process',
  templateUrl: './salary-process.component.html',
  styleUrls: ['./salary-process.component.css']
})
export class SalaryProcessComponent implements OnInit {
  reactForms:FormGroup
  products=[
    {name:'Gitanjli'}
  ]
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.saveForm()
  }
  saveForm(){
    this.reactForms=this.fb.group({
      sStructur: new FormControl('', [Validators.required]),
      month: new FormControl('',[Validators.required]),
      year: new FormControl('',[Validators.required])

    })
  }
  get formControl(){
    return this.reactForms['controls']
  }

}
