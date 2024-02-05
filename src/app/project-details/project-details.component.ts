import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/Users/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  UpdateProjectForm : FormGroup
  id:any
  project:any
  loading : boolean = false
  userList:any[]
  filteredArray:any[]
  selectedLead = null
  currentLead = null
  AdminId:any;
 constructor(private projectService : ProjectService,private route : ActivatedRoute,
  private userService : UserService,private toastr : ToastrService,private router : Router){
  this.AdminId = environment.admin
  this.route.paramMap.subscribe(params => {
    this.id = params.get('id')
  });
 }
 ngOnInit(): void {
  this.UpdateProjectForm = new FormGroup({
    projectname: new FormControl(null, Validators.required),
    projectdescription: new FormControl(null, [Validators.required]),
  })
   this.getProject()
   this.getAllUsers()
 }
 getProject(){
  this.projectService.getProject(this.id).subscribe({
    next:(res)=>{
      this.project = res
      this.UpdateProjectForm.patchValue({
        projectname: res.projectname,
        projectdescription: res.projectdescription
      });
      if (this.project) {
        this.selectedLead = this.currentLead = this.project.users.find((items) => items.isLead);
        console.log(this.selectedLead,this.currentLead)
      }
    }
  })
 }
 getAllUsers(){
  this.userService.getUsersWithoutProjects().subscribe({
    next:(res)=>{
      this.userList = res.filter((items)=>items.roleId !== this.AdminId)
    }
  })
}
handleUpdateProject(){
  this.loading =true
  this.projectService.updateProject(this.project.projectId,this.UpdateProjectForm.value).subscribe({
    next:(res)=>{
      this.DeleteAssignedLead(this.project.projectId)
      this.AssignedProjectLead(this.project.projectId)
      this.loading = false
      this.router.navigate(['/projects'])
      this.toastr.success("Updated Successfully")
    },
    error:()=>{
      this.loading = false
    }
  })
}
AssignedProjectLead(projectId){
  this.projectService.AssignedUser(this.selectedLead.userId,projectId,true).subscribe()
}
DeleteAssignedLead(projectId){
  this.projectService.DeleteAssignedUser(projectId,this.currentLead.userId).subscribe()
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
}
