import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  songReviews:Object;
  song_id:string;
  title:string;
  artist:string;
  genre:string;

  constructor(private HttpService: HttpService) { }

  ngOnInit() {
  }
  getReviews():void{
    this.HttpService.getReviews(this.song_id).subscribe(data=>{
      this.songReviews = data;
    })
  }
  createSong():void{
    this.HttpService.createSong(this.title,this.artist,this.genre);
  }

}
