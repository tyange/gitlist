import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
})
export class RepoComponent {
  dragging: boolean = false;

  @Input() repoItems: Array<{
    id: string;
    name: string;
    url: string;
    location: string;
  }> = [];

  @Input() repo: { id: string; name: string; url: string; location: string } = {
    id: '',
    name: '',
    url: '',
    location: '',
  };

  @Input() repoIndex: any = null;

  @Output() draggingInList = new EventEmitter<boolean>();
  @Output() updatedItems = new EventEmitter<
    Array<{
      id: string;
      name: string;
      url: string;
      location: string;
    }>
  >();

  draggingNode: any;
  draggingItemIndex: number | undefined;

  dragStart(
    event: any,
    index: number,
    repo: { id: string; name: string; url: string; location: string }
  ) {
    console.log('drag-start');
    this.dragging = true;
    this.draggingInList.emit(true);
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
    console.log(draggingNode);
    if (event.target !== draggingNode && draggingItemIndex) {
      console.log('2');
      const newItems = this.repoItems;
      const currentItem = newItems.splice(draggingItemIndex, 1)[0];
      newItems.splice(index, 0, currentItem);
      this.draggingItemIndex = index;
      this.updatedItems.emit(newItems);
    }
    // this.dragDropService.dragEnter(event, arr, index, name);
  }

  dragEnd() {
    this.dragging = false;
    this.draggingInList.emit(false);
    // const updatedRepos = this.dragDropService.dragEnd(arr);
    // if (updatedRepos) {
    //   this.repos.items = updatedRepos;
    // }
    // this.draggingInRepos = false;
    // this.dragging = false;
  }
}
