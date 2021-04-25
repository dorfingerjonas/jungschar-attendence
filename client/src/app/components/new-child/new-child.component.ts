import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Group from '../../interfaces/Group';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-child',
  templateUrl: './new-child.component.html',
  styleUrls: ['./new-child.component.scss']
})
export class NewChildComponent implements OnInit {

  groups: Group[] = [];
  group?: Group;
  name = '';

  nameControl = new FormControl('', [
    Validators.required
  ]);

  groupControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private apiService: ApiService,
              private snackBar: MatSnackBar) {
    apiService.get('/groups').subscribe(groups => {
      this.groups = groups;
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.apiService.post('/children', {name: this.name, group: this.group?.id}).subscribe(failure => {
      if (!failure) {
        this.snackBar.open(`"${ this.name }" wurde erstellt.`, '', {duration: 4000});
      } else {
        this.snackBar.open(`"${ this.name }" konnte nicht erstellt werden. Versuche es später erneut.`, '', {duration: 6000});
      }
    });
  }
}
