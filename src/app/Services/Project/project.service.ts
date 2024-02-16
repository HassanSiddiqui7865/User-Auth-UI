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
    return this.http.get(`${environment.BASEURL}Project`);
  }

  createProject(projectData:any):Observable<any>{
    return this.http.post(`${environment.BASEURL}/Project`,{
      projectname:projectData.projectname,
      projectdescription:projectData.projectdescription
    })
  }
  getAssignedProjects(id:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/AssignedProject/${id}`)
  }
  getProjectManager():Observable<any>{
    return this.http.get(`${environment.BASEURL}/User/role/${environment.PMId}`)
  }
  AssignedUser(userId:any,projectId:any,isLead:boolean):Observable<any>{
    return this.http.post(`${environment.BASEURL}/AssignedProject`,{
      userId:userId,
      projectId:projectId,
      isLead:isLead
    })
  }
  DeleteAssignedUser(projectId:any,userId:any):Observable<any>{
    return this.http.delete(`${environment.BASEURL}/AssignedProject/${projectId}/${userId}`)
  }
  getProject(id:any): Observable<any> {
    return this.http.get(`${environment.BASEURL}Project/${id}`);
  }
  DeleteProject(id:any):Observable<any>{
    return this.http.delete(`${environment.BASEURL}Project/${id}`); 
  }
  updateProject(id:any,projectData:any):Observable<any>{
    return this.http.put(`${environment.BASEURL}/Project/${id}`,{
      projectname:projectData.projectname,
      projectdescription:projectData.projectdescription
    })
  }
  getProjectWithoutusers():Observable<any>{
    return this.http.get(`${environment.BASEURL}/Project/withoutUsers`)
  }
}
