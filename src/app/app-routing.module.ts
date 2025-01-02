import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { NavbarAdminComponent } from './core/layout/navbar-admin/navbar-admin.component';
import { PatientFormComponent } from './features/patient-registration/components/patient-form/patient-form.component';
import { PatientListComponent } from './features/patient-registration/components/patient-list/patient-list.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dash', component: NavigationComponent },
  {
    path: 'admin', component: NavbarAdminComponent,
    children: [
      { path: 'px', component: PatientFormComponent },
      { path: 'tabla', component: PatientListComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
