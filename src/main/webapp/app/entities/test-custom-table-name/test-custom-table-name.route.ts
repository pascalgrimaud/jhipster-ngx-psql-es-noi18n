import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestCustomTableName } from 'app/shared/model/test-custom-table-name.model';
import { TestCustomTableNameService } from './test-custom-table-name.service';
import { TestCustomTableNameComponent } from './test-custom-table-name.component';
import { TestCustomTableNameDetailComponent } from './test-custom-table-name-detail.component';
import { TestCustomTableNameUpdateComponent } from './test-custom-table-name-update.component';
import { TestCustomTableNameDeletePopupComponent } from './test-custom-table-name-delete-dialog.component';
import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

@Injectable({ providedIn: 'root' })
export class TestCustomTableNameResolve implements Resolve<ITestCustomTableName> {
    constructor(private service: TestCustomTableNameService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testCustomTableName: HttpResponse<TestCustomTableName>) => testCustomTableName.body));
        }
        return of(new TestCustomTableName());
    }
}

export const testCustomTableNameRoute: Routes = [
    {
        path: 'test-custom-table-name',
        component: TestCustomTableNameComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestCustomTableNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-custom-table-name/:id/view',
        component: TestCustomTableNameDetailComponent,
        resolve: {
            testCustomTableName: TestCustomTableNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestCustomTableNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-custom-table-name/new',
        component: TestCustomTableNameUpdateComponent,
        resolve: {
            testCustomTableName: TestCustomTableNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestCustomTableNames'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-custom-table-name/:id/edit',
        component: TestCustomTableNameUpdateComponent,
        resolve: {
            testCustomTableName: TestCustomTableNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestCustomTableNames'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testCustomTableNamePopupRoute: Routes = [
    {
        path: 'test-custom-table-name/:id/delete',
        component: TestCustomTableNameDeletePopupComponent,
        resolve: {
            testCustomTableName: TestCustomTableNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestCustomTableNames'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
