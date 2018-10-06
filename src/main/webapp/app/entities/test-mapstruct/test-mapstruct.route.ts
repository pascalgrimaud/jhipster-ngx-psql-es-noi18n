import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestMapstruct } from 'app/shared/model/test-mapstruct.model';
import { TestMapstructService } from './test-mapstruct.service';
import { TestMapstructComponent } from './test-mapstruct.component';
import { TestMapstructDetailComponent } from './test-mapstruct-detail.component';
import { TestMapstructUpdateComponent } from './test-mapstruct-update.component';
import { TestMapstructDeletePopupComponent } from './test-mapstruct-delete-dialog.component';
import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';

@Injectable({ providedIn: 'root' })
export class TestMapstructResolve implements Resolve<ITestMapstruct> {
    constructor(private service: TestMapstructService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testMapstruct: HttpResponse<TestMapstruct>) => testMapstruct.body));
        }
        return of(new TestMapstruct());
    }
}

export const testMapstructRoute: Routes = [
    {
        path: 'test-mapstruct',
        component: TestMapstructComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestMapstructs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-mapstruct/:id/view',
        component: TestMapstructDetailComponent,
        resolve: {
            testMapstruct: TestMapstructResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestMapstructs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-mapstruct/new',
        component: TestMapstructUpdateComponent,
        resolve: {
            testMapstruct: TestMapstructResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestMapstructs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-mapstruct/:id/edit',
        component: TestMapstructUpdateComponent,
        resolve: {
            testMapstruct: TestMapstructResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestMapstructs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testMapstructPopupRoute: Routes = [
    {
        path: 'test-mapstruct/:id/delete',
        component: TestMapstructDeletePopupComponent,
        resolve: {
            testMapstruct: TestMapstructResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestMapstructs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
