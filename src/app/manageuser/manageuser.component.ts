import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/Users/user.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  OpenModel = false
  userId:any;
  userList:any;
  pipe = new DatePipe('en-US')
  loading:boolean = false
  error:any
  LibrarianForm : FormGroup
  constructor(private userService : UserService,private toastr : ToastrService) {
  }

  ngOnInit(): void {
    this.GetUserList()
    this.LibrarianForm = new FormGroup({
      username : new FormControl(null,Validators.required),
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }

  GetUserList(){
    this.userService.getUser().subscribe(
      (res:any[]) => {
       this.userList =  res.filter((items)=>items.userrole !== "admin")
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleOpen(){
    this.OpenModel = this.OpenModel === true ? false : true
  }
  getDate(date:any){
    const myFormattedDate = this.pipe.transform(date, 'short');
    return myFormattedDate
  }

  OpenDeleteModel(id:any){
    this.userId = id
    const modelDiv = document.getElementById('myModal')
    if(modelDiv!=null){
      modelDiv.style.display = 'block'
    }
  }
  CloseDeleteModel(){
    const modelDiv = document.getElementById('myModal')
    if(modelDiv!=null){
      modelDiv.style.display = 'none'
    }
  }
  handleDelete(){
    this.loading = true
    this.userService.DeleteUser(this.userId).
    subscribe((res)=>{
      this.GetUserList()
      this.loading = false
      this.CloseDeleteModel()
      this.toastr.success('Deleted Successfully');
    },(err)=>{
      this.loading = false
      this.CloseDeleteModel()
      this.toastr.error('An Error Occured');
    })
  }
}
