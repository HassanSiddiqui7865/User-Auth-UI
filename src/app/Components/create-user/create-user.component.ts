import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/Users/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  CreateUserForm : FormGroup
  roleList:any[]
  loading:boolean =false
  OpenRoles:boolean = false;
  selectedRoleId:any;
  AdminId = environment.admin
  ManagerId = environment.MId
  MemberId = environment.member
  constructor(private userService : UserService,
    public dialogRef: MatDialogRef<CreateUserComponent>,private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data){}
  ngOnInit(): void {
    this.CreateUserForm = new FormGroup({
      fullname:new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email:new FormControl(null, Validators.required),
      pass: new FormControl(null, [Validators.required]),
    })
    this.getRole()
  }
  getRole(){
    this.userService.getRoles().subscribe({
      next:(res)=>{
        this.roleList = res.filter((items)=>items.roleId !==environment.admin)
      }
    })
  }
  getRoleName(){
    if(this.selectedRoleId === this.AdminId){
      return 'Administrator'
    }
    else if(this.selectedRoleId === this.ManagerId){
      return 'Manager'
    }
    else if (this.selectedRoleId === this.MemberId){
      return 'Member'
    }
    else{
      return null
    }
  }
  handleCreateUser(){
    this.loading =true
    this.userService.createUser(this.CreateUserForm.value,this.selectedRoleId).subscribe({
      next:(res)=>{
       this.data.LoadUsers()
       this.loading = false
       this.dialogRef.close()
       this.toastr.success("User Created Successfully")
      },
      error:()=>{
        this.loading = false
        this.toastr.error("Error Occured")
      }
    })
  }
}

