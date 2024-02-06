import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import {  Router } from '@angular/router';
import { UserService } from '../Services/Users/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponentComponent } from '../Components/delete-component/delete-component.component';
import { UserLogin } from 'src/Auth';
import { environment } from 'src/environment/environment';
import { AssignUserComponent } from '../Components/assign-user/assign-user.component';



@Component({
  selector: 'app-project-user-manage',
  templateUrl: './project-user-manage.component.html',
  styleUrls: ['./project-user-manage.component.css']
})
export class ProjectUserManageComponent implements OnInit {
  loading:boolean = false;
  ProjectId:any
  userList:any
  displayedColumns: string[] = ['Username','Fullname','Email','CreatedAt','Actions'];
  Credentials = UserLogin()
  AdminId = environment.admin
  ManagerId = environment.member
  constructor(private userService : UserService, private dialog: MatDialog,private projectService : ProjectService,
    private router : Router
    ) {
      this.ProjectId = this.router.url.split("/")[2]
  }

  ngOnInit(){
      this.GetUserList()
  }
  GetUserList(){
     this.projectService.GetProjectById(this.ProjectId).subscribe({
      next:(res)=>{
        this.userList = res.users
        console.log(res)
      }
     })
    }
  openDeleteDialog(id: any) {
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '350px',
      data: {
        type:"assignedusers",
        userId: id,
        projectId:this.ProjectId,
        LoadUsers: this.GetUserList.bind(this)
      }
    })
  }
  openCreateUserDialog() {
    this.dialog.open(AssignUserComponent, {
      width:"400px",
      height:"250px",
      position:{"top":"20px"},
      data:{
        ProjectId:this.ProjectId,
        UserList:this.userList,
        LoadUsers:this.GetUserList.bind(this)
      }
    })
  }
  AccessToDelete(element):boolean{
    const user = this.userList.find((item)=>item.isLead)
    const Manager = this.userList.find((item)=>item.userId === element.userId)
      if(user){
        return true
      }
      else if(this.Credentials.roleId === this.AdminId){
        return true
      }
      else if((this.Credentials.roled === this.ManagerId) && Manager){
        return true
      }
      return false
    }
}