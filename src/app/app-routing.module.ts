import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component'
import { UserViewComponent } from './user-view/user-view.component'

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: UsersListComponent },
  { path: 'view/:id', component: UserViewComponent },
  { path: 'edit/:id', component: UserEditComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
