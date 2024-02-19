import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/Auth';
import { ProjectService } from 'src/app/Services/Project/project.service';
import { TicketService } from 'src/app/Services/Ticket/ticket.service';
import { environment } from 'src/environment/environment';
import { DeleteComponentComponent } from '../delete-component/delete-component.component';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css'],
})
export class ViewTicketComponent implements OnInit {
  loading: boolean = false;
  ticket: any;
  selectedUser: any;
  userList: any[];
  filteredArray: any[] = [];
  update: boolean = false;
  ResultDialog:boolean = false
  LoggedInUser = UserLogin();
  AdminId = environment.admin;
  MatchFound:boolean = false
  blur:boolean = false
  itemSelected:boolean = false
  UpdateTicketForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private projectService: ProjectService,
    private dialogref: MatDialogRef<ViewTicketComponent>,
    private ticketService: TicketService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.UpdateTicketForm = new FormGroup({
      ticketsummary: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      ticketdescription: new FormControl(null),
      assignedto: new FormControl(null),
    });
    this.getTicket();
  }

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
  getIconInfo(array: any[], name: string) {
    return array.find((items) => items.name === name);
  }
  handleChange(event: any) {
    console.log(this.selectedUser)
    console.log(event.target.value)
    const filteredUser = this.userList?.filter((item) =>
      item.fullname.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    if (event.target.value === '') {
     
      this.filteredArray = this.userList;
      this.selectedUser = null;
      this.MatchFound = false
    } else {
      if (filteredUser.length === 0) {
       this.MatchFound = true
      }
      else{
        this.MatchFound = false
      }
      this.filteredArray = filteredUser;
    }
  }
  getProject(projectId: any) {
    this.projectService.GetProjectById(projectId).subscribe({
      next: (res) => {
        this.userList   = res.users;
      },
    });
  }
  getTicket() {
    this.ticketService.getTicketById(this.data.ticketId).subscribe({
      next: (res) => {
        this.ticket = res;
        this.getProject(res.projectId.projectId);
        this.UpdateTicketForm.patchValue({
          ticketsummary: res.ticketsummary,
          priority: res.ticketpriority,
          type: res.tickettype,
          ticketdescription: res.ticketdescription,
        });
        this.selectedUser = res.assignedTo;
      },
    });
  }
  handleUpdateTicket() {
    this.loading = true;
    this.ticketService
      .updateTicket(this.ticket.ticketId, this.UpdateTicketForm.value)
      .subscribe({
        next: (res) => {
          this.getTicket();
          this.data.Loadticket();
          this.loading = false;
          this.toastr.success('Ticket Updated Successfully');
          this.update = false;
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error('Error Occured');
          this.update = false;
        },
      });
  }
  handleSelectUser(item: any) {
    this.selectedUser = item;
    this.UpdateTicketForm.patchValue({
      assignedto: item.userId,
    });
    this.blur = true
  }
  handleOpenDelete() {
    this.dialog.open(DeleteComponentComponent, {
      height: 'max-content',
      width: '350px',
      data: {
        type: 'ticket',
        ticketId: this.ticket.ticketId,
        Loadticket: this.data.Loadticket.bind(this),
        handleClose: this.handleCloseDialog.bind(this),
      },
    });
  }
  handleFocus(){
    this.blur = false
  }
  handleOpenUpdate() {
    this.update = true;
  }
  handleCloseUpdate() {
    this.update = false;
  }
  handleCloseDialog() {
    this.dialogref.close();
  }
}