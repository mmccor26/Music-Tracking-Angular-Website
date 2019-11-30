import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DMCAComponent implements OnInit {
  SM:string=localStorage.getItem('SM');
  DMCA:Object;
  text:string='';
  constructor(private HttpService: HttpService) { }

  ngOnInit() {
      this.getDMCA();
  }

  getDMCA():void{
    this.HttpService.getDMCA().subscribe(data=>{
      this.DMCA=data;
    })
  }
  updateDMCA():void{
    this.HttpService.updateDMCA(this.text);
  }
  

}
