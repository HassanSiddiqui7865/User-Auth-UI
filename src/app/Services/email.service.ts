import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http : HttpClient) { }

  Email(recieverName:string,recieverEmail:string,subject:string,message:string):Observable<any>{
    return this.http.post(`${environment.BASEURL}/Email`,{
      recieverName:recieverName,
      recieverEmail:recieverEmail,
      subject:subject,
      message:message
    })
  }
}
