import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponentComponent } from '../Components/delete-component/delete-component.component';
import { UserLogin } from 'src/Auth';
import { CreateProjectComponent } from '../create-project/create-project.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  ProjectList: any[];
  ProjectId: any;
  projectData: any;
  loading: boolean = false;
  displayedColumns: string[] = [
    'ProjectName',
    'Key',
    'Lead',
    'Created At',
    'Actions',
  ];
  LoggedInUser = UserLogin();
  AssignedProjects: any[];
  AdminId = environment.admin;
  ManagerId = environment.MId;
  MemberId = environment.member;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog,
    
  ) {}
  ngOnInit(): void {
    if (this.LoggedInUser.roleId === this.MemberId) {
      this.getProjectsforMember();
    } else {
      this.getProjects();
    }
  }
  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.ProjectList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getProjectsforMember() {
    this.projectService
      .getAssignedProjects(this.LoggedInUser.userId)
      .subscribe({
        next: (res) => {
          this.ProjectList = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getProjectLead(item) {
    const lead = item.find((user) => user.isLead);
    return lead;
  }
  openDeleteDialog(id: any) {
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '350px',
      data: {
        type: 'project',
        projectId: id,
        loadProject: this.getProjects.bind(this),
      },
    });
  }
  OpenCreateProjectDialog() {
    this.dialog.open(CreateProjectComponent, {
      height: '100vh',
      width: '600px',
      position: { right: '0px', top: '0px' },
      data: {
        LoadProjects: this.getProjects.bind(this),
      },
    });
  }
  AccessToProject(element): boolean {
    if (this.LoggedInUser.roleId === this.AdminId) {
      return true;
    } else if (this.LoggedInUser.roleId === this.ManagerId) {
      return true;
    } else if (
      this.LoggedInUser.userId === this.getProjectLead(element.users).userId
    ) {
      return true;
    }
    return false;
  }
  RedirectBasedOnRoles(element: any): void {
    if (
      this.LoggedInUser.userId === this.getProjectLead(element.users)?.userId
    ) {
      this.router.navigate(['projects', element.projectId, 'people']);
    } else {
      this.router.navigate(['projects', element.projectId, 'details']);
    }
  }

}
