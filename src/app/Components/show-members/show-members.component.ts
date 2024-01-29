import { Component } from '@angular/core';
import { userlist } from 'src/app/create-project/userlist';

@Component({
  selector: 'app-show-members',
  templateUrl: './show-members.component.html',
  styleUrls: ['./show-members.component.css']
})
export class ShowMembersComponent {
  usersList = userlist
}
