import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/Users/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment/environment';
import { UserLogin } from 'src/Auth';

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
  ManagerId:any
  userLoggedIn = UserLogin()
 constructor(private projectService : ProjectService,private route : ActivatedRoute,
  private userService : UserService,private toastr : ToastrService,private router : Router){
  this.AdminId = environment.admin
  this.ManagerId = environment.MId
  this.id = this.router.url.split("/")[2]
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
      }
    }
  })
 }
 getAllUsers(){
  this.userService.getUserByProject(this.id).subscribe({
    next:(res)=>{
      this.userList = res
    }
  })
}
handleUpdateProject(){
  this.loading =true
  this.projectService.updateProject(this.project.projectId,this.UpdateProjectForm.value).subscribe({
    next:(res)=>{
      if(this.currentLead){
        this.projectService.ChangeLeadIfLead(this.id,this.currentLead.userId,this.selectedLead.userId).subscribe()
      }
      if(!this.currentLead){
        this.projectService.ChangeLeadIfNoLead(this.id,this.selectedLead.userId).subscribe()
      }
      this.loading = false
      this.router.navigate(['/projects']).then(()=>{
        window.location.reload()
      })
      this.toastr.success("Updated Successfully")
    },
    error:()=>{
      this.loading = false
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
CheckIfAssigned(){
  const user = this.userList.find((item)=>item.userId === this.userLoggedIn.userId)
  if((this.userLoggedIn.roleId === this.ManagerId ) && user){
    return false
  }
  if(this.userLoggedIn.roleId === this.AdminId){
    return false
  }
  return true
}
// CheckLead(element){
//   this.userList.find((item)=>)
// }
}
