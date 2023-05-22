import { AbstractControl, ValidationErrors } from "@angular/forms"

export const numberValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: number = control.value || '';
  let msg = "";

  if (isNaN(control.value)) {
    const matches = (/^\d*$/);
    return matches ? null : { 'invalidNumber': true };
  } else {
    return null;
  }

  //[a-zA-Z]+
}

// function (control: AbstractControl): {[key: string]: boolean} {
//   // const DIGIT_EXPS = /^\d*$/;
//   // if (!control.value.match(DIGIT_EXPS)) {
//   //   return {'invalidNumber': true}
//   // } 
//   // return null

//   if (isNaN(control.value)) {
//     console.log("Inside If Block");
//     return {
//       invalidNumber: true
//     };
//   }
//   console.log("Returning null");
//   return null;

//}



