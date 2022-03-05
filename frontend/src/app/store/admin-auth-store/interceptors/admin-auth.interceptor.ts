import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getAccessToken } from '../store/admin-auth-selectors';
import { first, switchMap } from 'rxjs/operators';

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

        return next.handle(authRequest);
      })
    );
  }
}
