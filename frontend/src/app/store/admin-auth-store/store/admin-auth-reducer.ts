import { createReducer, on } from '@ngrx/store';
import { login, loginFailed, loginSuccess } from './admin-auth.actions';

export const ADMIN_AUTH_FEATURE_NAME = 'admin-auth';

export interface AuthData {
  accessToken: string;
}

export interface AdminAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData;
}

const initialState: AdminAuthState = {
  loading: false,
  loaded: true,
  serverError: '',
};

export const adminAuthReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, authData: AuthData) => ({
    ...state,
    loading: false,
    loaded: true,
    serverError: '',
    authData,
  })),
  on(loginFailed, (state, {serverError}) => ({
    ...state,
    loading: false,
    loaded: true,
    serverError,
    authData: null
  }))
);
