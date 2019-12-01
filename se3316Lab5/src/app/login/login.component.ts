import { Component, OnInit } from '@angular/core';
import { EmailvalidationService } from '../emailvalidation.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
interface LooseObject {
  [key: string]: any
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  response:LooseObject;
  SM:string=localStorage.getItem('SM');
  constructor(private EmailvalidationService:EmailvalidationService) { }

  ngOnInit() {
  }
  validateEmail():void{
    this.EmailvalidationService.validateEmail(this.email,this.password).subscribe(
      Response => {
        this.response = Response;
        
        
        if(this.response.message == "account locked"){
          alert("Account is not activated, either activated your account via email or contact the site manager");
        }
        
        else{
          console.log("POST call successful value returned in body", this.response.token);
          localStorage.setItem('token',this.response.token.toString());
         
          localStorage.setItem('loggedIn','true');
          alert("Logged In!");
          
        }
      
      },
    err=>{
      alert("Could not login");
      return err;
    })
      
  }
  loginSM():void{
    this.EmailvalidationService.loginSM(this.email,this.password).subscribe(
      Response => {
        
        this.response = Response;
        if(this.response.token.toString() == "account locked"){
          alert("Account is not activated, either activated your account via email or contact the site manager");
        }
        
        else{
          console.log("POST call successful value returned in body", this.response.token);
          localStorage.setItem('SM','true');
          localStorage.setItem('token',this.response.token.toString());
          localStorage.setItem('loggedIn','true');
          alert("Logged In!");
          
        }
      },
    err=>{
      alert("Could not login");
    })  
  }
}
