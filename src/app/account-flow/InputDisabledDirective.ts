import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Directive for add disable attribute to input element
 * Eg: [appInputDisabled]="isDisabled"
 * @export
 * @class InputDisabledDirective
 * @implements {OnChanges}
 */
@Directive({
  selector: '[appInputDisabled]'
})

export class InputDisabledDirective implements OnChanges {
  @Input() appInputDisabled: boolean;

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    this.el.nativeElement.disabled = (this.appInputDisabled) ? true : false;
  }

}