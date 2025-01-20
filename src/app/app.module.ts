import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './core/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './features/auth/login/login.component';
import { NavbarAdminComponent } from './core/layout/navbar-admin/navbar-admin.component';
import { RegisterPatientComponent } from './features/patient-registration/pages/register-patient/register-patient.component';
import { PatientFormComponent } from './features/patient-registration/components/patient-form/patient-form.component';
import { PatientListComponent } from './features/patient-registration/components/patient-list/patient-list.component';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AdmissionFormComponent } from './features/admission/components/admission-form/admission-form.component';
import { AdmissionRegisterComponent } from './features/admission/pages/admission-register/admission-register.component';
import { RegisterSupplierComponent } from './features/supplier-registration/pages/register-supplier/register-supplier.component';
import { SupplierFormComponent } from './features/supplier-registration/components/supplier-form/supplier-form.component';
import { SupplierListComponent } from './features/supplier-registration/components/supplier-list/supplier-list.component';
import { RegisterEmployeesComponent } from './features/employees-registration/pages/register-employees/register-employees.component';
import { EmployeesFormComponent } from './features/employees-registration/components/employees-form/employees-form.component';
import { EmployeesListComponent } from './features/employees-registration/components/employees-list/employees-list.component';
import { RegisterCatalogsComponent } from './features/catalogs-registration/pages/register-catalogs/register-catalogs.component';
import { CatalogsFormComponent } from './features/catalogs-registration/components/catalogs-form/catalogs-form.component';
import { CatalogsListComponent } from './features/catalogs-registration/components/catalogs-list/catalogs-list.component';
import { RegisterMedicationsComponent } from './features/medications-registration/pages/register-medications/register-medications.component';
import { MedicationsFormComponent } from './features/medications-registration/components/medications-form/medications-form.component';
import { MedicationsListComponent } from './features/medications-registration/components/medications-list/medications-list.component';

import { RegisterLotsComponent } from './features/lots-registration/pages/register-lots/register-lots.component';
import { LotsFormComponent } from './features/lots-registration/components/lots-form/lots-form.component';
import { LotsListComponent } from './features/lots-registration/components/lots-list/lots-list.component';
import { CustomSelectComponent } from './shared/components/custom-select/custom-select.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { AttentionComponent } from './features/patient-care/attention/attention.component';
import { ListComponent } from './features/patient-care/list/list.component';
import { KardexPageComponent } from './features/inventory-management/pages/kardex-page/kardex-page.component';
import { LotesTableComponent } from './features/inventory-management/components/lotes-table/lotes-table.component';
import { StockTableComponent } from './features/inventory-management/components/stock-table/stock-table.component';
import { MovimientosTableComponent } from './features/inventory-management/components/movimientos-table/movimientos-table.component';
import { AnamnesisFormComponent } from './features/patient-care/attention/anamnesis-form/anamnesis-form.component';
import { OrdersFormComponent } from './features/patient-care/attention/orders-form/orders-form.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    NavbarAdminComponent,
    RegisterPatientComponent,
    PatientFormComponent,
    PatientListComponent,
    AdmissionFormComponent,
    AdmissionRegisterComponent,
    RegisterSupplierComponent,
    SupplierFormComponent,
    SupplierListComponent,
    RegisterEmployeesComponent,
    EmployeesFormComponent,
    EmployeesListComponent,
    RegisterCatalogsComponent,
    CatalogsFormComponent,
    CatalogsListComponent,
    RegisterMedicationsComponent,
    MedicationsFormComponent,
    MedicationsListComponent,
    RegisterLotsComponent,
    LotsFormComponent,
    LotsListComponent,
    CustomSelectComponent,
    AttentionComponent,
    ListComponent,
    KardexPageComponent,
    LotesTableComponent,
    StockTableComponent,
    MovimientosTableComponent,
    AnamnesisFormComponent,
    OrdersFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule ,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
