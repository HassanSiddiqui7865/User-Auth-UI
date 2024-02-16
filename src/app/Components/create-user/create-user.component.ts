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
export class CreateUserComponent implements OnInit {
  CreateUserForm : FormGroup
  roleList:any[]
  loading:boolean =false
  constructor(private userService : UserService,
    public dialogRef: MatDialogRef<CreateUserComponent>,private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data){}
  ngOnInit(): void {
    this.CreateUserForm = new FormGroup({
      fullname:new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email:new FormControl(null, Validators.required),
      pass: new FormControl(null, [Validators.required]),
      roleId: new FormControl(null, [Validators.required])
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
  handleCreateUser(){
    this.loading =true
    this.userService.createUser(this.CreateUserForm.value).subscribe({
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
