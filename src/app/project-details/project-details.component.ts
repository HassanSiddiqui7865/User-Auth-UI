import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/Project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/Users/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment/environment';
import { UserLogin } from 'src/Auth';
import { MatDialog } from '@angular/material/dialog';
import { AvatarSelectComponent } from '../Components/avatar-select/avatar-select.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  UpdateProjectForm: FormGroup;
  projectId: any;
  project: any;
  loading: boolean = false;
  userList: any[];
  filteredArray: any[];
  selectedLead = null;
  currentLead = null;
  AdminId: any;
  ManagerId: any;
  avatarselected:string;
  userLoggedIn = UserLogin();
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private dialog : MatDialog
  ) {
    this.AdminId = environment.admin;
    this.ManagerId = environment.MId;
    this.projectId = this.router.url.split('/')[2];
  }
  ngOnInit(): void {
    this.UpdateProjectForm = new FormGroup({
      projectname: new FormControl(null, Validators.required),
      projectkey:new FormControl(null,[Validators.required]),
      projectdescription: new FormControl(null, [Validators.required]),
    });
    this.getProject();
  }
  getProject() {
    this.projectService.GetProjectById(this.projectId).subscribe({
      next: (res) => {
        this.project = res;
        this.UpdateProjectForm.patchValue({
          projectname: res.projectname,
          projectkey:res.projectkey,
          projectdescription: res.projectdescription,
        });
        if (this.project) {
          this.selectedLead = this.currentLead = this.project.users.find(
            (items) => items.isLead
          );
          this.avatarselected = res.avatarUrl
        }
        this.userList = res.users;
      },
    });
  }
  handleUpdateProject() {
    if (!this.AccessToUpdate()) {
      this.loading = true;
      this.projectService
        .updateProject(this.project.projectId,this.UpdateProjectForm.value,this.avatarselected)
        .subscribe({
          next: (res) => {
            if (this.currentLead) {
              this.projectService
                .ChangeLeadIfLead(
                  this.projectId,
                  this.currentLead.userId,
                  this.selectedLead.userId
                )
                .subscribe();
            }
            if (!this.currentLead) {
              this.projectService
                .ChangeLeadIfNoLead(this.projectId, this.selectedLead.userId)
                .subscribe();
            }
            this.loading = false;
            this.toastr.success('Updated Successfully');
            this.router.navigate(['/projects']).then(() => {
              window.location.reload();
            });
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }
  handleChange(event) {
    const filteredUser = this.userList.filter((item) => {
      return item.fullname
        .toLowerCase()
        .startsWith(event.target.value.toLowerCase());
    });
    this.filteredArray = event.target.value === '' ? null : filteredUser;
    if (event.target.value === '') {
      this.filteredArray = null;
      this.selectedLead = null;
    } else {
      this.filteredArray;
    }
  }
  SetLead(user) {
    this.selectedLead = user;
    this.filteredArray = null;
  }
  AccessToUpdate() {
    const user = this.userList?.find(
      (item) => item.userId === this.userLoggedIn.userId
    );
    if (this.userLoggedIn.roleId === this.ManagerId && user) {
      return false;
    } else if (this.userLoggedIn.roleId === this.AdminId) {
      return false;
    }
    return true;
  }
  openAvatarDialog(){
    const dialogRefAvatar = this.dialog.open(AvatarSelectComponent, {
      width: "500px",
      maxHeight: "400px",
      data: {
        avatarUrl: this.avatarselected
      }
    });
  
    
    dialogRefAvatar.afterClosed().subscribe((selectedAvatar: string) => {
      if (selectedAvatar) {
        this.avatarselected = selectedAvatar;
      }
    });
  }
}
