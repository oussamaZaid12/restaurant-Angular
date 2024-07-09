import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

const routes: Routes = [
  { path: 'admin', component: AdminMenuComponent },
  { path: 'menu', component: UserMenuComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
