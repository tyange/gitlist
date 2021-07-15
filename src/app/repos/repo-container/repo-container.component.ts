import { Component, Input } from '@angular/core';
import { DropEventService } from 'src/app/shared/drag-drop/drop-event.service';

@Component({
  selector: 'app-repo-container',
  templateUrl: './repo-container.component.html',
  styleUrls: ['./repo-container.component.css'],
})
export class RepoContainerComponent {
  @Input() repos: {
    container: string;
    items: Array<{
      id: string;
      name: string;
      url: string;
      location: string;
    }>;
  } = {
    container: '',
    items: [],
  };

  draggingInList: boolean = false;
  draggingOver: boolean = false;
  draggingNode: any;
  draggingItemIndex: any;

  constructor(private dropEventService: DropEventService) {}

  dragStart(
    event: DragEvent,
    index: number,
    repo: { id: string; name: string; url: string; location: string }
  ) {
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
      const newItems = this.repos.items;
      const currentItem = newItems.splice(draggingItemIndex, 1)[0];
      newItems.splice(index, 0, currentItem);
      this.draggingItemIndex = index;
      this.repos.items = newItems;
    }
  }

  dragEnterOnList(event: DragEvent) {
    event.preventDefault();
  }

  dragOverOnList(event: DragEvent) {
    event.preventDefault();

    const draggingRepo = this.dropEventService.getDraggingRepo();
    if (draggingRepo.location === this.repos.container) {
      this.draggingOver = false;
    } else if (draggingRepo.location !== this.repos.container) {
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
    if (dropedRepo.location !== this.repos.container) {
      this.dropEventService.dropedInOtherList();
      const newItems = this.repos.items;
      const updatedRepo = { ...dropedRepo, location: this.repos.container };
      newItems.splice(newItems.length, 0, updatedRepo);
      this.repos.items = newItems;
    }
  }

  dragEnd() {
    this.draggingInList = false;
    this.draggingOver = false;
    this.draggingNode = null;
    const draggingRepo = this.dropEventService.getDraggingRepo();
    const isDroped = this.dropEventService.getDropedState();
    const currentItems = this.repos.items;
    let updatedItems;
    if (isDroped) {
      updatedItems = currentItems.filter((repo) => repo.id !== draggingRepo.id);
      this.repos.items = updatedItems;
    }
    this.dropEventService.dragDropSvcInit();
  }
}
