import {createAction, props} from '@ngrx/store';
import {AuthData} from './admin-auth-reducer';

export const login = createAction(
  '[Admin Auth] Login',
  props<{ login: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Admin Auth] Login Success',
  props<{ authData: AuthData }>()
);

export const loginFailed = createAction(
  '[Admin Auth] Login Failed',
  props<{ serverError: string }>()
);

export const initAdminAuth = createAction(
  '[Admin Auth] init admin auth'
);

export const logout = createAction(
  '[Admin Auth] logout'
);

export const logoutSuccess = createAction(
  '[Admin Auth] logout Success'
);

export const extractLoginData = createAction(
  '[Admin Auth] extract login data'
);
