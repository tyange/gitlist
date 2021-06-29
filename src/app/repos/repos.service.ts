import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReposService {
  droped: boolean = false;
  draggingRepo: { id: number; name: string } = {
    id: 0,
    name: '',
  };

  repoDragStart(repoId: number, repoName: string) {
    console.log(`${repoId}, ${repoName}`);
    this.draggingRepo = {
      id: repoId,
      name: repoName,
    };
  }

  getDragItem() {
    return this.draggingRepo;
  }

  dragginginitialize() {
    this.droped = false;
  }

  dropedInList() {
    this.droped = true;
  }
}
