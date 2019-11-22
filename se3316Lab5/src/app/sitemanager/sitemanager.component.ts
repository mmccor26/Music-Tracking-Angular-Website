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
  constructor(private HttpService:HttpService) { }

  ngOnInit() {
  }
  /*createSong():void{
    this.HttpService.createSong(this.title,this.artist,this.genre);
  }*/
  updateSong():void{
    this.HttpService.updateSong(this.songid,this.put_genre);
  }
  deleteSong():void{
    this.HttpService.deleteSong(this.songid);
  }
  deactivateUser():void{
    this.HttpService.deactivateUser(this.userid);
  }


}
