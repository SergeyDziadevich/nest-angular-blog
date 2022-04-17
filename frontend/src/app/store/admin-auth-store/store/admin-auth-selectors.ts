import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ADMIN_AUTH_FEATURE_NAME, AdminAuthState} from './admin-auth-reducer';

export interface AppState {
  'admin-auth': AdminAuthState;
}

const getFeature = createFeatureSelector<AppState, AdminAuthState>(ADMIN_AUTH_FEATURE_NAME);

export const getLoading = createSelector(getFeature, state => state.loading);

export const getLoaded = createSelector(getFeature, state => state.loaded);

export const getServerError = createSelector(getFeature, state => state.serverError);

export const getAuthData = createSelector(getFeature, state => state.authData);

export const getAccessToken = createSelector(getAuthData, authData => authData && authData.accessToken);

export const isAuth = createSelector(getAccessToken, accessToken => !!accessToken);
