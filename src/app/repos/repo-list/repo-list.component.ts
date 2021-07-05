import { Component } from '@angular/core';

import { DragDropService } from 'src/app/shared/drag-drop.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent {
  draggingInNewRepos: boolean = false;
  newRepos: Array<{ id: string; name: string; url: string }> = [];

  constructor(public dragDropService: DragDropService) {}

  onDivDragEnter(event: any) {
    event.preventDefault();
  }

  onDivDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(arr: Array<{}>) {
    this.dragDropService.dragDrop(arr);
  }

  onDragStart(
    event: any,
    index: number,
    id: string,
    name: string,
    url: string
  ) {
    this.draggingInNewRepos = true;
    this.dragDropService.dragStart(event, index, id, name, url);
  }

  onDragEnter(event: any, arr: Array<{}>, index: number, name: string) {
    event.preventDefault();
    this.dragDropService.dragEnter(event, arr, index, name);
  }

  onDragEnd(arr: Array<{ id: string; name: string; url: string }>) {
    this.dragDropService.dragEnd(arr);
    this.draggingInNewRepos = false;
  }
}
