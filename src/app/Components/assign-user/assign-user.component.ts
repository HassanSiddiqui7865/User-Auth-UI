import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/Services/Project/project.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})
export class AssignUserComponent implements OnInit {
  CreateUserForm : FormGroup
  roleList:any[]
  loading:boolean =false
  userList:any[]
  filteredArray:any[]
  selectedUser = null
  AdminId:any;
  constructor(private userService : UserService,private projectService : ProjectService,
     public dialogRef: MatDialogRef<AssignUserComponent>,private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data){
      this.AdminId = environment.admin
    }
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this.userService.getUsersWithoutProjects().subscribe({
      next:(res)=>{
        this.userList = res.filter((items)=>items.roleId !== this.AdminId)
      }
    })
  }
  handleChange(event){
    const filteredUser = this.userList.filter((item) => {
      return item.fullname.toLowerCase().startsWith(event.target.value.toLowerCase());
  });
    this.filteredArray= event.target.value === "" ? null: filteredUser;
    if(event.target.value===""){
      this.filteredArray = null
      this.selectedUser = null
    }
    else{
      this.filteredArray
    }
  }
  SetUser(user:any){
    if(!this.data.UserList.find((items)=>items.userId === user.userId)){
      this.selectedUser = user
      this.filteredArray = null
    }
   
  }
  CheckAssigned(user){
    return this.data.UserList.find((item)=>item.userId === user.userId)
  }
  HandleAssignedUser(){
    this.loading = true
    this.projectService.AssignedUser(this.selectedUser.userId,this.data.ProjectId,false).subscribe({
      next:(res)=>{
        this.data.LoadUsers()
        this.loading = false
        this.dialogRef.close()
        this.toastr.success("Member Added Successfully")
      },
      error:()=>{
        this.loading = false
        this.dialogRef.close()
        this.toastr.error("Error Occured")
      }
    })
  }
  handleCloseDialog(){
    this.dialogRef.close()
  }

}

