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

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop() {
    const draggingRepo = this.reposService.repoDragOver();

    const updatedRepos = this.newRepos.splice(
      this.newRepos.length,
      0,
      draggingRepo
    );
  }
}
