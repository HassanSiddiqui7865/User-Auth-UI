import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/Services/Project/project.service';
import { userlist } from 'src/app/create-project/userlist';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit{
  UpdateProjectForm : FormGroup
  loading : boolean = false
  projectFormData:any;
  filteredArray:any[];
  userinput:any;
  usersList=userlist;
  AddedMember:any[]=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  private projectService : ProjectService,public dialogRef: MatDialogRef<UpdateProjectComponent>,private toastr : ToastrService){}
  ngOnInit(): void {
    this.UpdateProjectForm = new FormGroup({
      projectshortname : new FormControl(null,Validators.required),
      projectfullname : new FormControl(null,[Validators.required])
    })
  }
  handleChange(e){
    const filteredUser = userlist.filter((item) => {
      return item.full_name.toLowerCase().startsWith(e.target.value.toLowerCase());
    });
    
    this.filteredArray = e.target.value === "" ? null : filteredUser;
  }
  handleAddMember(id: number) {
    const filteredUser = this.usersList.find((item) => {
      return item.id === id;
    });
    if (!this.AddedMember.includes(filteredUser)) {
      this.AddedMember.push(filteredUser);
    }
  }
  handleDeleteMember(id:number){
    this.AddedMember.splice(this.AddedMember.findIndex((item)=>item.id === id),1)
  }
 
}
