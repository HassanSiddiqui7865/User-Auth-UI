import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/Login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit, OnDestroy{
  error: any;
  loading: boolean;
  private loginSubscription: Subscription;
  loginForm: FormGroup
  constructor(private loginService: LoginService, private router: Router,private toastr : ToastrService) {
  }


  ngOnInit():void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required])
    })
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/board']);
    }
  }
  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe()
    }
  }

  LoginUser() {
    this.loading = true
   this.loginSubscription =  this.loginService.LoginUser(this.loginForm.value).
      subscribe({
        next: (res) => {
          this.loading = false
          localStorage.setItem('login', JSON.stringify(res))
          this.router.navigate(['/board'])
          this.toastr.success('','Account Login Successfully', {
            timeOut: 2000,
          });
        },
        error: (err) => {
          this.loading = false
          this.error = err
        }
      })
  }
}
