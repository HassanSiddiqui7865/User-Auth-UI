import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/Services/Project/project.service';
import { TicketService } from 'src/app/Services/Ticket/ticket.service';
import { UserService } from 'src/app/Services/Users/user.service';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.css'],
})
export class DeleteComponentComponent {
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<DeleteComponentComponent>,
    private toastr: ToastrService,
    private userService: UserService,
    private ticketService : TicketService
  ) {}
  handleDelete() {
    if (this.data.type === 'project') {
      this.loading = true;
      this.projectService.DeleteProject(this.data.projectId).subscribe({
        next: () => {
          this.data.loadProject();
          this.loading = false;
          this.dialogRef.close();
          this.toastr.success('', 'Project Deleted Successfully', {
            timeOut: 2000,
          });
        },
        error: () => {
          this.loading = false;
          this.dialogRef.close();
        },
      });
    }
    else if (this.data.type === 'users') {
      this.loading = true;
      this.userService.DeleteUser(this.data.userId).subscribe({
        next: () => {
          this.data.LoadUsers();
          this.loading = false;
          this.dialogRef.close();
          this.toastr.success('', 'User Deleted Successfully', {
            timeOut: 2000,
          });
        },
        error: () => {
          this.loading = false;
          this.dialogRef.close();
        },
      });
    }
    else if ((this.data.type === 'assignedusers')) {
      this.loading = true;
      this.projectService
        .DeleteAssignedUser(this.data.projectId, this.data.userId)
        .subscribe({
          next: (res) => {
            this.data.LoadUsers();
            this.loading = false;
            this.dialogRef.close();
            this.toastr.success('', 'Removed Successfully', {
              timeOut: 1500,
            });
          },
          error: () => {
            this.loading = false;
            this.dialogRef.close();
          },
        });
    }
    else if ((this.data.type === 'ticket')) {
      this.loading = true;
      this.ticketService
        .deleteTicket(this.data.ticketId)
        .subscribe({
          next: (res) => {
            this.data.Loadticket()
            this.data.handleClose();
            this.loading = false;
            this.dialogRef.close();
            this.toastr.success('', 'Removed Successfully', {
              timeOut: 1500,
            });
          },
          error: () => {
            this.loading = false;
            this.dialogRef.close();
          },
        });
    }
  }
}
