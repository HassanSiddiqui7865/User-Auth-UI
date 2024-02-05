import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { userlist } from 'src/app/create-project/userlist';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  filteredArray:any[];
  userinput:any;
  usersList=userlist;
  AddedMember:any[]=[]

  constructor(public dialogRef: MatDialogRef<CreateTaskComponent>){
    
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
  handleDialogClose(){
    this.dialogRef.close()
  }
}
