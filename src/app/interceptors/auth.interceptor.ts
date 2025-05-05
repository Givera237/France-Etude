import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification/service/authentification-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor 
{

    constructor
    (
       private auth : AuthentificationService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
      console.log('token de intercepteur', `${this.auth.getToken()}`)
        const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${this.auth.getToken()}`);
        const modifiedReq = req.clone({ headers });
        return next.handle(modifiedReq);
    }
}