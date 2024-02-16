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
      return this.http.get(`${environment.BASEURL}/User`);
    }

    DeleteUser(id:any):Observable<any>{
      return this.http.delete(`${environment.BASEURL}/User/${id}`)
    }

    createUser(userData:any):Observable<any>{
      return this.http.post(`${environment.BASEURL}/User/register`,{
        fullname:userData.fullname,
        username:userData.username,
        email:userData.email,
        pass:userData.pass,
        roleId:userData.roleId
      })
    }
    getRoles():Observable<any>{
      return this.http.get(`${environment.BASEURL}/Role`)
    }
    getUsersWithoutProjects():Observable<any>{
      return this.http.get(`${environment.BASEURL}/User/withoutProjects`)
    }
}
