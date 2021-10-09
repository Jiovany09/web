import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

/*Import's de material*/
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

/*Import's de ng2-charts*/
import { ChartsModule } from 'ng2-charts';

/*Import para el cliente http y el interceptor para el token*/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

/*Import para el tema de formularios*/
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*Permisos de rutas con guards ngx-permissions*/
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MenuNavbarComponent } from './components/menu-navbar/menu-navbar.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BarHorizontalComponent } from './components/statistics/bar-horizontal/bar-horizontal.component';
import { BarVerticalComponent } from './components/statistics/bar-vertical/bar-vertical.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { TableEliminateComponent } from './components/administrator/table-eliminate/table-eliminate.component';
import { TableActiveComponent } from './components/administrator/table-active/table-active.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { TableActiveEmployeeComponent } from './components/employee/table-active-employee/table-active-employee.component';
import { TableEliminateEmployeeComponent } from './components/employee/table-eliminate-employee/table-eliminate-employee.component';
import { UserComponent } from './components/user/user.component';
import { TableActiveUserComponent } from './components/user/table-active-user/table-active-user.component';
import { TableEliminateUserComponent } from './components/user/table-eliminate-user/table-eliminate-user.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { TableActiveGeneratorComponent } from './components/generator/table-active-generator/table-active-generator.component';
import { TableEliminateGeneratorComponent } from './components/generator/table-eliminate-generator/table-eliminate-generator.component';
import { ContentComponent } from './components/content/content.component';
import { TableActiveContentComponent } from './components/content/table-active-content/table-active-content.component';
import { TableDeleteContentComponent } from './components/content/table-delete-content/table-delete-content.component';
import { DetailComponent } from './components/detail/detail.component';
import { TableActiveDetailComponent } from './components/detail/table-active-detail/table-active-detail.component';
import { TableEliminateDetailComponent } from './components/detail/table-eliminate-detail/table-eliminate-detail.component';
import { RealTimeInformationComponent } from './components/statistics/real-time-information/real-time-information.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuNavbarComponent,
    StatisticsComponent,
    BarHorizontalComponent,
    BarVerticalComponent,
    AdministratorComponent,
    TableEliminateComponent,
    TableActiveComponent,
    EmployeeComponent,
    TableActiveEmployeeComponent,
    TableEliminateEmployeeComponent,
    UserComponent,
    TableActiveUserComponent,
    TableEliminateUserComponent,
    GeneratorComponent,
    TableActiveGeneratorComponent,
    TableEliminateGeneratorComponent,
    ContentComponent,
    TableActiveContentComponent,
    TableDeleteContentComponent,
    DetailComponent,
    TableActiveDetailComponent,
    TableEliminateDetailComponent,
    RealTimeInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    ChartsModule,
    ChartsModule,
    MatTabsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatMomentDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    { 
      provide: LOCALE_ID, 
      useValue: 'es' 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
