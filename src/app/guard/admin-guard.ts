import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
const user=JSON.parse(sessionStorage.getItem("user")||"")

  if (user.role=="admin") {
    return true;

  } else {
    alert("Unauthorized acccess..plz Login")
    setTimeout(() => {
      router.navigateByUrl('/login')
    }, 100)
    return false
  }

};
