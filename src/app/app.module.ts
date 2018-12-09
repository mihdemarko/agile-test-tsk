import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { HttpClientModule }    from '@angular/common/http';
import { UserViewComponent } from './user-view/user-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ViewElementComponent } from './view-element/view-element.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserViewComponent,
    UserEditComponent,
    ViewElementComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
