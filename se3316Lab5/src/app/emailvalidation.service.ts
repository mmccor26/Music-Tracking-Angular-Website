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
  url:string='http://3.86.209.249:8080/api';

  constructor(private http:HttpClient) { }
  validateEmail(email,password){
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)=== false){
      alert("You have entered an invalid email address!");
      return;
    }
    
    return this.http.post(this.url+'/login',
      encodeURIComponent("email")+'='+encodeURIComponent(email)
      +"&"+encodeURIComponent("password")+'='+encodeURIComponent(password),
      httpOptions
      )
    
      
  }
  loginSM(email,password){
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)=== false){
      alert("You have entered an invalid email address!");
      return;
    }
    
    return this.http.post(this.url+'/sitemanager/login',
      encodeURIComponent("email")+'='+encodeURIComponent(email)
      +"&"+encodeURIComponent("password")+'='+encodeURIComponent(password),
      httpOptions
      )
      
  }
  registerUser(email,password){
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)=== false){
      alert("You have entered an invalid email address!");
      return;
    }
    
    return this.http.post(this.url+'/register',
      encodeURIComponent("email")+'='+encodeURIComponent(email)
      +"&"+encodeURIComponent("password")+'='+encodeURIComponent(password),
      httpOptions
      )
      
  }
  


}
  

  
