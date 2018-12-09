import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogsService } from './logs.service';
import { UserModel } from './models/UserModel';
import { UserDetailsModel } from './models/UserDetailsModel';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, find } from 'rxjs/operators';
import * as _ from "lodash";

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'secret-key': '$2a$10$onB0cLysLrTeZ6f1qKeGgebQglAE7cwLYZk0k6bU9id/J4E2VchG6'
 })
};

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private usersUrl = 'https://api.jsonbin.io/';
  private collection = 'b/5c0cd480b14202700871681b';
  private users: UserDetailsModel[]; 
  constructor(
    private http: HttpClient,
    private logsService: LogsService
  ) { }
  getUsers (): Observable<UserDetailsModel[]> {
    return this.http.get<UserDetailsModel[]>(`${this.usersUrl}${this.collection}/latest`, httpOptions)
      .pipe(
        tap(users => this.users = users),
        tap(users => this.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getUser(id: number): Observable<UserDetailsModel> {
    const url = `${this.usersUrl}${this.collection}/latest`;
    return this.http.get<UserDetailsModel[]>(url, httpOptions).pipe(
      tap(users => this.users = users),
      map(
        users=>this.extractUser(users, id)
      ),
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<UserDetailsModel>(`getUser id=${id}`))
    )

  }
  extractUser(users: UserDetailsModel[], id) {
    let user = users.find(user => user.id === id);
    return user;
  }
  updateUser (updatedUser: UserDetailsModel): Observable<any> {
    const url = `${this.usersUrl}${this.collection}`;
    let data = _.map(this.users, 
      (user)=>user.id === updatedUser.id ? updatedUser : user)
    return this.http.put(url, data, httpOptions).pipe(
      tap(res => this.log(`updated user id=${updatedUser.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  private log(message: string) {
    this.logsService.emit(`Log: ${message}`);
  }
}
