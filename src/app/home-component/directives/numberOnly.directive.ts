import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class OnlynumberDirective {

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange() {
    const initalValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initalValue.replace(/[^0-9-]*/g, '');
  }
}