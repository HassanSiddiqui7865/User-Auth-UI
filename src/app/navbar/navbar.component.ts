import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/Login/login.service';
import { UserLogin } from 'src/Auth';
import { environment } from 'src/environment/environment';
import { ProjectService } from '../Services/Project/project.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login:string;
  LoggedInUser:any
  projectList:any
  AdminId = environment.admin
  constructor(private loginService : LoginService,private projectService : ProjectService) {
    
  }

  ngOnInit(): void {
    this.LoggedInUser = UserLogin()
    const profileDiv = document.getElementById('output')
    profileDiv.style.backgroundColor = '#ecb731'
    profileDiv.innerText = this.LoggedInUser.username.slice(0,1)
    this.getAllProjects()
  }

  onHandleLogout(){
    this.loginService.logout()
  }
  getAllProjects(){
    this.projectService.getAssignedProjects(this.LoggedInUser.userId).subscribe({
      next:(res)=>{
        this.projectList = res
        localStorage.setItem("Project",JSON.stringify(res))
      }
    })
  }
}
