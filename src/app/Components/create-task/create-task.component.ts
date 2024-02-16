import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/Auth';
import { ProjectService } from 'src/app/Services/Project/project.service';
import { TicketService } from 'src/app/Services/Ticket/ticket.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  LoggedInUser = UserLogin(); 
  MemberId: string = environment.member;
  userList: any[] = [];
  ProjectList: any[] = [];
  filteredArray: any[] = []; 
  MatchNotFound:boolean = false
  inputValue:string;
  priorityElementArray: any[] = [
    {
      icon: 'keyboard_double_arrow_up',
      name: 'High',
      color: 'text-success',
    },
    {
      icon: 'density_medium',
      name: 'Medium',
      color: 'text-warning',
    },
    {
      icon: 'keyboard_double_arrow_down',
      name: 'Low',
      color: 'text-danger',
    },
  ];
  tickettypeArray: any = [
    {
      icon: 'task_alt',
      name: 'Task',
      color: 'text-primary',
    },
    {
      icon: 'bug_report',
      name: 'Bug',
      color: 'text-danger',
    },
  ];
  selectedProject: any;
  selectedUser: any = null;
  CreateTicketForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private projectService: ProjectService,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.CreateTicketForm = new FormGroup({
      ticketsummary: new FormControl(null, Validators.required),
      projectId: new FormControl(null, Validators.required),
      priority: new FormControl(
        'Medium',
        Validators.required
      ),
      type: new FormControl('Task', Validators.required),
      ticketdescription: new FormControl(null, Validators.required),
      status: new FormControl('Backlog', Validators.required),
      assignedto: new FormControl(null, Validators.required),
      reportedby: new FormControl(
        this.LoggedInUser.userId,
        Validators.required
      ),
    });
    if (this.LoggedInUser.roleId === this.MemberId) {
      this.getProjectsforMember();
    } else {
      this.getProjects();
    }
  }

  handleSelectProject(item: any) {
    this.selectedProject = item;
    this.userList = this.selectedProject.users;
    this.CreateTicketForm.patchValue({
      projectId: item.projectId,
    });
  }

  handleSelectUser(item: any) {
    this.selectedUser = item;
    if(item){
      this.CreateTicketForm.patchValue({
        assignedto: item.userId,
      });
    }else{
      this.CreateTicketForm.patchValue({
        assignedto: null,
      });
    }
    
  }
  
  getIconInfo(array: any[], name: string) {
    return array.find((items) => items.name === name);
  }
  handleCreateTicket() {
    this.ticketService.createticket(this.CreateTicketForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close();
        this.toastr.success('Ticket Created Successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleChange(event: any) {
    this.inputValue = event.target.value.toLowerCase();
    const filteredUser = this.userList?.filter((item) =>
        item.fullname.toLowerCase().startsWith(this.inputValue)
    );
    
    if (this.inputValue === '') {
        this.filteredArray = this.userList;
        this.MatchNotFound = false
        this.selectedUser = null;
    } else if (filteredUser.length > 0) {
        this.filteredArray = filteredUser;
        this.MatchNotFound = false
    } else {
        this.filteredArray = [];
        this.MatchNotFound = true
    }
}

  handleFocus() {
  if(this.inputValue === '' || !this.inputValue)
    this.filteredArray = this.userList;
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

  handleDialogClose() {
    this.dialogRef.close();
  }
}
