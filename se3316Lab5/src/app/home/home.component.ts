import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  songReviews:Object;
  songs:Object;
  song_id:string;
  title:string='';
  artist:string='';
  genre:Number;
  rating:Number;
  text:string='';
  username:string='';
  songID2:string='';
  keyword:string='';
  year:Number;
  comment:string='';
  album:string='';
  songList:Object;

  constructor(private HttpService: HttpService) { }

  ngOnInit() {
    this.getSongList();
  }
  getReviews():void{
    this.HttpService.getReviews(this.song_id).subscribe(data=>{
      this.songReviews = data;
    })
  }
  createSong():void{
    if(this.title===''||this.artist===''){
      alert("Fill in the needed parameters");
      return;

    }
    this.HttpService.createSong(this.title,this.artist,this.genre,this.comment,this.album,this.year);
  }
  searchSong():void{
    this.HttpService.searchSongs(this.keyword).subscribe(data=>{
      this.songs = data;
      console.log(data);
    });
  }
  createReview():void{
    this.HttpService.createReview(this.username,this.text,this.rating,this.songID2);
  }
  getSongList():void{
    this.HttpService.getSongList().subscribe(data=>{
      this.songList = data;
      console.log(data);
    })
  }

}
