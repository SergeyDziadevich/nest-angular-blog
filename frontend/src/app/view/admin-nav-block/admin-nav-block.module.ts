import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { AdminNavBlockComponent } from './blocks/admin-nav-block/admin-nav-block.component';
import { NestedTreeUiComponent } from './ui/nested-tree-ui/nested-tree-ui.component';
import {AdminMenuStoreModule} from '../../store/admin-menu-store/admin-menu-store.module';

@NgModule({
  declarations: [AdminNavBlockComponent, NestedTreeUiComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    AdminMenuStoreModule
  ],
  exports: [
    AdminNavBlockComponent
  ]
})
export class AdminNavBlockModule { }
