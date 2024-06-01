import { Injectable } from '@angular/core';
import { TokenApiModel } from '../models/token-api.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.ensureTokenValidity().pipe(
      switchMap((validToken) => {
        if (validToken) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${validToken}` }
          });
        }
        return next.handle(request);
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handleUnAuthorizedError(request, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    const tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }
        });
        return next.handle(req);
      }),
      catchError((err) => {
        this.toast.warning({ detail: "Warning", summary: "Token is expired, Please Login again" });
        this.router.navigate(['login']);
        return throwError(() => err);
      })
    );
  }
}
