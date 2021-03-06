import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AddButtonComponent,
  CardComponent,
  GenericListComponent,
  GridComponent,
  HeaderComponent,
  ModalComponent,
} from '@app/components';
import {
  DashBoardComponent,
  PaymentMethodComponent,
  PaymentMethodCreateEditComponent,
  PaymentMethodListComponent,
  ProductsCreateEditComponent,
  ProductsListComponent,
  SalesComponent,
  SalesCreateEditComponent,
  SalesListComponent,
} from '@app/pages';
import { HotToastModule } from '@ngneat/hot-toast';
import { BreadCrumbComponent } from 'app/components/bread-crumb/bread-crumb.component';
import { GenericInputComponent } from 'app/components/generic-input/generic-input.component';
import { ProductsComponent } from 'app/pages/cadastros/products/products.component';
import { AVAILABLE_PIPES } from 'app/providers/available-pipes.provider';
import {
  CurrencyMaskConfig,
  CurrencyMaskInputMode,
  NgxCurrencyModule,
} from 'ngx-currency';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbstractTemplateCreateEditComponent } from './components/abstract-template-create-edit/abstract-template-create-edit.component';
import { AbstractTemplateCrudComponent } from './components/abstract-template-crud/abstract-template-crud.component';
import { AlertComponent } from './components/alert/alert.component';
import { GenericBaseFormFieldComponent } from './components/generic-base-form-field/generic-base-form-field.component';
import { GenericSelectComponent } from './components/generic-select/generic-select.component';
import { ShowValidationDirective } from './directives/show-validation.directive';
import { CategoriaCreateEditComponent } from './pages/cadastros/categoria/categoria-create-edit/categoria-create-edit.component';
import { CategoriaListComponent } from './pages/cadastros/categoria/categoria-list/categoria-list.component';
import { CategoriaComponent } from './pages/cadastros/categoria/categoria.component';
import { GenericPipe } from './pipes/generic.pipe';

registerLocaleData(localePt);

export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [
    AppComponent,
    BreadCrumbComponent,
    ModalComponent,
    GridComponent,
    CardComponent,
    HeaderComponent,
    AddButtonComponent,
    GenericListComponent,
    DashBoardComponent,
    ProductsComponent,
    ProductsCreateEditComponent,
    ProductsListComponent,
    SalesComponent,
    SalesListComponent,
    SalesCreateEditComponent,
    PaymentMethodComponent,
    PaymentMethodListComponent,
    PaymentMethodCreateEditComponent,
    CategoriaComponent,
    CategoriaListComponent,
    CategoriaCreateEditComponent,
    ShowValidationDirective,
    GenericInputComponent,
    GenericBaseFormFieldComponent,
    GenericSelectComponent,
    GenericPipe,
    AlertComponent,
    AbstractTemplateCrudComponent,
    AbstractTemplateCreateEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSortModule,
    MatDialogModule,
    MatNativeDateModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    HotToastModule.forRoot(),
  ],

  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    AVAILABLE_PIPES,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
