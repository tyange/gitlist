import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[appDragDrop]',
})
export class DragDropDirective {
  @Output() dataTransfer: any = new EventEmitter();

  draggingInList: boolean = false;
  draggingNode: any;
  draggingItem: { index: any; name: string } = {
    index: null,
    name: '',
  };
  draggingRepo: {
    id: any;
    name: string;
    url: string;
    location: string;
  } = {
    id: null,
    name: '',
    url: '',
    location: '',
  };

  constructor(private dragDropService: DragDropService) {}

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    console.log('drag start');
    this.draggingInList = true;
    this.draggingNode = event.target;
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('drag-over');
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    console.log('drop');
    const dataTransfer = event.dataTransfer;
    this.dataTransfer.emit(dataTransfer);
  }
}
