import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http : HttpClient,private router : Router,private toastr: ToastrService) { }


  LoginUser(userData):Observable<any>{
    return this.http.post(`${environment.BASEURL}/User/login`,{
        username:userData.username,
        pass:userData.password,
      })
  }
  getUserbyUsername(username:string):Observable<any>{
    return this.http.get(`${environment.BASEURL}/User/${username}`)
  }



  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

}
