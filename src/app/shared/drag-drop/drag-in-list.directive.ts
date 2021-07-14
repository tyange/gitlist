import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragInList]',
})
export class DragInListDirective {
  @Input() changingList: Array<{ id: string; name: string }> = [];
  @Input() draggingItem: { id: string; name: string } = {
    id: '',
    name: '',
  };
  @Input() itemIndex: number | undefined;
  @Output() draggingEnter = new EventEmitter<any>();

  draggingNode: HTMLElement | undefined;

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    console.log('drag start');
    console.log(this.draggingItem);
    const stringifyData = JSON.stringify(this.draggingItem);
    event.dataTransfer?.setData('text/plain', stringifyData);
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.draggingItem);
  }

  @HostListener('dragend', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('drag-over');
  }
}
