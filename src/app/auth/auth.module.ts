import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FeaturesComponent } from './features/features.component';
import { AuthGuardService } from '../core/security/auth-guard.service';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FeaturesComponent,
    RolesComponent,
    UsersComponent,
    DashboardComponent
  ],
  imports: [CommonModule, AuthRoutingModule],
  exports: [DashboardComponent]
})
export class AuthModule {}
