import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('token');

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+authToken,
      'Access-Control-Allow-Origin':'*'
    });


    const cloneReq = req.clone({headers});

    //const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', 'Bearer '+authToken)
    // });

    // send cloned request with header to the next handler.
    return next.handle(cloneReq);
  }
}