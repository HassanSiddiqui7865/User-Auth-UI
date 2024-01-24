import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/Login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit{
  error:any;
  loading: boolean;
  loginForm : FormGroup
  constructor(private loginService : LoginService,private router : Router) {
  }

  
  ngOnInit(){
    this.loginForm = new FormGroup({
      username : new FormControl(null,Validators.required),
      password : new FormControl(null,[Validators.required])
    })
    
    

    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/board']);
    }
  }

  LoginUser(){
    this.loading = true
    this.loginService.LoginUser(this.loginForm.value).
    subscribe((res)=>{
      this.loading = false
      localStorage.setItem('login',JSON.stringify(res))
      this.router.navigate(['/board'])
    },(err)=>{
      this.loading = false
      this.error = err
    })
  }
}
