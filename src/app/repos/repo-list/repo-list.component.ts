import { Component } from '@angular/core';

import { DragDropService } from 'src/app/shared/drag-drop.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent {
  dragging: boolean = false;
  draggingInNewRepos: boolean = false;
  location: string = 'new-repos';
  newRepos: Array<{ id: string; name: string; url: string; location: string }> =
    [];

  constructor(public dragDropService: DragDropService) {}

  onDivDragEnter(event: any) {
    event.preventDefault();
  }

  onDivDragOver(event: any) {
    event.preventDefault();
    const draggingRepo = this.dragDropService.getDraggingRepo();
    if (draggingRepo.location === this.location) {
      this.draggingInNewRepos = true;
    } else if (draggingRepo.location !== this.location) {
      this.draggingInNewRepos = false;
    }
  }

  onDrop(arr: Array<{}>, location: string) {
    this.dragDropService.dragDrop(arr, location);
  }

  onDragStart(
    event: any,
    index: number,
    repo: { id: string; name: string; url: string; location: string }
  ) {
    this.dragDropService.dragStart(event, index, repo);
    setTimeout(() => {
      this.dragging = true;
    }, 0);
  }

  draggingStyling(id: string, name: string) {
    const currentDraggingItem = this.dragDropService.getDraggingRepo();
    if (currentDraggingItem.id === id && currentDraggingItem.name === name) {
      return true;
    }
    return false;
  }

  onDragEnter(event: any, arr: Array<{}>, index: number, name: string) {
    event.preventDefault();
    this.dragDropService.dragEnter(event, arr, index, name);
  }

  onDragEnd(
    arr: Array<{ id: string; name: string; url: string; location: string }>
  ) {
    const updatedRepos = this.dragDropService.dragEnd(arr);
    if (updatedRepos) {
      this.newRepos = updatedRepos;
    }
    this.dragging = false;
  }

  logging() {
    // console.log(this.dragDropService.getDropedState());
    console.log(this.newRepos);
  }
}
