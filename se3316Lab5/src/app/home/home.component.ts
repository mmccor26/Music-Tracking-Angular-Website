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

  constructor(private HttpService: HttpService) { }

  ngOnInit() {
  }
  getReviews():void{
    this.HttpService.getReviews(this.song_id).subscribe(data=>{
      this.songReviews = data;
    })

    
  }

}
