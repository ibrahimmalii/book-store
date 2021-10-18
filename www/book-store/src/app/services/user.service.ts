import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl = 'http://localhost:8080/api/auth/login';
  registerUrl = 'http://localhost:8080/api/auth/register';

  loggedStatus =new BehaviorSubject<boolean>(false);
  constructor(private apiService : ApiService) {
    this.setLoggedStatus(this.isLogged());
  }

  setLoggedStatus(status : boolean){
    this.loggedStatus.next(status);
  };

  getLoggedStatus(){
    return this.loggedStatus.asObservable();
  }

  login(body:any){
    return this.apiService.post(this.loginUrl, body);
  }

  register(body:any){
    return this.apiService.post(this.registerUrl, body);
  }

  isLogged():boolean{
    return localStorage.token ? true : false;
  }

  logout(){
    localStorage.clear();
    this.setLoggedStatus(false);
  }

  isAdmin(){
    const user = JSON.parse(localStorage.user);
    return user.role_id === 1 ? true : false;
  }

  getToken(){
    return `Bearer ${localStorage.token}`;
  }
}
