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
  pTitle:string='';
  description:string='';
  songid:string='';
  playlistid:string='';
  put_genre:string='';
  userid:string='';
  copy_songid:string='';
  text:string='';
  date:Date;
  noticeType:string='';
  SM:string=localStorage.getItem('SM');
  


  constructor(private HttpService:HttpService) { }

  ngOnInit() {
  }
  
  updateSong():void{
    this.HttpService.updateSong(this.songid);
  }
  makeSitemager():void{
    this.HttpService.makeSitemanagerUser(this.userid);
  }
  toggleUser():void{
    this.HttpService.toggleUser(this.userid);
  }
  logCopyright():void{
    this.HttpService.logCopyright(this.copy_songid,this.date,this.text,this.noticeType);
  }


}
