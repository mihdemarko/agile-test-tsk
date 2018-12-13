import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataProviderService } from '../data-provider.service';
import { UserDetailsModel } from '../models/UserDetailsModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  user: UserDetailsModel;
  constructor(
    private route: ActivatedRoute,
    private dataProviderService: DataProviderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
 
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(this.dataProviderService.getUser(id)
      .subscribe(user => this.user = user));
  }
 
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s: Subscription) => {
      s.unsubscribe()
    });
  }

}
