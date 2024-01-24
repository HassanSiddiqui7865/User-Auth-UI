import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from 'src/environment/environment'
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http : HttpClient) { }
  getProjects(): Observable<any> {
    return this.http.get(`${environment.BASEURL}/Project`);
  }

  createProject(projectData:any):Observable<any>{
    return this.http.post(`${environment.BASEURL}/Project`,{
      projectshortname:projectData.projectshortname,
      projectfullname:projectData.projectfullname
    })
  }
  getProject(id:any): Observable<any> {
    return this.http.get(`${environment.BASEURL}/Project/${id}`);
  }
  DeleteProject(id:any):Observable<any>{
    return this.http.delete(`${environment.BASEURL}/Project/${id}`); 
  }
  updateProject(id:any,projectData:any):Observable<any>{
    return this.http.put(`${environment.BASEURL}/Project/${id}`,{
      projectshortname:projectData.projectshortname,
      projectfullname:projectData.projectfullname
    })
  }
}
