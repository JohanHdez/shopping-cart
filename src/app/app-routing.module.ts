import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/guards/auth.guard";
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/store' },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: 'store', loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule)},
  { path: 'create-account', loadChildren: () => import('./pages/create-account/create-account.module').then(m => m.CreateAccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
