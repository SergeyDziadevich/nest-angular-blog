import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminFooterBlockModule } from '../../view/admin-footer-block/admin-footer-block.module';
import { AdminHeaderBlockModule } from '../../view/admin-header-block/admin-header-block.module';
import {AdminNavBlockModule} from '../../view/admin-nav-block/admin-nav-block.module';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminFooterBlockModule,
    AdminHeaderBlockModule,
    AdminNavBlockModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: AdminPageComponent,
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'grid/:namespace/:entity',
        component: AdminPageComponent,
        loadChildren: () =>
          import('./grid/grid.module').then((m) => m.GridModule),
      },
      {
        path: 'form/:namespace/:entity',
        component: AdminPageComponent,
        loadChildren: () =>
          import('./form/form.module').then((m) => m.FormModule),
      },
    ]),
  ],
})
export class AdminModule {}
