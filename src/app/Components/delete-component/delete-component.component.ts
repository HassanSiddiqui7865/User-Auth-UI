import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/Services/Project/project.service';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.css']
})
export class DeleteComponentComponent {
  loading:boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  private projectService : ProjectService,public dialogRef: MatDialogRef<DeleteComponentComponent>){}
  handleDelete() {
    this.loading = true
    this.projectService.DeleteProject(this.data.projectId).subscribe({
      next:()=>{
        this.data.loadProject()
        this.loading = false
        this.dialogRef.close()
      },
      error:()=>{
        this.loading = false
        this.dialogRef.close()
      }
    })
  }
}
