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
  url:string='http://'+window.location.hostname+':8080/api';


  constructor(private http:HttpClient) { }
  
  createSong(this_title,this_artist,this_genre,comment,album,year,
    reviewusername,reviewcomment,songrating){
    return this.http.post(this.url+'/songs/',
    encodeURIComponent("title")+'='+encodeURIComponent(this_title)
    +"&"+encodeURIComponent("artist")+'='+encodeURIComponent(this_artist)
    +"&"+encodeURIComponent("album")+'='+encodeURIComponent(album)
    +"&"+encodeURIComponent("songcomment")+'='+encodeURIComponent(comment)
    +"&"+encodeURIComponent("year")+'='+encodeURIComponent(year)
    +"&"+encodeURIComponent("genre")+'='+encodeURIComponent(this_genre)
    +"&"+encodeURIComponent("reviewer")+'='+encodeURIComponent(reviewusername)
    +"&"+encodeURIComponent("reviewtext")+'='+encodeURIComponent(reviewcomment)
    +"&"+encodeURIComponent("rating")+'='+encodeURIComponent(songrating),
    httpOptions)
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      window.location.reload();
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  createReview(username,text,rating,songid){
    return this.http.post(this.url+'/reviews/',
    encodeURIComponent("username")+'='+encodeURIComponent(username)
    +"&"+encodeURIComponent("text")+'='+encodeURIComponent(text)
    +"&"+encodeURIComponent("rating")+'='+encodeURIComponent(rating)
    +"&"+encodeURIComponent("song_id")+'='+encodeURIComponent(songid),

    httpOptions)
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      window.location.reload();
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  logCopyright(copy_songid,date,text,noticeType){
    return this.http.post(this.url+'/sitemanager/Copyright/',
    encodeURIComponent("song_id")+'='+encodeURIComponent(copy_songid)
    +"&"+encodeURIComponent("date")+'='+encodeURIComponent(date)
    +"&"+encodeURIComponent("text")+'='+encodeURIComponent(text)
    +"&"+encodeURIComponent("noticeType")+'='+encodeURIComponent(noticeType),

    httpOptions)
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      window.location.reload();
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  updateSong(this_songid){
    return this.http.put(this.url+'/admin/song/'+this_songid,
    httpOptions)
    .subscribe(
      data  => {
      console.log("PUT Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  updateDMCA(text){
    return this.http.put(this.url+'/sitemanager/DMCA',
    encodeURIComponent("text")+'='+encodeURIComponent(text),
    httpOptions)
    .subscribe(
      data  => {
      console.log("PUT Request is successful ", data);
      window.location.reload();
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  updatePrivacyPolicy(text){
    return this.http.put(this.url+'/sitemanager/Privacy',
    encodeURIComponent("text")+'='+encodeURIComponent(text),
    httpOptions)
    .subscribe(
      data  => {
      console.log("PUT Request is successful ", data);
      window.location.reload();
      },
      error  => {
      
      console.log("Error", error);
      
      });
  }
  deleteSong(this_songid){
    return this.http.delete(this.url+'/song/'+
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
  makeSitemanagerUser(this_userid){
    return this.http.put(this.url+'/user/'+
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
  toggleUser(this_userid){
    return this.http.put(this.url+'/admin/activate/'+
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
    return this.http.get(this.url+'/review/'+song_id);
  }
  searchSongs(keyword){
    return this.http.get(this.url+'/song/'+keyword);
  }
  getSongList(){
    console.log(this.url);
    console.log(window.location);
    return this.http.get(this.url+'/songs');
  }
  getDMCA(){
    return this.http.get(this.url+'/sitemanager/DMCA');
  }
  getPrivacyPolicy(){
    return this.http.get(this.url+'/sitemanager/Privacy');
  }

  
  
}


