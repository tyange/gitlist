import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RepoContainerComponent } from './repos/repo-container/repo-container.component';
import { RepoComponent } from './repos/repo-container/repo/repo.component';
import { RepoListComponent } from './repos/repo-list/repo-list.component';
import { ReposComponent } from './repos/repos.component';
import { DragDropDirective } from './shared/drag-drop/drag-drop.directive';
import { DragInListDirective } from './shared/drag-drop/drag-in-list.directive';
import { DropInListDirective } from './shared/drag-drop/drop-in-list.directive';
import { TestListComponent } from './test-list/test-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReposComponent,
    RepoListComponent,
    RepoContainerComponent,
    RepoComponent,
    // DragDropDirective,
    // DropInListDirective,
    // DragInListDirective,
    // TestListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
