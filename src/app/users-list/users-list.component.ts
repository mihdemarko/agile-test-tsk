import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { UserModel } from '../models/UserModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: UserModel[];
  subscriptions: Subscription[] = [];
  constructor(
    private dataProviderService: DataProviderService
  ) { }

  ngOnInit() {
    this.getUsers()
  }
  getUsers(): void {
    this.subscriptions.push(this.dataProviderService.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(this.users)
      }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => {
      s.unsubscribe()
    });
  }

}
