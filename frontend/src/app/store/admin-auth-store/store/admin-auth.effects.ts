import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fromEvent, of, timer } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  filter,
  first,
  tap,
  distinctUntilChanged,
  skip,
} from 'rxjs/operators';
import {
  extractLoginData,
  initAdminAuth,
  login,
  loginFailed,
  loginSuccess,
  logout,
  logoutSuccess,
} from './admin-auth.actions';
import { AdminAuthService } from '../services/admin-auth.service';
import { AuthData } from './admin-auth-reducer';
import { select, Store } from '@ngrx/store';
import { isAuth } from './admin-auth-selectors';
import { Router } from '@angular/router';

@Injectable()
export class AdminAuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.adminAuthService.login({
          login: action.login,
          password: action.password,
        })
      ),
      map((authData: AuthData) => loginSuccess({ authData })),
      catchError((err) => of(loginFailed({ serverError: err.message })))
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      switchMap(({ authData }) =>
        timer(authData.exp * 1000 - 60 * 1000 - Date.now())
      ),
      switchMap(() =>
        this.store$.pipe(
          select(isAuth),
          first(),
          filter((isAdminAuth) => isAdminAuth)
        )
      ),
      switchMap((action) => this.adminAuthService.refresh()),
      map((authData) => loginSuccess({ authData })),
      catchError((err) => of(loginFailed({ serverError: err.message })))
    )
  );

  saveAuthDataToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ authData }) => {
          localStorage.setItem('authData', JSON.stringify(authData));
        })
      ),
    { dispatch: false }
  );

  extractLoginData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAdminAuth, extractLoginData),
      map(() => {
        const authDataString = localStorage.getItem('authData');

        if (!authDataString) {
          return logoutSuccess();
        }

        const authData: AuthData = JSON.parse(authDataString);

        if (authData.exp * 1000 - 10 * 1000 - Date.now() < 0) {
          return logoutSuccess();
        }

        return loginSuccess({ authData });
      })
    )
  );

  listenStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAdminAuth),
      switchMap(() => fromEvent(window, 'storage')),
      map(() => extractLoginData())
    )
  );

  listenAuthorizeEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initAdminAuth),
        switchMap(() => this.adminAuthService.isAuth$),
        distinctUntilChanged(),
        skip(1),
        tap((isAuthorized) => {
          this.router.navigateByUrl(
            isAuthorized ? '/admin' : '/admin/auth/login'
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    map(() => {
      localStorage.removeItem('authData');
      return logoutSuccess();
    })
  ));

  constructor(
    private actions$: Actions,
    private adminAuthService: AdminAuthService,
    private store$: Store,
    private router: Router
  ) {}
}
