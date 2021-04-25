import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupComponent } from './components/group/group.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailGroupComponent } from './components/detail-group/detail-group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './components/menu/menu.component';
import { NewLessonComponent } from './components/new-lesson/new-lesson.component';
import { NewChildComponent } from './components/new-child/new-child.component';
import { NewTutorComponent } from './components/new-tutor/new-tutor.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GroupsListComponent,
    GroupComponent,
    DetailGroupComponent,
    MenuComponent,
    NewLessonComponent,
    NewChildComponent,
    NewTutorComponent,
    NewRoomComponent,
    NewGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
