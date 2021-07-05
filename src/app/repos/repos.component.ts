import { Component, OnInit, ViewChild } from '@angular/core';

import { Octokit } from '@octokit/core';
// import { ReposService } from './repos.service';
import { DragDropService } from '../shared/drag-drop.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  repos: {
    drawer: string;
    items: Array<{ id: string; name: string; url: string }>;
  } = {
    drawer: 'repos',
    items: [],
  };

  octokit = new Octokit();

  constructor(public dragDropService: DragDropService) {}

  ngOnInit() {
    this.octokit
      .request('GET /users/babyazalea/repos', {
        username: 'babyazalea',
        per_page: 100,
      })
      .then((response) => {
        let arr: Array<{ id: string; name: string; url: string }> = [];
        response.data.map((responseData: any, index: string) => {
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

  onDragStart(
    event: any,
    index: number,
    id: string,
    name: string,
    url: string
  ) {
    this.dragDropService.dragStart(event, index, id, name, url);
  }

  onDragEnter(event: any, arr: Array<{}>, index: number, name: string) {
    this.dragDropService.dragEnter(event, arr, index, name);
  }

  onDragEnd(arr: Array<{ id: string; name: string; url: string }>) {
    this.dragDropService.dragEnd(arr);
  }

  logging() {
    console.log(this.repos.items);
  }
}
