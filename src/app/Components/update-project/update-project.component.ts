import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/Services/Project/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit{
  UpdateProjectForm : FormGroup
  loading : boolean = false
  projectFormData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  private projectService : ProjectService,public dialogRef: MatDialogRef<UpdateProjectComponent>){}
  ngOnInit(): void {
    this.UpdateProjectForm = new FormGroup({
      projectshortname : new FormControl(null,Validators.required),
      projectfullname : new FormControl(null,[Validators.required])
    })
    this.getProject()
  }
  getProject(){
    this.projectService.getProject(this.data.projectId)
    .subscribe({
      next:(res)=>{
        this.projectFormData = res
        this.UpdateProjectForm.patchValue({
          projectshortname: this.projectFormData.projectshortname,
          projectfullname: this.projectFormData.projectfullname
        });
      }
    })
  }
  handleUpdateProject(){
    this.loading = true
    this.projectService.updateProject(this.data.projectId,this.UpdateProjectForm.value)
      .subscribe(
        {
          next:()=>{
            this.data.loadProject()
            this.loading = false
            this.dialogRef.close()
          },
          error:()=>{
            this.loading = false
            this.dialogRef.close()
          }
        }
      );
  }
}
