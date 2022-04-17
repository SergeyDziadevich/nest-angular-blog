import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';

import {ADMIN_MENU_FEATURE_NAME, adminMenuReducer} from './store/admin-menu-reducer';
import {AdminMenuEffects} from './store/admin-menu.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(ADMIN_MENU_FEATURE_NAME, adminMenuReducer),
    EffectsModule.forFeature([AdminMenuEffects]),
    HttpClientModule
  ]
})
export class AdminMenuStoreModule { }
