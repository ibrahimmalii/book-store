import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get(url : string){
    return this.http.get<any>(url);
  }

  post(url: string, body: any, hidder? :any){
    return this.http.post<any>(url, body, hidder)
  }

  put(url : string,body: any, id : any, hidder? : any){
    return this.http.put(`${url}/${id}`, body, hidder)
  }

  delete(url: string , id : any){
    return this.http.delete(`${url}/${id}`)
  }
}
