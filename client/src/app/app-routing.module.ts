import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupsListComponent} from './components/groups-list/groups-list.component';

const routes: Routes = [
  {path: '', component: GroupsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
