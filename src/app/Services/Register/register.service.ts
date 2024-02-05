import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient,private router : Router,private toastr : ToastrService) { }


  RegisterUser(userData):Observable<any>{
    return this.http.post(`${environment.BASEURL}/User/register`,{
      username:userData.username,
      email:userData.email,
      pass:userData.password,
    })
  }
}
