import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { ProjectService } from 'src/app/Services/Project/project.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements AfterViewInit {
  @Input() data: string; 
  @ViewChild('drawerContainer') drawerContainer: MatDrawerContainer;
  project: any;
  comp:boolean=true;

  constructor(private dialog: MatDialog,private projectService : ProjectService) {}

  ngAfterViewInit(): void {
    this.openDrawer();
  }

  openDrawer() {
    this.comp = false
    setTimeout(() => {
      if (this.drawerContainer) {
        this.drawerContainer.open();
      } else {
        console.error("Drawer container is not available.");
      }
    }, 0);
  }
  closeDrawer(){
    this.drawerContainer.close()
    this.comp = true
  }
  getProject(){
    this.projectService.getProjectWithoutusers().subscribe({
      
    })
  }
}
