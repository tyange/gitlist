import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  draggingRepo: { id: string; name: string; url: string; location: string } = {
    id: '',
    name: '',
    url: '',
    location: '',
  };
  isDroped: boolean = false;

  getDraggingRepo() {
    return this.draggingRepo;
  }

  setDraggingRepo(repo: {
    id: string;
    name: string;
    url: string;
    location: string;
  }) {
    this.draggingRepo = repo;
  }

  getDropedState() {
    return this.isDroped;
  }

  dropedInOtherList() {
    this.isDroped = true;
  }

  dragDropSvcInit() {
    this.draggingRepo = {
      id: '',
      name: '',
      url: '',
      location: '',
    };
    this.isDroped = false;
  }
}
