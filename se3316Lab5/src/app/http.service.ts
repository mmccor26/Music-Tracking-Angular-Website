import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http:HttpClient) { }
  
  createSong(this_title,this_artist,this_genre){
    return this.http.post('http://34.227.30.22:8080/api/songs/',
    encodeURIComponent("title")+'='+encodeURIComponent(this_title)
    +"&"+encodeURIComponent("artist")+'='+encodeURIComponent(this_artist)
    +"&"+encodeURIComponent("genre")+'='+encodeURIComponent(this_genre),
    httpOptions)
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  updateSong(this_songid,this_genre){
    return this.http.put('http://34.227.30.22:8080/api/song/'+this_songid,
    encodeURIComponent("genre")+'='+encodeURIComponent(this_genre),
    httpOptions)
    .subscribe(
      data  => {
      console.log("PUT Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  deleteSong(this_songid){
    return this.http.delete('http://34.227.30.22:8080/api/song/'+
    this_songid,
    httpOptions)
    .subscribe(
      data  => {
      console.log("DELETE Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  createPlaylist(this_title,this_description){
    return this.http.post('http://34.227.30.22:8080/api/playlists/',
    encodeURIComponent("title")+'='+encodeURIComponent(this_title)
    +"&"+encodeURIComponent("description")+'='+encodeURIComponent(this_description),
    httpOptions
    )
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
    
      console.log("Error", error);  
      });
  }
  updatePlaylist(this_playlistid,this_songid){
    return this.http.put('http://34.227.30.22:8080/api/playlist/'+this_playlistid,
    encodeURIComponent("song_id")+'='+encodeURIComponent(this_songid),
    httpOptions)
    .subscribe(
      data  => {
      console.log("PUT Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  deletePlaylist(this_playlistid){
    return this.http.delete('http://34.227.30.22:8080/api/playlist/'+
    this_playlistid,
    httpOptions)
    .subscribe(
      data  => {
      console.log("DELETE Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  deactivateUser(this_userid){
    return this.http.put('http://3.93.82.213:8080/api/user/'+
    this_userid,
    httpOptions)
    .subscribe(
      data  => {
      console.log("PUT Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  getReviews(song_id){
    return this.http.get('http://184.73.70.178:8080/api/review/'+song_id);
  }
  
  
}


