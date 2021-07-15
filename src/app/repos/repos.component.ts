import { Component, OnInit } from '@angular/core';

import { Octokit } from '@octokit/core';

import { Repo } from './repo.model';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  dragging: boolean = false;
  draggingOver: boolean = false;
  draggingInRepos: boolean = false;
  location: string = 'repos';

  allRepos: {
    listName: string;
    items: Array<Repo>;
  } = {
    listName: 'repos',
    items: [],
  };

  repoLists: Array<{
    listName: string;
    items: Array<Repo>;
  }> = [
    {
      listName: 'test',
      items: [
        { id: '143', name: '1', url: 'test.com', location: 'test' },
        { id: '122', name: '2', url: 'test.com', location: 'test' },
        { id: '33', name: '3', url: 'test.com', location: 'test' },
      ],
    },
  ];

  octokit = new Octokit();

  ngOnInit() {
    this.octokit
      .request('GET /users/babyazalea/repos', {
        username: 'babyazalea',
        per_page: 100,
      })
      .then((response) => {
        let arr: Array<Repo> = [];
        response.data.map((responseData: any, index: string) => {
          const repository = {
            id: index,
            name: responseData.name,
            url: responseData.html_url,
            location: this.location,
          };
          arr.push(repository);
        });
        this.allRepos.items = arr;
      });
  }
}
