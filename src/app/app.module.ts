import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MyListComponent } from './my-list/my-list.component';
import { RepoListComponent } from './repos/repo-list/repo-list.component';
import { RepoComponent } from './repos/repo-list/repo/repo.component';
import { ReposComponent } from './repos/repos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RepoListComponent,
    RepoComponent,
    ReposComponent,
    MyListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
