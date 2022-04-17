import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {select, Store } from '@ngrx/store';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import { AdminMenuService } from '../services/admin-menu.service';
import {initMenu, initMenuFailed, initMenuSuccess} from './admin-menu.actions';
import {getLoaded, getLoading} from './admin-menu-selectors';
import { of } from 'rxjs';

@Injectable()
export class AdminMenuEffects {
  initMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initMenu),
        withLatestFrom(
          this.store$.pipe(select(getLoaded)),
          this.store$.pipe(select(getLoading))
        ),
        filter(([_, loaded, loading]) => !loaded && loading),
        switchMap(() => this.adminMenuService.getMenu().pipe(
          map(data => initMenuSuccess({data})),
          catchError(error => of(
            initMenuFailed({serverError: error})
          ))
        ))
      ));

  constructor(
    private actions$: Actions,
    private adminMenuService: AdminMenuService,
    private store$: Store
  ) {}
}
