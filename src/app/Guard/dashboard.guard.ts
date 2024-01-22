import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../Services/Login/login.service';

@Injectable({
  providedIn: 'root',
})
export class dashboardGuard implements CanActivate {
  constructor(private router: Router,private loginService : LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
   if(!this.loginService.isLoggedIn()){
    this.router.navigate(['/login'])
   }
   return this.loginService.isLoggedIn()
  }
}
