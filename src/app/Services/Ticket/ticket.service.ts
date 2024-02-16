import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http : HttpClient) { }
  createticket(ticketData):Observable<any>{
   return this.http.post(`${environment.BASEURL}/Ticket`,{
      ticketsummary:ticketData.ticketsummary,
      ticketdescription:ticketData.ticketdescription,
      assignedTo:ticketData.assignedto,
      reportedBy:ticketData.reportedby,
      projectId:ticketData.projectId,
      ticketpriority:ticketData.priority.optionname,
      ticketstatus:ticketData.status,
      tickettype:ticketData.type.name
    })
  }
  getAllticket():Observable<any>{
    return this.http.get(`${environment.BASEURL}/Ticket`)
  }
  getProjectId(projectId:any):Observable<any>{
    return this.http.get(`${environment.BASEURL}/Ticket/${projectId}`)
  }
  updateTicketStatus(ticketId:any,status:string):Observable<any>{
    return this.http.put(`${environment.BASEURL}/Ticket/${ticketId}/${status}`,{})
  }
}
