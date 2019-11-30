import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { EmailvalidationService } from '../emailvalidation.service';
interface LooseObject {
  [key: string]: any
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string='';
  password:string='';
  response:LooseObject=null;
  SM:string=localStorage.getItem('SM');
  constructor(private EmailvalidationService:EmailvalidationService) { }

  ngOnInit() {
  }
  registerUser():void{
    console.log("Clicked");
    this.EmailvalidationService.registerUser(this.email,this.password).subscribe(
      data => {
        this.response = data;
        console.log("POST call successful value returned in body", this.response);
        if(this.response.name==="MongoError"){
            alert("Email already taken");
        }
    },
    err=>{
      alert('err');
    })
  }

}
