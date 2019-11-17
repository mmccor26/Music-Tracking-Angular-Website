import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded',
    observe: 'response'
  }),
  
};
@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class EmailvalidationService {

  constructor(private http:HttpClient) { }
  validateEmail(email,password){
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)=== false){
      alert("You have entered an invalid email address!");
      return;
    }
    
    return this.http.post('http://184.73.70.178:8080/api/login',
      encodeURIComponent("email")+'='+encodeURIComponent(email)
      +"&"+encodeURIComponent("password")+'='+encodeURIComponent(password),
      httpOptions
      )
      
    }

  }

  
