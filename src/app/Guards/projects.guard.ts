import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isLoggedIn } from 'src/Auth';

export const projectsGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if(isLoggedIn()){
    return true
  }
  router.navigate(['/login'])
  return false
};
