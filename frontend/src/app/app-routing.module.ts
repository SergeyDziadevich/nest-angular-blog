import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AdminGuestGuard } from './guards/admin-guest.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { StoreModule } from '@ngrx/store';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer } from '@ngrx/router-store';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin/auth',
    loadChildren: () =>
      import('./pages/admin-auth/admin-auth.module').then(
        (m) => m.AdminAuthModule
      ),
    canLoad: [AdminGuestGuard],
    canActivate: [AdminGuestGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AdminAuthGuard],
    canActivate: [AdminAuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer),
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
