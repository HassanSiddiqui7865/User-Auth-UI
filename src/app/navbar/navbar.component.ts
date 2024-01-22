import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/Login/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login:string;
  username:string
  constructor(private loginService : LoginService) {
    
  }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('login')).username
    this.login = JSON.parse(localStorage.getItem('login')).userrole
  }

  onHandleLogout(){
    this.loginService.logout()
  }
}
