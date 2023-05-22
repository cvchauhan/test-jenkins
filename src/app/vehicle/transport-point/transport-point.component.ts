import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VehicleService } from '../vehicle.service';
import Utils from 'src/app/helpers/utils';

@Component({
  selector: 'app-transport-point',
  templateUrl: './transport-point.component.html',
  styleUrls: ['./transport-point.component.scss']
})
export class TransportPointComponent implements OnInit {

  public pointData: any[];
  public holidayDialog: boolean = false;
  public transortPointForm: FormGroup;
  public isEdit: boolean = false;
  public holidayId: number;
  public latitude: number;
  public longitude: number;
  Address
  public zoom: number;
  isMapVisible: boolean = false
  status
  StatusData = [
    { name: 'Active', code: 0 },
    { name: 'Inactive', code: 1 },
  ];
  constructor(private messageService: MessageService, private fb: FormBuilder, private confirmationService: ConfirmationService, private vehicleService: VehicleService) { }

  ngOnInit(): void {

    this.addHolidayForm();
    this.getTrasportPointData();
    this.latitude = 24.6029;
    this.longitude = 73.6867;
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.holidayDialog = false;
  }

  addHolidayForm() {
    this.transortPointForm = this.fb.group({
      // status:['',[this.isEdit ? Validators.required : '']],
      cTransportPointNm: ['', [Validators.required]],
      cDescription: ['', [Validators.required]],
      cLatLong: ['', [Validators.required]],
      nTransportPointId: 0,
      nUserid: localStorage.getItem('empID'),
      dCreateDate: Utils.formatDate(new Date())
    });
  }

  get formControls() {
    return this.transortPointForm.controls;

  }

  getTrasportPointData(): void {
    this.vehicleService.getTransportPointData().subscribe((res: any) => {
      if (res.status == 200) {
        this.pointData = res['data'];
      }

    }, (error) => {

    });
  }

  editHoliday(holiday) {
    this.vehicleService.getTransportPointById(holiday.nTransportPointId).subscribe((response: any) => {
      if (response) {
        const data = response['data']
        this.transortPointForm.patchValue({
          cTransportPointNm: data['cTransportPointNm'],
          cDescription: data['cDescription'],
          cLatLong: data['cLatLong'],
          dCreateDate: new Date(data['dCreateDate']),
        });
        this.holidayId = data['nTransportPointId'];
      }
    })
    this.isEdit = true;
    this.holidayDialog = true;

  }


  openAddForm(): void {
    this.isEdit = false;
    this.holidayDialog = true;
    this.transortPointForm.reset();
  }


  addEditTransportPoint(): void {
    const formData = this.transortPointForm.getRawValue();
    formData['nTransportPointId'] = this.isEdit ? this.holidayId : 0;
    console.log("formData", formData);
    this.vehicleService.AddTransportPoint(formData).subscribe((res: any) => {
      if (res) {
        this.showSuccess(res['message']);
        this.transortPointForm.reset();
        this.getTrasportPointData();
        this.holidayDialog = false;
      }
    }, err => {

    })

  }
  openMap() {
    this.isMapVisible = true;
    this.latitude = this.transortPointForm.get('cLatLong').value;
  }


  showSuccess(succ) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
  }

  showError(error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }

  getLatLng(evt) {
    if (evt) {
      if (evt.includes(')')) {
        var splitted = evt.split(")");

        if (splitted[0] != "") {
          this.Address = splitted[0];
          var addresssplitted = splitted[0].split(",");
          if (addresssplitted.length > 0) {
          }
        }
        else {
          this.Address = splitted[0];
        }
        this.latitude = splitted[1];
        this.longitude = splitted[2];
      }
      this.transortPointForm.patchValue({
        cLatLong: this.latitude + "," + this.longitude
      })
      this.isMapVisible = false
      console.log(this.transortPointForm.value);
    }
  }


}
