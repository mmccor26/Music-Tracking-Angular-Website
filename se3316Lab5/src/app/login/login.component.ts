import { Component, OnInit } from '@angular/core';
import { EmailvalidationService } from '../emailvalidation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  constructor(private EmailvalidationService:EmailvalidationService) { }

  ngOnInit() {
  }
  validateEmail():void{
    this.EmailvalidationService.validateEmail(this.email);
    
  }

}
