import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiResponseSubject = new Subject<any>();

  constructor(private http : HttpClient,private router : Router,private toastr : ToastrService) { }

  getApiResponseObservable() {
    return this.apiResponseSubject.asObservable();
  }

  RegisterUser(userData){
    this.http.post("https://localhost:7135/api/User/register",{
      username:userData.username,
      email:userData.email,
      pass:userData.password,
      userrole:"user"
    })
    .subscribe((res)=>{
      this.apiResponseSubject.next(res);
      this.router.navigate(['/login'])
      this.toastr.success('Account Created Successfully');
    },(err)=>{
      this.apiResponseSubject.error(err);
    })
  }
}
