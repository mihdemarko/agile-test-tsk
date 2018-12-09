import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: UserModel[];
  constructor(
    private dataProviderService: DataProviderService
  ) { }

  ngOnInit() {
    this.getUssers()
  }
  getUssers(): void {
    this.dataProviderService.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(this.users)
      })
  }

}
