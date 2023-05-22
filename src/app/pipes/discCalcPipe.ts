import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'calDisc',
    pure: true
  })
export class DiscCalcPipe implements PipeTransform {

    transform(amount: any,perct: any): any {
      
      return this.getAmount(amount,perct);
    }
    getAmount(amount: any, perct): any{
        let amountVal:number = 0;
        if(amount){
            
            let perAmount = (amount * perct) / 100;
            let fAmount = amount - perAmount;
            amountVal = fAmount;
        }
     
      return amountVal;
    }
  }