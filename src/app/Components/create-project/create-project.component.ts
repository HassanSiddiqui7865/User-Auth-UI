import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/Services/Project/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  CreateProjectForm:FormGroup
  loading:boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data,private projectService : ProjectService,
  private dialogRef: MatDialogRef<CreateProjectComponent>){}
  ngOnInit(): void {
    this.CreateProjectForm = new FormGroup({
      projectshortname : new FormControl(null,Validators.required),
      projectfullname : new FormControl(null,[Validators.required])
    })
  }
  handlecreateProject() {
    this.loading = true
    this.projectService.createProject(this.CreateProjectForm.value)
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
