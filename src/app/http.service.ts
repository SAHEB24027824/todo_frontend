import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public URL="http://localhost:8080"

  constructor(
    private http:HttpClient
  ) { }


  public getItem(){
    return this.http.get(`${this.URL}/item`);
  }
  
  public addItem(item){
    return this.http.post(`${this.URL}/item`,item);
  }
    
  public updateItem(item){
    return this.http.put(`${this.URL}/item`,item);
  }
  public deleteItem(id){
    return this.http.delete(`${this.URL}/item/${id}`);
  }
}


