import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailvalidationService {

  constructor() { }
  validateEmail(email){
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)=== false){
      alert("You have entered an invalid email address!");
    return;
  }

  }
}
