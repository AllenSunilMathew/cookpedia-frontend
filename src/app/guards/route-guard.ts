import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {

let router=inject(Router)
if (sessionStorage.getItem("token")) {
    return true;

} else {
  alert("Unauthorized acccess..plz Login")
  setTimeout(()=>{
    router.navigateByUrl('/login')
  },100)
  return false
}



};
