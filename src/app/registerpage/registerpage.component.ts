import {Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '../Services/Register/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit{
  error:any;
  registerForm : FormGroup
  loading:boolean = false;
  constructor(private registerService : RegisterService,private router : Router,private toastr : ToastrService) {
  }


  ngOnInit(){
    this.registerForm = new FormGroup({
      username : new FormControl(null,Validators.required),
      fullname:new FormControl(null,[Validators.required]),
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
    
    
  }
  OnhandleRegister(){
  console.log(this.registerForm.value);
  this.loading = true
  this.registerService.RegisterUser(this.registerForm.value).subscribe({
    next:(res)=>{
      this.loading = false
      this.router.navigate(['/login'])
      this.toastr.success('Login to use your Account','Account Created Successfully', {
        timeOut: 3000,
      });
      
    },
    error:(err)=>{
      this.loading = false
      this.error = err
      console.log(err)
    }
  })
}
}
