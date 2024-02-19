import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/Users/user.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/Auth';
import { environment } from 'src/environment/environment';
import { DeleteComponentComponent } from '../Components/delete-component/delete-component.component';
import { CreateUserComponent } from '../Components/create-user/create-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent {
  loading:boolean = false;
  ProjectId:any
  userList:any
  displayedColumns: string[] = ['Username','Fullname','Email','Role','CreatedAt','Actions'];
  Credentials = UserLogin()
  AdminId = environment.admin
  LoggedInUser = UserLogin()
  constructor(private userService : UserService,private toastr : ToastrService,private dialog: MatDialog) {
  }
  ngOnInit(){
    this.GetUserList()
}
GetUserList(){
   this.userService.getUsersWithoutProjects().subscribe({
    next:(res)=>{
      res.sort((a, b) => {
        if (a.userId === this.LoggedInUser.userId) {
          return -1; // Current user comes first
        } else if (b.userId === this.LoggedInUser.userId) {
          return 1; // Current user comes second
        } else {
          return 0; // Maintain the original order for other users
        }
      });
      this.userList = res;
    }
   })
  }
openDeleteDialog(id: any) {
  this.dialog.open(DeleteComponentComponent, {
    height: '',
    width: '350px',
    data: {
      type:"users",
      userId: id,
      LoadUsers: this.GetUserList.bind(this)
    }
  })
}
openCreateUserDialog() {
  this.dialog.open(CreateUserComponent, {
    width:"50vw",
    height:"100vh",
    position:{"top":"0px","right":"0px"},
    data:{
      ProjectId:this.ProjectId,
      UserList:this.userList,
      LoadUsers:this.GetUserList.bind(this)
    }
  })
}

}
