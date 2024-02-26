import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = (window as any).globalThis.angular?.router;
  const isLoggedIn = localStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    alert('Please login first');
    router.navigateByUrl('login');
    return false;
  }

  return true;
};
