import { Component } from '@angular/core';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
})
export class TestListComponent {
  testArr: Array<{ id: string; name: string }> = [
    { id: '0', name: 'zero' },
    { id: '1', name: 'first' },
    { id: '2', name: 'second' },
    { id: '3', name: 'third' },
    { id: '4', name: 'fourth' },
  ];

  updatingList(event: any) {
    // console.log(event);
  }

  // onDrop(event: DragEvent) {
  //   console.log(event.dataTransfer);
  // }
}
