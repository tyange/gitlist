import { Component } from '@angular/core';
import { ReposService } from '../repos.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent {
  newRepos: Array<{ id: number; name: string }> = [];

  constructor(public reposService: ReposService) {}

  onDragEnter(event: any) {
    event.preventDefault();
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop() {
    const draggingRepo = this.reposService.getDragItem();

    this.newRepos.splice(this.newRepos.length, 0, draggingRepo);

    this.reposService.draggingItemDroped();
  }
}
