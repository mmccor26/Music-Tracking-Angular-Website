import { Component, OnInit } from '@angular/core';
import { EmailvalidationService } from '../emailvalidation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(private EmailvalidationService:EmailvalidationService) { }

  ngOnInit() {
  }
  validateEmail():void{
    this.EmailvalidationService.validateEmail(this.email,this.password).subscribe(
      (val) => {
        localStorage.setItem('token',val.token);
        console.log(val.token);
        localStorage.setItem('loggedIn','true');
        console.log("POST call successful value returned in body", val);
        if(val.message == "account locked"){
          alert("Account is not activated, either activated your account via email or contact the site manager");
        }
      },
    
    err=>{
      
      

    })
    
    
    
  }

}
