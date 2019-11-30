import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {
  SM:string=localStorage.getItem('SM');
  PrivacyPolicy:Object;
  text:string='';

  constructor(private HttpService: HttpService) { }

  ngOnInit() {
    this.getPrivacyPolicy();
  }
  getPrivacyPolicy():void{
    this.HttpService.getPrivacyPolicy().subscribe(data=>{
      this.PrivacyPolicy=data;
    })
  }
  updatePrivacyPolicy():void{
    this.HttpService.updatePrivacyPolicy(this.text);
  }

}
