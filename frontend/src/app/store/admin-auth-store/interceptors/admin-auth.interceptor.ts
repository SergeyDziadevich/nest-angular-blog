import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getAccessToken } from '../store/admin-auth-selectors';
import { catchError, first, switchMap } from 'rxjs/operators';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      switchMap((accessToken) => {
        const authRequest = accessToken
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
          : request;

        return next.handle(authRequest).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              console.log('Redirect on login page or sign out');
              return EMPTY;
            }

            throw err;
          })
        );
      })
    );
  }
}
