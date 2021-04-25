import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import Room from "../../interfaces/Room";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  rooms: Room[] = [];
  room?: Room;
  name = '';

  nameControl = new FormControl('', [
    Validators.required
  ]);

  roomControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private apiService: ApiService,
              private snackBar: MatSnackBar) {
    apiService.get('/rooms').subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.apiService.post('/groups', {name: this.name, room: this.room?.id}).subscribe(failure => {
      if (!failure) {
        this.snackBar.open(`"${ this.name }" wurde erstellt.`, '', {duration: 4000});
      } else {
        this.snackBar.open(`"${ this.name }" konnte nicht erstellt werden. Versuche es später erneut.`, '', {duration: 6000});
      }
    });
  }

}
