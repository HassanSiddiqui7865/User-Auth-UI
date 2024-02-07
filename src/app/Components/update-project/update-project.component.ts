import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/Services/Project/project.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { DeleteComponentComponent } from '../delete-component/delete-component.component';
import { UserLogin } from 'src/Auth';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit{
  UpdateProjectForm : FormGroup
  loading : boolean = false
  projectFormData:any;
  filteredArray:any[];
  userinput:any;
  usersList:any[];
  AddedMember:any[];
  UserLoggedIn=UserLogin()
  AdminId = environment.admin
  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  private projectService : ProjectService,public dialogRef: MatDialogRef<UpdateProjectComponent>,
  private toastr : ToastrService,private userService : UserService,private dialog : MatDialog){}
  ngOnInit(): void {
    this.UpdateProjectForm = new FormGroup({
      projectname: new FormControl(null, Validators.required),
      projectdescription: new FormControl(null, [Validators.required]),
    })
    this.getProjectDetail()
    this.getUsers()
  }
  getProjectDetail(){
    this.projectService.GetProjectById(this.data.projectId).subscribe({
      next:(res)=>{
        this.AddedMember = res.users
        this.UpdateProjectForm.patchValue({
          projectname: res.projectname,
          projectdescription: res.projectdescription
        });
        
      }
    })
  }
  getUsers(){
    this.userService.getUsersWithoutProjects().subscribe({
      next:(res)=>{
        this.usersList = res.filter((user) => user.roleId !== this.AdminId);
        this.filteredArray = this.usersList;
      }
    })
  }
  handleChange(e){
    const filteredUser = this.usersList.filter((item) => {
        return item.fullname.toLowerCase().startsWith(e.target.value.toLowerCase());
    });
    
    this.filteredArray= e.target.value === "" ? this.usersList: filteredUser;
  }
  handleUpdateProject(){
    this.loading =true
    this.projectService.updateProject(this.data.projectId,this.UpdateProjectForm.value).subscribe({
      next:(res)=>{
        this.loading = false
        this.data.loadProject()
        this.dialogRef.close()
        this.toastr.success("Project Updated Successfully")
      },
      error:()=>{
        this.loading = false
        this.dialogRef.close()
      }
    })
  }
  openDeleteDialog(id:any){
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '350px',
      data:{
        projectId:this.data.projectId,
        userId:id,
        LoadUsers:this.getProjectDetail.bind(this), 
        type:"assignedusers"
      }
  })
}
}
