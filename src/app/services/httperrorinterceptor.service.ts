import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.error('An error occurred:', error.error.message);
          alert("Erorr on client side: " + error.error.message)
          
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          alert(`Server returned code ${error.status}, please refresh page.`)
          
        }
        return EMPTY;
      })
    );
  }
}
