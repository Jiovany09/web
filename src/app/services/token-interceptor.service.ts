import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  private readonly token = 'energy-of-water/information-page';
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.getJwtToken()) {
      request = this.addToken(request, this.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`,
      },
    });
  }

  getJwtToken() {
    return sessionStorage.getItem('energy-of-water/information-page');
  }
}
