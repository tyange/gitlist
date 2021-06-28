import { Component, OnInit } from '@angular/core';

import { Octokit } from '@octokit/core';
import { ReposService } from './repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  repos: {
    drawer: string;
    items: Array<{ id: number; name: string; url: string }>;
  } = {
    drawer: 'repos',
    items: [],
  };

  octokit = new Octokit();

  constructor(public reposService: ReposService) {}

  ngOnInit() {
    this.octokit
      .request('GET /users/babyazalea/repos', {
        username: 'babyazalea',
        per_page: 100,
      })
      .then((response) => {
        let arr: Array<{ id: number; name: string; url: string }> = [];
        response.data.map((responseData: any, index: number) => {
          const repository = {
            id: index,
            name: responseData.name,
            url: responseData.html_url,
          };
          arr.push(repository);
        });
        this.repos.items = arr;
      });
  }

  onDragStart(id: number, name: string) {
    this.reposService.repoDragStart(id, name);
  }

  onDragEnd() {
    if (this.reposService.droped === true) {
      const draggedItem = this.reposService.getDragItem();
      const currentRepos = this.repos.items;

      this.repos.items = currentRepos.filter(
        (repo) => repo.id !== draggedItem.id
      );
    }
  }
}
