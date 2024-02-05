import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../Services/Project/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../Services/Users/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],

})
export class CreateProjectComponent implements OnInit {
  PmList:any[]
  loading:boolean = false
  CreateProjectForm:FormGroup
  userList:any[]
  filteredArray:any[]
  selectedLead = null
  AdminId:any;
  constructor(private projectService : ProjectService,private toastr : ToastrService,
    private userService : UserService,private dialogRef: MatDialogRef<CreateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    ){
      this.AdminId = environment.admin
    }
  ngOnInit(): void {
    this.CreateProjectForm = new FormGroup({
      projectname: new FormControl(null, Validators.required),
      projectdescription: new FormControl(null, [Validators.required]),
    })
    this.getAllUsers()
  }
  getAllUsers(){
    this.userService.getUsersWithoutProjects().subscribe({
      next:(res)=>{
        this.userList = res.filter((items)=>items.roleId !== this.AdminId)
      }
    })
  }
  handleChange(event){
    const filteredUser = this.userList.filter((item) => {
      return item.fullname.toLowerCase().startsWith(event.target.value.toLowerCase());
  });
    this.filteredArray= event.target.value === "" ? null: filteredUser;
    if(event.target.value===""){
      this.filteredArray = null
      this.selectedLead = null
    }
    else{
      this.filteredArray
    }
  }
  SetLead(user){
    this.selectedLead = user
    this.filteredArray =null
  }
  handleSubmitProject(){
    this.loading = true
    this.projectService.createProject(this.CreateProjectForm.value).subscribe({
      next:(res)=>{
        this.AssignedProjectLead(res.projectId)
        this.dialogRef.close()
        this.toastr.success('Project Created Successfully')
      },
      error:()=>{
        this.loading = false
        this.dialogRef.close()
        this.toastr.error("Error Occured")
      }
    })
  }
  AssignedProjectLead(projectId){
    this.projectService.AssignedUser(this.selectedLead.userId,projectId,true).subscribe({
      next:(res)=>{
        this.loading = false
        this.data.LoadProjects()
        console.log(res)
      }
    })
  }
}

