import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {  isLoggedIn } from 'src/Auth';

export const loginGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if(isLoggedIn()){
    router.navigate(['/projects'])
    return false
  }
  return true
};

