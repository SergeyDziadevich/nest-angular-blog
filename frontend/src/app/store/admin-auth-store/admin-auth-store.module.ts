import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { ADMIN_AUTH_FEATURE_NAME, adminAuthReducer } from './store/admin-auth-reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(ADMIN_AUTH_FEATURE_NAME, adminAuthReducer)
  ]
})
export class AdminAuthStoreModule { }
