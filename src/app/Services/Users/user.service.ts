import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

    getUser(): Observable<any> {
      return this.http.get(`${environment.BASEURL}/User`);
    }

    DeleteUser(id:any):Observable<any>{
      return this.http.delete(`${environment.BASEURL}/User/${id}`)
    }

    createUser(userData:any,roleId:any):Observable<any>{
      return this.http.post(`${environment.BASEURL}/User/register`,{
        fullname:userData.fullname,
        username:userData.username,
        email:userData.email,
        pass:userData.pass,
        roleId:roleId
      })
    }
    getRoles():Observable<any>{
      return this.http.get(`${environment.BASEURL}/Role`)
    }
    getUsersWithoutProjects():Observable<any>{
      return this.http.get(`${environment.BASEURL}/User/withoutProjects`)
    }
    getUserById(userId:any):Observable<any>{
      return this.http.get(`${environment.BASEURL}/User/${userId}`)
    }
    updateRole(userId:any,roleId:any):Observable<any>{
      return this.http.put(`${environment.BASEURL}/User/${userId}/${roleId}`,{})
    }

}
