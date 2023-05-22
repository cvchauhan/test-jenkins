import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  medicines;
  displayAddEquipment:boolean = false;
  submitted: boolean = false;
  @Output() changeIndex = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    this.medicines = [
      {"medication": "Neurobin-100g","type":"Injection","Qty":"","price_unit":"500.00","action":""},
      {"medication": "Neurobin-100g","type":"Injection","Qty":"","price_unit":"500.00","action":""},
      {"medication": "Neurobin-100g","type":"Injection","Qty":"","price_unit":"500.00","action":""},
      {"medication": "Neurobin-100g","type":"Injection","Qty":"","price_unit":"500.00","action":""},
    ]
  }
    addEquipment(){
      this.displayAddEquipment = true;
    }
    nextPage() {
      this.changeIndex.emit(3);
      this.submitted = true;
  }
  }

