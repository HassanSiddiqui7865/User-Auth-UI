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
  loading:boolean =false
  userList:any[]
  filteredArray:any[]
  selectedUser :any= null
  AdminId:any;
  inputValue:any
  MatchNotFound:boolean = false
  searchControl = new FormControl();
  constructor(private userService : UserService,private projectService : ProjectService,
     public dialogRef: MatDialogRef<AssignUserComponent>,private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data){
      this.AdminId = environment.admin
    }
  ngOnInit(): void {
    this.getAllUsers()
    this.searchControl.valueChanges.subscribe(() => {
      this.handleChange();
    });
  }
  getAllUsers(){
    this.userService.getUsersWithoutProjects().subscribe({
      next:(res)=>{
        this.userList = this.filteredArray= res.filter((items)=>items.roleId !== this.AdminId)
      }
    })
  }
  handleChange() {
    this.inputValue = this.searchControl.value.toLowerCase();
    const filteredUser = this.userList?.filter((item) =>
        item.fullname.toLowerCase().startsWith(this.inputValue)
    );
    
    if (this.inputValue === '') {
        this.filteredArray = this.userList;
    } else if (filteredUser.length > 0) {
        this.filteredArray = filteredUser;
    } else {
        this.filteredArray = [];
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

