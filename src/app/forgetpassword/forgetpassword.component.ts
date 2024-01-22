import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/Login/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgetPassForm : FormGroup
  loading:boolean = false
  error:any
  constructor(private loginService : LoginService,private toastr : ToastrService,private router : Router) {
    
  }

  ngOnInit(): void {
    this.forgetPassForm = new FormGroup({
      username : new FormControl(null,Validators.required),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }
  handleForgetPassword(){
    this.loading = true
    this.loginService.getUserbyUsername(this.forgetPassForm.value).
    subscribe((res)=>{
      this.loading = false
      this.router.navigate(['login'])
      this.toastr.success("Password Updated Successfully")

    },(err)=>{
      this.loading  = false
      this.error = err
    })
  }
}
