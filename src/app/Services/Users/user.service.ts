import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.BASEURL
  constructor(private http:HttpClient) {}

    getUser(): Observable<any> {
      return this.http.get(`${environment.BASEURL}User`);
    }

    DeleteUser(id:any):Observable<any>{
      return this.http.delete(`${this.baseURL}User/${id}`)
    }

    Addibrarian(userData):Observable<any>{
      return this.http.post(this.baseURL+"User/register",{
        username:userData.username,
        email:userData.email,
        pass:userData.password,
        userrole:"librarian"
      })
    }
}
