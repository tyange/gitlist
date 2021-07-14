import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropInList]',
})
export class DropInListDirective {
  constructor() {}

  @HostListener('dragover', ['$event']) onListDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('dragenter', ['$event']) onListDragEnter(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('drop', ['$event']) onListDrop(e: DragEvent) {
    const data = e.dataTransfer?.getData('text/plain');

    if (data) {
      console.log(JSON.parse(data));
    }
  }
}
