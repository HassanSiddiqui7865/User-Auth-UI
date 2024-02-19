import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-show-members',
  templateUrl: './show-members.component.html',
  styleUrls: ['./show-members.component.css']
})
export class ShowMembersComponent {
  userList: any; // Declare userList property
  projectname:string;
  PmId = environment.MId
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.userList = data.projectDetail.users
    this.projectname = data.projectDetail.projectname
  }
  
}
