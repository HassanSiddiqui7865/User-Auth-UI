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

  createProject(projectData:any,avatarUrl:string):Observable<any>{
    return this.http.post(`${environment.BASEURL}/Project`,{
      projectname:projectData.projectname,
      projectkey:projectData.projectkey,
      avatarUrl:avatarUrl,
      projectdescription:projectData.projectdescription
    })
  }
  getAssignedProjects(id:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/Project/user/${id}`)
  }
  getProjectManager():Observable<any>{
    return this.http.get(`${environment.BASEURL}/User/role/${environment.MId}`)
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
  
  DeleteProject(id:any):Observable<any>{
    return this.http.delete(`${environment.BASEURL}/Project/${id}`); 
  }
  updateProject(id:any,projectData:any,avatarUrl:string):Observable<any>{
    return this.http.put(`${environment.BASEURL}/Project/${id}`,{
      projectname:projectData.projectname,
      projectkey:projectData.projectkey,
      avatarUrl:avatarUrl,
      projectdescription:projectData.projectdescription
    })
  }
  getProjectsWithoutusers():Observable<any>{
    return this.http.get(`${environment.BASEURL}/Project/withoutUsers`)
  }
  getProjectWithoutusers(projectid:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/Project/withoutUsers/${projectid}`)
  }
  ChangeLeadIfNoLead(projectId:any,userId:any):Observable<any>{
    return this.http.put(`${environment.BASEURL}/AssignedProject/${projectId}/${userId}`,{})
  }
  ChangeLeadIfLead(projectId:any,leadId:any,userId:any):Observable<any>{
    return this.http.put(`${environment.BASEURL}/AssignedProject/${projectId}/${leadId}/${userId}`,{})
  }
  GetProjectById(projectId:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/Project/${projectId}`)
  }
}
