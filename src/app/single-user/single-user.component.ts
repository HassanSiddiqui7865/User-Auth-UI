import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { UserService } from '../Services/Users/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/Auth';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  selectedRoleId:any;
  userId :any
  user:any
  AdminId = environment.admin
  ManagerId = environment.MId
  MemberId = environment.member
  LoggedInUser = UserLogin()
  constructor(private router : Router,private userService : UserService,private toastr : ToastrService){
    this.userId = this.router.url.split('/')[2]
  }
ngOnInit(): void {
  this.getUser()
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
  getUser(){
    this.userService.getUserById(this.userId).subscribe({
      next:(res)=>{
        this.user = res
        this.selectedRoleId = res.roleId
      }
    })
  }
  RoleChanged(){
    if(this.selectedRoleId === this.user.roleId){
      return false
    }
    else{
      return true
    }
  }
  ChangeRole(){
    this.userService.updateRole(this.user.userId,this.selectedRoleId).subscribe({
      next:(res)=>{
        this.toastr.success("Role Updated Successfully")
        this.getUser()
      },
      error:(err)=>{
        this.toastr.error("An Error Occured")
      }
    })
  }
  defaultSelect(){
    this.selectedRoleId = this.user.roleId
  }
}

