import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../Services/Project/project.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../Services/Users/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponentComponent } from '../Components/delete-component/delete-component.component';
import { UserLogin } from 'src/Auth';
import { environment } from 'src/environment/environment';
import { CreateUserComponent } from '../Components/create-user/create-user.component';



@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {
  BookForm : FormGroup
  loading:boolean = false;
  userList:any=[]
  CreateUserForm : FormGroup
  displayedColumns: string[] = ['Username','Fullname','Email','Role','CreatedAt','Actions'];
  Credentials = UserLogin()
  AdminId = environment.admin
  constructor(private userService : UserService, private dialog: MatDialog) {
  }
  ngOnInit(){
    
    this.GetUserList()
    
  }
  GetUserList(){
    this.userService.getUser().subscribe({
      next:(res)=>{
        this.userList =  res.filter((items)=>items.roleId!== this.AdminId)
      }
    }
    );
  }
  openDeleteDialog(id: any) {
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '350px',
      data: {
        type:"users",
        userId: id,
        loadUsers: this.GetUserList.bind(this)
      }
    })
  }
  openCreateUserDialog() {
    this.dialog.open(CreateUserComponent, {
      height: '100vh',
      width: '600px',
      position:{"right":"0px","top":"0px"},
      data:{
        LoadUsers:this.GetUserList.bind(this)
      }
    })
  }
  
}
