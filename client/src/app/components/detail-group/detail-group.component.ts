import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Group from '../../interfaces/Group';
import Room from '../../interfaces/Room';
import Child from '../../interfaces/Child';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent implements OnInit {

  groupId = 0;
  group?: Group;
  children?: Child[];
  rooms?: Room[];
  groups?: Group[];

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    room: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.groupId = parseInt(this.route.snapshot.paramMap.get('id') || '', 0);

    this.apiService.get('children/byGroup/' + this.groupId).subscribe(data => {
      this.children = data;

      this.children?.sort((c1, c2) => AppComponent.compare(c1.name, c2.name));
    });

    this.apiService.get('groups/' + this.groupId).subscribe(data => {
      this.group = data;
    });

    this.apiService.get('groups/').subscribe(data => {
      this.groups = data;
    });

    this.apiService.get('rooms/').subscribe(data => {
      this.rooms = data;
    });
  }

  saveChild(child: Child): void {
    this.apiService.put(`children/${ child.id }`, {name: child.name, group: child.group.id}).subscribe(res => {
      let message: string;
      let duration: number;

      if (res === null) {
        this.filterChildren();
        message = `Änderungen von "${ child.name }" wurden gespeichert!`;
        duration = 4000;
      } else {
        message = `Änderungen von "${ child.name }" konnten nicht gespeichert werden! Bitte versuche es später erneut.`;
        duration = 6000;
      }

      this.snackBar.open(message, '', { duration });
      this.children?.sort((c1, c2) => AppComponent.compare(c1.name, c2.name));
    });
  }

  filterChildren(): void {
    this.children = this.children?.filter(c => c.group.id === this.groupId);
  }

  saveGroup(group: Group): void {
    this.apiService.put(`groups/${ group.id }`, {name: group.name, room: group.room.id}).subscribe(res => {
      let message: string;
      let duration: number;

      if (res === null) {
        this.filterChildren();
        message = `Änderungen von Gruppe "${ group.name }" wurden gespeichert!`;
        duration = 4000;
      } else {
        message = `Änderungen von Gruppe "${ group.name }" konnten nicht gespeichert werden! Bitte versuche es später erneut.`;
        duration = 6000;
      }

      this.snackBar.open(message, '', { duration });
    });
  }
}
