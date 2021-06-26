import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReposService {
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

  repoDragEnd() {}

  repoDragOver() {
    return this.draggingRepo;
  }
}
