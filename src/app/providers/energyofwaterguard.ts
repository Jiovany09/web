import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as _ from 'lodash';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
    providedIn: 'root',
})

export class EnergyOfWaterGuard implements CanActivate {

    private readonly USER_DATA_KEY = 'energy-of-water/simple-data-user';

    constructor(private ngxPermissionsService: NgxPermissionsService, private router: Router) { }

    canActivate() {
        if (this.isLogged()) {
            this.addPermissions();
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

    isLogged() {
        return JSON.parse(sessionStorage.getItem(this.USER_DATA_KEY));
    }

    addPermissions() {
        if (!this.isLogged()) {
            return;
        }
        this._addPermissions(this.isLogged().tipo);
    }

    _addPermissions(permiso: any) {
        this._removePermissions();
        if (!permiso) {
            return;
        }
        let per: string[] = [];
        per.push(permiso);
        this.ngxPermissionsService.loadPermissions(per);
        return per;
    }

    _removePermissions() {
        this.ngxPermissionsService.flushPermissions();
    }
}