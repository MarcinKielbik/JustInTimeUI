import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { SettingsComponent } from './components/settings/settings.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard], children: [
    { path: 'kanban', component: KanbanComponent },
    { path: 'suppliers', component: SuppliersComponent },
    { path: 'order', component: OrderComponent },
    { path: 'settings', component: SettingsComponent }
  ] }
  // {path: 'dashboard/kanban', component: KanbanComponent},
  // {path: 'dashboard/suppliers', component: SuppliersComponent},
  // {path: 'dashboard/analize', component: AnalizeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
