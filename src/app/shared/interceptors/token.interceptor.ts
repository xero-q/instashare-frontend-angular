import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      req = this.addToken(req, accessToken);
    }
    
    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/login') &&
          error.status === 403
        ) {
          return this.handle403Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.authService.isLoggedIn) {
        return this.authService.refreshToken().pipe(
          switchMap((response: any) => {
            const {access, refresh} = response;

            this.authService.saveTokens(access,refresh);           
            this.isRefreshing = false;

            request = this.addToken(request,access);

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
 
}
