import { Component, Input } from '@angular/core';

import { DragDropService } from 'src/app/shared/drag-drop/drag-drop.service';

import { Repo } from '../repo.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent {
  @Input() list: {
    listName: string;
    items: Array<Repo>;
  } = {
    listName: '',
    items: [],
  };

  draggingInList: boolean = false;
  draggingOver: boolean = false;
  draggingNode: any;
  draggingItemIndex: any;

  constructor(private dropEventService: DragDropService) {}

  dragStart(event: DragEvent, index: number, repo: Repo) {
    this.draggingInList = true;
    this.draggingNode = event.target;
    this.dropEventService.setDraggingRepo(repo);
    this.draggingItemIndex = index;
  }

  draggingStyling(id: string) {
    const currentDraggingItem = this.dropEventService.getDraggingRepo();
    if (currentDraggingItem.id === id) {
      return true;
    }
    return false;
  }

  dragEnterInList(event: DragEvent, index: number) {
    event.preventDefault();
    const draggingItemIndex = this.draggingItemIndex;
    const draggingNode = this.draggingNode;
    if (event.target !== draggingNode) {
      const newItems = this.list.items;
      const currentItem = newItems.splice(draggingItemIndex, 1)[0];
      newItems.splice(index, 0, currentItem);
      this.draggingItemIndex = index;
      this.list.items = newItems;
    }
  }

  dragEnterOnList(event: DragEvent) {
    event.preventDefault();
  }

  dragOverOnList(event: DragEvent) {
    event.preventDefault();

    const draggingRepo = this.dropEventService.getDraggingRepo();
    if (draggingRepo.location === this.list.listName) {
      this.draggingOver = false;
    } else if (draggingRepo.location !== this.list.listName) {
      this.draggingOver = true;
    }
  }

  dragLeaveOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.draggingOver = false;
    console.log('drag-leave-on-list');
  }

  dropOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.draggingOver = false;
    this.draggingInList = false;
    const dropedRepo = this.dropEventService.getDraggingRepo();
    if (dropedRepo.location !== this.list.listName) {
      this.dropEventService.dropedInOtherList();
      const newItems = this.list.items;
      const updatedRepo = { ...dropedRepo, location: this.list.listName };
      newItems.splice(newItems.length, 0, updatedRepo);
      this.list.items = newItems;
    }
  }

  dragEnd() {
    this.draggingInList = false;
    this.draggingOver = false;
    this.draggingNode = null;
    const draggingRepo = this.dropEventService.getDraggingRepo();
    const isDroped = this.dropEventService.getDropedState();
    const currentItems = this.list.items;
    let updatedItems;
    if (isDroped) {
      updatedItems = currentItems.filter((repo) => repo.id !== draggingRepo.id);
      this.list.items = updatedItems;
    }
    this.dropEventService.dragDropSvcInit();
  }
}
