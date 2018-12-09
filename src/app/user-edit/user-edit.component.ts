import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataProviderService } from '../data-provider.service';
import { UserDetailsModel } from '../models/UserDetailsModel';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: UserDetailsModel;
  editForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    website: new FormControl(''),
    company: new FormGroup({
      bs: new FormControl(''),
      catchPhrase: new FormControl(''),
      name: new FormControl('')
    }),
    address: new FormGroup({
      city: new FormControl(''),
      street: new FormControl(''),
      suite: new FormControl(''),
      zipcode: new FormControl('')
    })
  });
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
      .subscribe(user => {
        this.user = user;
        this.editForm.patchValue(user);
      });
  }
 
  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.dataProviderService.updateUser( _.assign(this.user,this.editForm.value))
      .subscribe(()=>this.goBack())
  }

}
