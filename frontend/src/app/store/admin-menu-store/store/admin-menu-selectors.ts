import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ADMIN_MENU_FEATURE_NAME, AdminMenuState} from './admin-menu-reducer';

export interface AppState {
  'admin-menu': AdminMenuState;
}

const getFeature = createFeatureSelector<AppState, AdminMenuState>(ADMIN_MENU_FEATURE_NAME);

export const getLoading = createSelector(getFeature, state => state.loading);

export const getLoaded = createSelector(getFeature, state => state.loaded);

export const getServerError = createSelector(getFeature, state => state.serverError);

export const getMenuData = createSelector(getFeature, state => state.data);