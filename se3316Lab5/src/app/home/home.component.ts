import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn:string=localStorage.getItem('loggedIn');
  SM:string=localStorage.getItem('SM');
  songReviews:Object;
  songs:Object;
  listToggle:any={};
  songsToggle:any={};
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
  reviewusername:string='';
  reviewcomment:string='';
  songrating:Number;

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
    this.HttpService.createSong(this.title,this.artist,this.genre,this.comment,this.album,this.year,
      this.reviewusername,this.reviewcomment,this.songrating);
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
