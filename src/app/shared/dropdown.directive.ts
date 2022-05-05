import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')
  isOpen = false;
  elRef: any;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event){
    this.isOpen = !this.isOpen;
  }
}
