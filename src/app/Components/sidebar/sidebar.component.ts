import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateTaskComponent } from '../create-task/create-task.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  constructor(private dialog: MatDialog) {
  }
  handleOpenTask(){
    this.dialog.open(CreateTaskComponent,{
      width:"55%",
      height:"100vw"

    })
  }
}
