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
    return this.http.post('http://'+window.location.hostname+':8080/api/songs/',
    encodeURIComponent("title")+'='+encodeURIComponent(this_title)
    +"&"+encodeURIComponent("artist")+'='+encodeURIComponent(this_artist)
    +"&"+encodeURIComponent("genre")+'='+encodeURIComponent(this_genre),
    httpOptions
    )
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      }
      
      );
    
    
  }
  
}


