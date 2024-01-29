import {Component, OnInit} from '@angular/core';
import { userlist } from './userlist';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],

})
export class CreateProjectComponent implements OnInit {
  filteredArray:any[];
  userinput:any;
  usersList=userlist;
  AddedMember:any[]=[]
  ngOnInit(): void {
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
