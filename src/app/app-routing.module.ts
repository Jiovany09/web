import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuNavbarComponent } from './components/menu-navbar/menu-navbar.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { UserComponent } from './components/user/user.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { ContentComponent } from './components/content/content.component';
import { DetailComponent } from './components/detail/detail.component';
import { EnergyOfWaterGuard } from './providers/energyofwaterguard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'content',
    component: MenuNavbarComponent,
    canActivate: [EnergyOfWaterGuard],
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        }
      },
      {
        path: 'administrator',
        component: AdministratorComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        }
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        }
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        }
      },
      {
        path: 'generator',
        component: GeneratorComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        }
      },
      {
        path: 'content',
        component: ContentComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        }
      },
      {
        path: 'detail',
        component: DetailComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        }
      },
      {
        path: '**',
        canActivate: [NgxPermissionsGuard],
        data: {
          toolbarShadowEnabled: false,
          scrollDisabled: false,
          permissions: {
            only: ['administrador']
          }
        },
        redirectTo: '/content/statistics'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
