import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of, timer} from 'rxjs';
import {switchMap, map, catchError, delayWhen, filter, first} from 'rxjs/operators';
import { login, loginFailed, loginSuccess } from './admin-auth.actions';
import { AdminAuthService } from '../services/admin-auth.service';
import { AuthData } from './admin-auth-reducer';
import {select, Store } from '@ngrx/store';
import {isAuth} from './admin-auth-selectors';

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
      map((loginSuccessData: AuthData) => loginSuccess(loginSuccessData)),
      catchError((err) => of(loginFailed({ serverError: err.message })))
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      delayWhen((action: AuthData) => timer(action.exp * 1000 - 60 * 1000 - Date.now())),
      switchMap(() => this.store$.pipe(
        select(isAuth),
        first(),
        filter(isAdminAuth => isAdminAuth)
      )),
      switchMap((action) => this.adminAuthService.refresh()),
      map((loginSuccessData: AuthData) => loginSuccess(loginSuccessData)),
      catchError((err) => of(loginFailed({ serverError: err.message })))
    )
  );

  constructor(
    private actions$: Actions,
    private adminAuthService: AdminAuthService,
    private store$: Store
  ) {}
}
