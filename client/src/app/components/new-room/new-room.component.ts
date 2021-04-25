import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {

  name = '';

  nameControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private apiService: ApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.apiService.post('/rooms', {name: this.name}).subscribe(failure => {
      if (!failure) {
        this.snackBar.open(`"${ this.name }" wurde erstellt.`, '', {duration: 4000});
      } else {
        this.snackBar.open(`"${ this.name }" konnte nicht erstellt werden. Versuche es später erneut.`, '', {duration: 6000});
      }
    });
  }
}
