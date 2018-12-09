import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor() {
  }
  emit(message: string){
      console.log(message)
  }
}
