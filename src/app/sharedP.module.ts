import { NgModule } from '@angular/core';
import { DateFormatPipe } from './pipes/dateFormatPipe';

@NgModule({
  declarations: [
    DateFormatPipe
  ],
  imports: [

  ],

  exports:[DateFormatPipe]
})
export class SharedPModule {}
