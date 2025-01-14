import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { NavbarAdminComponent } from './core/layout/navbar-admin/navbar-admin.component';
import { PatientFormComponent } from './features/patient-registration/components/patient-form/patient-form.component';
import { PatientListComponent } from './features/patient-registration/components/patient-list/patient-list.component';
import { AdmissionRegisterComponent } from './features/admission/pages/admission-register/admission-register.component';
import { RegisterSupplierComponent } from './features/supplier-registration/pages/register-supplier/register-supplier.component';
import { RegisterEmployeesComponent } from './features/employees-registration/pages/register-employees/register-employees.component';
import { RegisterCatalogsComponent } from './features/catalogs-registration/pages/register-catalogs/register-catalogs.component';
import { RegisterMedicationsComponent } from './features/medications-registration/pages/register-medications/register-medications.component';
import { RegisterLotsComponent } from './features/lots-registration/pages/register-lots/register-lots.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dash', component: NavigationComponent },
  {
    path: 'admin', component: NavbarAdminComponent,
    children: [
      { path: 'px', component: PatientFormComponent },
      { path: 'tabla', component: PatientListComponent },
      { path: 'admision', component: AdmissionRegisterComponent },
      { path: 'supplier', component: RegisterSupplierComponent },
      { path: 'employees', component: RegisterEmployeesComponent },
      { path: 'catalogos', component: RegisterCatalogsComponent },
      { path: 'medicamentos', component: RegisterMedicationsComponent },
      { path: 'lots', component: RegisterLotsComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
