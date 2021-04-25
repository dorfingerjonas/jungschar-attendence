import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-tutor',
  templateUrl: './new-tutor.component.html',
  styleUrls: ['./new-tutor.component.scss']
})
export class NewTutorComponent implements OnInit {

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
    this.apiService.post('/tutors', {name: this.name}).subscribe(failure => {
      if (!failure) {
        this.snackBar.open(`"${ this.name }" wurde erstellt.`, '', {duration: 4000});
      } else {
        this.snackBar.open(`"${ this.name }" konnte nicht erstellt werden. Versuche es später erneut.`, '', {duration: 6000});
      }
    });
  }
}
