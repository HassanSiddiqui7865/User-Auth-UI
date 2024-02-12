import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent {
  ticket:any
  constructor(@Inject(MAT_DIALOG_DATA) private data,){
    this.ticket = data.ticketdata
  }
   typeIcons = {
    Task: {
      icon: 'task_alt',
      name: 'Task',
      color: 'text-primary',
    },
    Bug: {
      icon: 'bug_report',
      name: 'Bug',
      color: 'text-danger',
    }
  }
  priorityicon = {
    High: {
      icon: 'keyboard_double_arrow_up',
      name: 'High',
      color: 'text-success',
    },
    Medium:{
      icon: 'density_medium',
      name: 'Medium',
      color: 'text-warning',
    },
    Low:{
      icon: 'keyboard_double_arrow_down',
      name: 'Low',
      color: 'text-danger',
    },
  }
}
