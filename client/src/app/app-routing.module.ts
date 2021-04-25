import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { DetailGroupComponent } from './components/detail-group/detail-group.component';
import { NewLessonComponent } from './components/new-lesson/new-lesson.component';
import { NewChildComponent } from './components/new-child/new-child.component';
import { NewTutorComponent } from './components/new-tutor/new-tutor.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { NewGroupComponent } from './components/new-group/new-group.component';

const routes: Routes = [
  {path: '', component: GroupsListComponent},
  {path: 'group/new', component: NewGroupComponent},
  {path: 'group/:id', component: DetailGroupComponent},
  {path: 'lesson/new', component: NewLessonComponent},
  {path: 'child/new', component: NewChildComponent},
  {path: 'tutor/new', component: NewTutorComponent},
  {path: 'room/new', component: NewRoomComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
