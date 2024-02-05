import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponentComponent } from '../Components/delete-component/delete-component.component';
import { UpdateProjectComponent } from '../Components/update-project/update-project.component';
import { Subscription } from 'rxjs';
import { ShowMembersComponent } from '../Components/show-members/show-members.component';
import { UserLogin } from 'src/Auth';
import { CreateProjectComponent } from '../create-project/create-project.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit,OnDestroy {
  ProjectList: any[]
  ProjectId: any;
  projectData: any
  CreateProjectForm: FormGroup
  UpdateProjectForm: FormGroup
  loading: boolean = false
  projectsubscriptions: Subscription = new Subscription()
  displayedColumns: string[] = ['ProjectName','Key','Lead','Created At','Actions'];
  Credentials = UserLogin()
  AssignedProjects:any[]
  AdminId = environment.admin 
  ProjectManagerId = environment.PMId
  constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getProjects()
  }
  ngOnDestroy(): void {
    this.projectsubscriptions.unsubscribe()
  }
  getProjects() {
    const subscribe = this.projectService.getProjects().
      subscribe({
        next: (res) => {
          this.ProjectList = res
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
      this.projectsubscriptions.add(subscribe)
  }
  getProjectLead(item){
    const lead = item.find((user) => user.isLead);
    return lead;
}
  openDeleteDialog(id: any) {
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '350px',
      data: {
        type:"project",
        projectId: id,
        loadProject: this.getProjects.bind(this)
      }
    })
  }
  OpenCreateProjectDialog(){
    this.dialog.open(CreateProjectComponent, {
      height: '100vh',
      width: '600px',
      position:{"right":"0px","top":"0px"},
      data:{
        LoadProjects:this.getProjects.bind(this)
      }
    })
  }
  
}
