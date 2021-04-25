import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Child from '../../interfaces/Child';
import Tutor from '../../interfaces/Tutor';
import Room from '../../interfaces/Room';
import Group from '../../interfaces/Group';
import { AppComponent } from '../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss']
})
export class NewLessonComponent implements OnInit {

  constructor(private apiService: ApiService,
              private snackBar: MatSnackBar) {
    apiService.get('groups').subscribe(groups => {
      this.groups = groups;
    });

    apiService.get('rooms').subscribe(rooms => {
      this.rooms = rooms;
    });

    apiService.get('tutors').subscribe(tutors => {
      this.tutors = tutors;

      this.tutors.forEach(tutor => {
        tutor.absent = true;
      });

      this.tutors.sort((t1, t2) => AppComponent.compare(t1.name, t2.name));
    });
  }

  children: Child[] = [];
  tutors: Tutor[] = [];
  rooms: Room[] = [];
  groups: Group[] = [];
  selectedGroup?: Group;
  selectedRoom?: Room;
  note = '';

  groupControl = new FormControl('', [
    Validators.required
  ]);

  roomControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
  }

  groupSelectionChanged(): void {
    this.apiService.get(`children/byGroup/${ this.selectedGroup?.id }`).subscribe(children => {
      this.children = children;

      this.children.forEach(child => {
        child.absent = true;
      });

      this.children.sort((c1, c2) => AppComponent.compare(c1.name, c2.name));
    });
  }

  changeAbsentSate(obj: Child | Tutor): void {
    obj.absent = !obj.absent;
  }

  save(): void {
    const children: number[] = [];
    const tutors: number[] = [];

    this.children.forEach(child => {
      if (!child.absent) {
        children.push(child.id);
      }
    });

    this.tutors.forEach(tutor => {
      if (!tutor.absent) {
        tutors.push(tutor.id);
      }
    });

    const lesson = {
      children,
      tutors,
      group: this.selectedGroup?.id,
      room: this.selectedRoom?.id,
      note: this.note
    };

    if (!this.groupControl.errors && !this.roomControl.errors) {
      this.apiService.post('/lessons', lesson).subscribe(failure => {
        if (!failure) {
          this.snackBar.open('Gruppenstunde wurde erfolgreich gespeichert.', '', {duration: 4000});
        } else {
          this.snackBar.open('Gruppenstunde konnte nicht gespeichert werden. Versuche es erneut.', '', {duration: 6000});
        }
      });
    } else {
      this.snackBar.open('Bitte überprüfen Sie Ihre Eingaben.', '', {duration: 6000});
    }
  }
}
