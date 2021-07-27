import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyListComponent } from './my-list/my-list.component';
import { ReposComponent } from './repos/repos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'repos', component: ReposComponent },
  { path: 'my-list', component: MyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
