import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataProviderService } from '../data-provider.service';
import { UserDetailsModel } from '../models/UserDetailsModel'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

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
    this.dataProviderService.getUser(id)
      .subscribe(user => this.user = user);
  }
 
  goBack(): void {
    this.location.back();
  }

}
