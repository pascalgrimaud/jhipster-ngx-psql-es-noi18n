import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestServiceImpl } from 'app/shared/model/test-service-impl.model';
import { TestServiceImplService } from './test-service-impl.service';
import { TestServiceImplComponent } from './test-service-impl.component';
import { TestServiceImplDetailComponent } from './test-service-impl-detail.component';
import { TestServiceImplUpdateComponent } from './test-service-impl-update.component';
import { TestServiceImplDeletePopupComponent } from './test-service-impl-delete-dialog.component';
import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';

@Injectable({ providedIn: 'root' })
export class TestServiceImplResolve implements Resolve<ITestServiceImpl> {
    constructor(private service: TestServiceImplService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testServiceImpl: HttpResponse<TestServiceImpl>) => testServiceImpl.body));
        }
        return of(new TestServiceImpl());
    }
}

export const testServiceImplRoute: Routes = [
    {
        path: 'test-service-impl',
        component: TestServiceImplComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-service-impl/:id/view',
        component: TestServiceImplDetailComponent,
        resolve: {
            testServiceImpl: TestServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-service-impl/new',
        component: TestServiceImplUpdateComponent,
        resolve: {
            testServiceImpl: TestServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-service-impl/:id/edit',
        component: TestServiceImplUpdateComponent,
        resolve: {
            testServiceImpl: TestServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testServiceImplPopupRoute: Routes = [
    {
        path: 'test-service-impl/:id/delete',
        component: TestServiceImplDeletePopupComponent,
        resolve: {
            testServiceImpl: TestServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceImpls'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
