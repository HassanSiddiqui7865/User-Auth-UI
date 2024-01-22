import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const login = JSON.parse(localStorage.getItem('login'))
  const router = inject(Router)
  if(login.userrole === "user" || login.userrole === "librarian"){
    router.navigate(['dashboard'])
  }
  return true
};
