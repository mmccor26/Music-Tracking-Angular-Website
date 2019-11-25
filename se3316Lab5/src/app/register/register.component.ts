import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { EmailvalidationService } from '../emailvalidation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(private EmailvalidationService:EmailvalidationService) { }

  ngOnInit() {
  }
  registerUser():void{
    console.log("Clicked");
    this.EmailvalidationService.registerUser(this.email,this.password).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
    },
    err=>{
      alert('err');
    })
  }

}
