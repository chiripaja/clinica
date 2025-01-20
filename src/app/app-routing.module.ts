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
import { RegisterPatientComponent } from './features/patient-registration/pages/register-patient/register-patient.component';
import { ListComponent } from './features/patient-care/list/list.component';
import { KardexPageComponent } from './features/inventory-management/pages/kardex-page/kardex-page.component';
import { LotesTableComponent } from './features/inventory-management/components/lotes-table/lotes-table.component';
import { StockTableComponent } from './features/inventory-management/components/stock-table/stock-table.component';
import { MovimientosTableComponent } from './features/inventory-management/components/movimientos-table/movimientos-table.component';
import { AttentionComponent } from './features/patient-care/attention/attention.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dash', component: NavigationComponent },
  {
    path: 'admin', component: NavbarAdminComponent,
    children: [
      { path: 'px', component: RegisterPatientComponent },
      { path: 'tabla', component: PatientListComponent },
      { path: 'admision', component: AdmissionRegisterComponent },
      { path: 'supplier', component: RegisterSupplierComponent },
      { path: 'employees', component: RegisterEmployeesComponent },
      { path: 'catalogos', component: RegisterCatalogsComponent },
      { path: 'medicamentos', component: RegisterMedicationsComponent },
      { path: 'lots', component: RegisterLotsComponent },
      { path: 'atenciones', component: ListComponent },
      { path: 'atenciones/:id', component: AttentionComponent },
      {  path: 'kardex',   component: KardexPageComponent}
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
