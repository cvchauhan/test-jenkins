import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';
@Pipe({
    name: 'dateFormat',
    pure: false
  })
export class DateFormatPipe implements PipeTransform {

    transform(dateValue: any): any {
      
      return this.getDate(dateValue);
    }
    getDate(dateValue: any): any{
       let fDateVal;
        if(dateValue){
            
            fDateVal = moment(dateValue).format('DD-MM-YYYY');
        }
     
      return fDateVal;
    }
  }