import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-sitemanager',
  templateUrl: './sitemanager.component.html',
  styleUrls: ['./sitemanager.component.css']
})
export class SitemanagerComponent implements OnInit {

  title:string='';
  artist:string='';
  genre:string='';
  constructor(private HttpService:HttpService) { }

  ngOnInit() {
  }
  createSong():void{
    
    this.HttpService.createSong(this.title,this.artist,this.genre);
    
  }

}
