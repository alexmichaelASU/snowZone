import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { WebRequestService } from './services/web-request.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private webReq: WebRequestService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem(this.webReq.TOKEN_KEY);
        
        
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        
        return next.handle(authRequest);
    }
}