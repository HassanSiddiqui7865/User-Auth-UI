import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http : HttpClient,private router : Router,private toastr: ToastrService) { }
  

  LoginUser(userData):Observable<any>{
    return this.http.post("http://localhost:51865/api/User/login",{
        username:userData.username,
        pass:userData.password,
      })
  }
  getUserbyUsername(userData):Observable<any>{
    return this.http.get(`https://localhost:7135/api/User/${userData.username}`)
  }

  isLoggedIn(){
    return localStorage.getItem('login')!==null;
  }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }

}
