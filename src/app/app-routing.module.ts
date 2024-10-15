import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { OrderComponent } from './components/order/order.component';
import { NewOrderComponent } from './components/order/new-order/new-order.component';
import { AboutComponent } from './components/about/about.component';
import { OrderCreatedSuccessfullyComponent } from './components/order/order-created-successfully/order-created-successfully.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'kanban', component: KanbanComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'orders/new-order', component: NewOrderComponent },
      { path: 'orders/order-created-successfully', component: OrderCreatedSuccessfullyComponent },
      { path: 'new-order', component: NewOrderComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: 'about', component: AboutComponent }
    ]


  }
  // {path: 'dashboard/kanban', component: KanbanComponent},
  // {path: 'dashboard/suppliers', component: SuppliersComponent},
  // {path: 'dashboard/analize', component: AnalizeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
