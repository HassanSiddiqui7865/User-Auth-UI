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
  displayedColumns: string[] = ['ProjectName','Category','Members','Created At','Created By','Actions'];
  baseURL = environment.BASEURL
  data = [
    {
        projectname: "React Project",
        category: "Web App",
        createdDate: Date.now(),
        createdBy: "John Doe",
    },
    {
        projectname: "Angular Project",
        category: "Web App",
        createdDate: Date.now(),
        createdBy: "Jane Smith",
    },
    {
        projectname: "Vue Project",
        category: "Web App",
        createdDate: Date.now(),
        createdBy: "Alice Johnson",
    },
    {
        projectname: "Node.js Project",
        category: "Backend",
        createdDate: Date.now(),
        createdBy: "Bob Williams",
    },
    {
        projectname: "Python Project",
        category: "Scripting",
        createdDate: Date.now(),
        createdBy: "Charlie Brown",
    },
    {
        projectname: "Java Project",
        category: "Desktop App",
        createdDate: Date.now(),
        createdBy: "David Miller",
    },
    {
        projectname: "C# Project",
        category: "Desktop App",
        createdDate: Date.now(),
        createdBy: "Eva Martinez",
    },
    {
        projectname: "Ruby Project",
        category: "Scripting",
        createdDate: Date.now(),
        createdBy: "Frank Davis",
    },
    {
        projectname: "PHP Project",
        category: "Web App",
        createdDate: Date.now(),
        createdBy: "Grace Wilson",
    },
    {
        projectname: "HTML/CSS Project",
        category: "Web Design",
        createdDate: Date.now(),
        createdBy: "Henry Lee",
    },
    {
        projectname: "Django Project",
        category: "Web App",
        createdDate: Date.now(),
        createdBy: "Isabella Scott",
    },
    {
        projectname: "Spring Boot Project",
        category: "Backend",
        createdDate: Date.now(),
        createdBy: "Jack Robinson",
    },
    {
        projectname: "Express.js Project",
        category: "Backend",
        createdDate: Date.now(),
        createdBy: "Katherine Stewart",
    },
    {
        projectname: "MongoDB Project",
        category: "Database",
        createdDate: Date.now(),
        createdBy: "Liam Carter",
    },
    {
        projectname: "SQL Project",
        category: "Database",
        createdDate: Date.now(),
        createdBy: "Mia Perez",
    },
    {
        projectname: "React Native Project",
        category: "Mobile App",
        createdDate: Date.now(),
        createdBy: "Noah Turner",
    },
    {
        projectname: "Flutter Project",
        category: "Mobile App",
        createdDate: Date.now(),
        createdBy: "Olivia Garcia",
    },
    {
        projectname: "Swift Project",
        category: "Mobile App",
        createdDate: Date.now(),
        createdBy: "Peter Evans",
    },
    {
        projectname: "Kotlin Project",
        category: "Mobile App",
        createdDate: Date.now(),
        createdBy: "Quinn Hughes",
    },
    {
        projectname: "Xamarin Project",
        category: "Mobile App",
        createdDate: Date.now(),
        createdBy: "Rachel Cook",
    },
    {
        projectname: "Unity Project",
        category: "Game Development",
        createdDate: Date.now(),
        createdBy: "Samuel Morris",
    }
];

  
  constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    // this.getProjects()
  }
  ngOnDestroy(): void {
    this.projectsubscriptions.unsubscribe()
  }
  getProjects() {
    const subscribe = this.projectService.getProjects().
      subscribe({
        next: (res) => {
          this.ProjectList = res
        },
        error: (err) => {
          console.log(err)
        }
      })
      this.projectsubscriptions.add(subscribe)
  }
  openDeleteDialog(id: any) {
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '350px',
      data: {
        projectId: id,
        loadProject: this.getProjects.bind(this)
      }
    })
  }
  openEditDialog(id: any) {
    this.dialog.open(UpdateProjectComponent, {
      height: '100vh',
      width: '600px',
      position:{"right":"0px","top":"0px"},
      data: {
        projectId: id,
        loadProject: this.getProjects.bind(this),
      }
    })
  }
  openMemberDialog() {
    this.dialog.open(ShowMembersComponent, {
      height: '50vh',
      width: '500px',
    })
  }

}
