import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phoneNumber]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class PhoneNumberDirective {
  
    constructor(public model: NgControl,
       private element: ElementRef) {}

  @HostListener('input', ['$event'])
    onModelChange() {
      this.onInputChange(false);
    }
  
  @HostListener('keydown.backspace', ['$event'])
    keydownBackspace() {
      this.onInputChange(true);
    }
     
  onInputChange(backspace?: boolean) {    
    let initialValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initialValue.replace(/[^0-9-]*/g, '');
    if (backspace && initialValue.charAt(initialValue.length - 1) === '-') {
      initialValue = initialValue.slice(0, -1)
    }
    else {
      if(this.element.nativeElement.value.length ===3) initialValue = `${initialValue}-`;
      if(this.element.nativeElement.value.length ===7) initialValue = `${initialValue}-`;
    }
    this.element.nativeElement.value = initialValue;
  }
}