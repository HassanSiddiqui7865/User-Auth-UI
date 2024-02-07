import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { ProjectService } from 'src/app/Services/Project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/Auth';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements AfterViewInit ,OnInit {
  @Input() data: string; 
  @ViewChild('drawerContainer') drawerContainer: MatDrawerContainer;
  project: any;
  comp:boolean=true;
  projectId : any
  userList:any[]
  userLoggedIn = UserLogin()
  AdminId = environment.admin
  ManagerId = environment.MId
  constructor(private dialog: MatDialog,private projectService : ProjectService,private router : Router) {
    this.projectId = this.router.url.split("/")[2]
  }

  ngAfterViewInit(): void {
    this.openDrawer();
  }
  ngOnInit(): void {
    this.getProject()
  }

  openDrawer() {
    this.comp = false
    setTimeout(() => {
      if (this.drawerContainer) {
        this.drawerContainer.open();
      } else {
        console.error("Drawer container is not available.");
      }
    }, 0);
  }
  closeDrawer(){
    this.drawerContainer.close()
    this.comp = true
  }

  getProject(){
    this.projectService.GetProjectById(this.projectId).subscribe({
      next:(res)=>{
        this.project = res
        this.userList =res.users 
      }
    })
  }
  AccessToDetails() {
    const user = this.userList?.find((item) => item.userId === this.userLoggedIn.userId);

    if (this.userLoggedIn.roleId === this.AdminId || this.userLoggedIn.roleId === this.ManagerId || user?.isLead) {
      return true;
    }
  
    return false;
  }
  
}
