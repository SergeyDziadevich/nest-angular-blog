import { createReducer, on } from '@ngrx/store';
import {login, loginFailed, loginSuccess, logoutSuccess} from './admin-auth.actions';

export const ADMIN_AUTH_FEATURE_NAME = 'admin-auth';

export interface AuthData {
  accessToken: string;
  id: number;
  iat: number;
  /**
   * Expiring at timestamp
   */
  exp: number;
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
  on(loginSuccess, (
    state, {
      type,
      ...authData
    }: any & AuthData) => ({
    ...state,
    authData,
    loaded: true,
    loading: false,
    serverError: ''
  })),
  on(loginFailed, (state, { serverError }) => ({
    ...state,
    loading: false,
    loaded: true,
    serverError,
    authData: null,
  })),
  on(logoutSuccess, (state) => ({ ...initialState, authData: null }))
);
