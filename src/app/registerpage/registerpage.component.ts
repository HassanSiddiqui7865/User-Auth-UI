import {Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '../Services/Register/register.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit{
  error:any;
  registerForm : FormGroup
  loading:boolean = false;
  constructor(private registerService : RegisterService) {
  }


  ngOnInit(){
    this.registerForm = new FormGroup({
      username : new FormControl(null,Validators.required),
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)])
    })

    this.registerService.getApiResponseObservable().
    subscribe((res) => {
      this.loading = false;
    },(err)=>{
      this.loading = false;
      this.error = err
    });
  }

  OnhandleSubmit(){
    this.loading = true; 
   this.registerService.RegisterUser(this.registerForm.value)
  }
}
