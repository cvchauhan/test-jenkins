import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appOutside]' 
})

export class OutsideDirective {

  constructor(private elementref: ElementRef) { }

  @Output()

  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  onClick(event) {
    const clickedInside = this.elementref.nativeElement.contains(event);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }
}