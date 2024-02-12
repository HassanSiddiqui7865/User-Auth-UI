import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  constructor(private dialog : MatDialog){
  }
  openCreateIssueDialog(){
    this.dialog.open(CreateTaskComponent,{
      width:"50vw",
      maxHeight:"70vh"
    })
  }
}
