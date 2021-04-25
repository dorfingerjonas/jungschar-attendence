import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Group from '../../interfaces/Group';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  groups: Group[] = [];

  ngOnInit(): void {
    this.apiService.get('groups').subscribe(groups => {
      this.groups = groups;
    });
  }
}
