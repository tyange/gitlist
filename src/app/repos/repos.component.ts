import { Component, OnInit } from '@angular/core';

import { Octokit } from '@octokit/core';
import { DragDropService } from '../shared/drag-drop.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  dragging: boolean = false;
  draggingInRepos: boolean = false;
  location: string = 'repos';
  repos: {
    drawer: string;
    items: Array<{ id: string; name: string; url: string; location: string }>;
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
        let arr: Array<{
          id: string;
          name: string;
          url: string;
          location: string;
        }> = [];
        response.data.map((responseData: any, index: string) => {
          const repository = {
            id: index,
            name: responseData.name,
            url: responseData.html_url,
            location: 'repos',
          };
          arr.push(repository);
        });
        this.repos.items = arr;
      });
  }

  onDivDragEnter(event: any) {
    event.preventDefault();
  }

  onDivDragOver(event: any) {
    event.preventDefault();
    const draggingRepo = this.dragDropService.getDraggingRepo();
    if (draggingRepo.location === this.location) {
      this.draggingInRepos = true;
    } else if (draggingRepo.location !== this.location) {
      this.draggingInRepos = false;
    }
  }

  onDrop(arr: Array<{}>, location: string) {
    this.dragDropService.dragDrop(arr, location);
  }

  onDragStart(
    event: any,
    index: number,
    repo: { id: string; name: string; url: string; location: string }
  ) {
    this.dragDropService.dragStart(event, index, repo);
    setTimeout(() => {
      this.dragging = true;
    }, 0);
  }

  draggingStyling(id: string, name: string) {
    const currentDraggingItem = this.dragDropService.getDraggingRepo();
    if (currentDraggingItem.id === id && currentDraggingItem.name === name) {
      return true;
    }
    return false;
  }

  onDragEnter(event: any, arr: Array<{}>, index: number, name: string) {
    this.dragDropService.dragEnter(event, arr, index, name);
  }

  onDragEnd(
    arr: Array<{ id: string; name: string; url: string; location: string }>
  ) {
    const updatedRepos = this.dragDropService.dragEnd(arr);
    if (updatedRepos) {
      this.repos.items = updatedRepos;
    }
    this.dragging = false;
  }
}
