import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  draggingNode: any;
  draggingItem: { index: any; name: string } = {
    index: null,
    name: '',
  };
  draggingRepo: { id: any; name: string; url: string; location: string } = {
    id: null,
    name: '',
    url: '',
    location: '',
  };
  droped: boolean = false;

  dragStart(
    event: any,
    index: number,
    repo: { id: string; name: string; url: string; location: string }
  ) {
    this.draggingNode = event.target;
    this.draggingItem = { index, name: repo.name };
    this.draggingRepo = {
      id: repo.id,
      name: repo.name,
      url: repo.url,
      location: repo.location,
    };
  }

  dragEnter(event: any, arr: Array<{}>, index: number, name: string) {
    event.preventDefault();
    const draggingItem = this.getDraggingItem();
    const draggingNode = this.getDraggingNode();
    console.log(draggingNode, event.target);
    if (event.target !== draggingNode) {
      let newRepos = arr;
      const currentRepo = newRepos.splice(draggingItem.index, 1)[0];
      newRepos.splice(index, 0, currentRepo);
      this.draggingItem = { index, name };
      return newRepos;
    }
    return;
  }

  dragDrop(arr: Array<{}>, location: string) {
    this.dropedInOtherList();
    const draggingRepo = this.getDraggingRepo();
    draggingRepo.location = location;
    arr.splice(arr.length, 0, draggingRepo);
  }

  dragEnd(
    arr: Array<{ id: string; name: string; url: string; location: string }>
  ) {
    const draggingItem = this.getDraggingRepo();
    const isDroped = this.getDropedState();
    let currentRepos;
    if (isDroped) {
      currentRepos = arr.filter((repo) => repo.id !== draggingItem.id);
    }
    this.draggingInitialize();
    return currentRepos;
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
      location: '',
    };
  }
}
