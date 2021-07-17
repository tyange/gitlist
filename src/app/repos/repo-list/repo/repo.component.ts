import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Repo } from '../../repo.model';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
})
export class RepoComponent {
  @Input() repo: Repo = {
    id: '',
    name: '',
    url: '',
    location: '',
  };
}
