import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TicketService } from '../Services/Ticket/ticket.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewTicketComponent } from '../Components/view-ticket/view-ticket.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  projectId:any;
  backlog:any[];
  done:any[]
  progress:any[]
  draggedprojectId:any;
  priorityOrder = {
    'High': 3,
    'Medium': 2,
    'Low': 1
 };
  
  constructor(private ticketService : TicketService,private router : Router,private dialog : MatDialog){
    this.projectId = this.router.url.split("/")[2]
  }
 
  ngOnInit(): void {

    this.getTickets()
  }
  comparePriority(a, b) {
    return this.priorityOrder[b.ticketpriority] - this.priorityOrder[a.ticketpriority];
  }

  getTickets(){
    this.ticketService.getProjectId(this.projectId).subscribe({
      next:(res)=>{
        const backlogticket = res.filter((items)=>items.ticketstatus === 'Backlog')
        const doneticket = res.filter((items)=>items.ticketstatus === 'Done')
        const progressticket = res.filter((items)=>items.ticketstatus === 'InProgress')

        const priorityOrder = {
          'High': 3,
          'Medium': 2,
          'Low': 1
        };
  
        // Define a comparison function to sort based on priorities
        function comparePriority(a, b) {
          return priorityOrder[b.ticketpriority] - priorityOrder[a.ticketpriority];
        }
        this.backlog = backlogticket.sort(comparePriority)
        this.done = doneticket.sort(comparePriority)
        this.progress = progressticket.sort(comparePriority)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
 
  drop(event:any) {
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container.id)
      console.log(this.draggedprojectId)
      this.ticketService.updateTicketStatus(this.draggedprojectId,event.container.id).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:(err)=>{
          console.log(err)
        }
      })
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  handleGetId(id){
   this.draggedprojectId = id
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
    },
  };
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
  handleOpenTicket(item){
    this.dialog.open(ViewTicketComponent,{
      width:"90vw",
      height:"70vh",
      data:{
        ticketId:item.ticketId,
        Loadticket:this.getTickets.bind(this)
      }
    })
  }
}
