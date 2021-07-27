import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isExpanded: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  expandingHandle() {
    console.log(this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }
}
