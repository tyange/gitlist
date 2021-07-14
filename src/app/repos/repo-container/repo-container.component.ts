import { Component, Input } from '@angular/core';

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

  dragStart(
    event: any,
    index: number,
    repo: { id: string; name: string; url: string; location: string }
  ) {
    console.log('drag-start');
    this.draggingInList = true;
    this.draggingNode = event.target;
    this.draggingItemIndex = index;
    // this.draggingInRepos = true;
    // this.dragDropService.dragStart(event, index, repo);
    // setTimeout(() => {
    //   this.dragging = true;
    // }, 0);
  }

  draggingStyling(id: string, name: string) {
    // const currentDraggingItem = this.dragDropService.getDraggingRepo();
    // if (currentDraggingItem.id === id && currentDraggingItem.name === name) {
    //   return true;
    // }
    // return false;
  }

  dragEnterInList(event: DragEvent, index: number) {
    event.preventDefault();
    console.log('drag-enter-in-list');
    const draggingItemIndex = this.draggingItemIndex;
    const draggingNode = this.draggingNode;
    if (event.target !== draggingNode) {
      console.log('2');
      const newItems = this.repos.items;
      const currentItem = newItems.splice(draggingItemIndex, 1)[0];
      newItems.splice(index, 0, currentItem);
      this.draggingItemIndex = index;
      this.repos.items = newItems;
    }
  }

  dragEnd() {
    this.draggingInList = false;
    // const updatedRepos = this.dragDropService.dragEnd(arr);
    // if (updatedRepos) {
    //   this.repos.items = updatedRepos;
    // }
    // this.draggingInRepos = false;
    // this.dragging = false;
  }

  dragEnterOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log('drag-enter-on-list');
  }

  dragOverOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.draggingOver = true;
    console.log('drag-over-on-list');
    // const draggingRepo = this.dragDropService.getDraggingRepo();
    // if (draggingRepo.location === this.location) {
    //   this.draggingInRepos = true;
    // } else if (draggingRepo.location !== this.location) {
    //   this.draggingInRepos = false;
    // }
  }

  dragLeaveOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.draggingOver = false;
    console.log('drag-leave-on-list');
  }

  dropOnList(location: string) {
    this.draggingOver = false;
    this.draggingInList = false;
    // this.dragDropService.dragDrop(arr, location);
    console.log('droped', location);
  }

  onDragInList(draggingState: boolean) {
    this.draggingInList = draggingState;
  }

  onUpdateItems(
    arr: Array<{
      id: string;
      name: string;
      url: string;
      location: string;
    }>
  ) {
    console.log(arr);
  }
}
