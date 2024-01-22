import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

    getUser(): Observable<any> {
      return this.http.get("https://localhost:7135/api/User");
    }

    DeleteUser(id:any):Observable<any>{
      return this.http.delete(`https://localhost:7135/api/User/${id}`)
    }

    Addibrarian(userData):Observable<any>{
      return this.http.post("https://localhost:7135/api/User/register",{
        username:userData.username,
        email:userData.email,
        pass:userData.password,
        userrole:"librarian"
      })
    }
}
