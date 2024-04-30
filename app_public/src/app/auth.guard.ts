import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { WebRequestService } from './services/web-request.service';

export const authGuard: CanActivateFn = () => {
  const webReq = inject(WebRequestService);
  const router = inject(Router);
  
  
  if (webReq.isLoggedIn()) {
      return true;
  } else {
      router.navigate(['/sigin']);
      return false;
  }
};
