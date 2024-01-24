import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../Components/create-project/create-project.component';
import { DeleteComponentComponent } from '../Components/delete-component/delete-component.component';
import { UpdateProjectComponent } from '../Components/update-project/update-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  ProjectList: any[]
  ProjectId: any;
  projectData: any
  CreateProjectForm: FormGroup
  UpdateProjectForm: FormGroup
  loading: boolean = false

  baseURL = environment.BASEURL
  constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getProjects()
  }
 
  getProjects() {
    this.projectService.getProjects().
    subscribe({
      next:(res)=>{
        this.ProjectList = res
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  
  openCreateDialog() {
    this.dialog.open(CreateProjectComponent, {
      height: 'max-content',
      width: '600px',
      data:{
        loadProject: this.getProjects.bind(this)
      }
    })
  }
  openDeleteDialog(id:any) {
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '300px',
      data:{
        projectId:id,
        loadProject: this.getProjects.bind(this)
      }
    })
  }
  openEditDialog(id:any) {
    this.dialog.open(UpdateProjectComponent, {
      height: 'max-content',
      width: '600px',
      data:{
        projectId:id,
        loadProject: this.getProjects.bind(this)
      }
    })
  }
  handleShowUsers(i){
    const menu = document.getElementById(`usersListMenu${i}`)
    if(menu!==null){
      menu.style.display = 'block'
    }
  }
  
}
