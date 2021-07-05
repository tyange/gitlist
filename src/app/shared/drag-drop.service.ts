import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  dragging: boolean = false;
  draggingNode: any;
  draggingItem: { index: any; name: string } = {
    index: null,
    name: '',
  };
  draggingRepo: { id: any; name: string; url: string } = {
    id: null,
    name: '',
    url: '',
  };
  droped: boolean = false;

  dragStart(
    event: any,
    index: number,
    repoId: string,
    name: string,
    url: string
  ) {
    this.dragging = true;
    this.draggingNode = event.target;
    this.draggingItem = { index, name };
    this.draggingRepo = { id: repoId, name, url };
    setTimeout(() => {
      this.dragging = true;
    }, 0);
  }

  dragEnter(event: any, arr: Array<{}>, index: number, name: string) {
    event.preventDefault();
    const draggingItem = this.getDraggingItem();
    const draggingNode = this.getDraggingNode();
    if (event.target !== draggingNode) {
      let newRepos = arr;
      const currentRepo = newRepos.splice(draggingItem.index, 1)[0];
      newRepos.splice(index, 0, currentRepo);
      this.draggingItem = { index, name };
      return newRepos;
    }
    return;
  }

  dragDrop(arr: Array<{}>) {
    const draggingRepo = this.getDraggingRepo();
    arr.splice(arr.length, 0, draggingRepo);
    this.dropedInOtherList();
  }

  dragEnd(arr: Array<{ id: string; name: string; url: string }>) {
    const droped = this.getDropedState();
    if (droped === true) {
      const draggingItem = this.getDraggingRepo();
      const currentRepos = arr.filter((repo) => repo.id !== draggingItem.id);
      return currentRepos;
    }
    this.draggingInitialize();
    return;
  }

  getDraggingItem() {
    return this.draggingItem;
  }

  getDraggingNode() {
    return this.draggingNode;
  }

  getDraggingRepo() {
    return this.draggingRepo;
  }

  getDropedState() {
    return this.droped;
  }

  dropedInOtherList() {
    this.droped = true;
  }

  draggingInitialize() {
    this.droped = false;
    this.draggingNode = null;
    this.draggingItem = {
      index: null,
      name: '',
    };
    this.draggingRepo = {
      id: null,
      name: '',
      url: '',
    };
  }
}
