import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  static compare(s1: string, s2: string): number {
    return s1 > s2 ? 1 : s1 < s2 ? -1 : 0;
  }
}
