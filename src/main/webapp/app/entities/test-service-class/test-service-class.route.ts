import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestServiceClass } from 'app/shared/model/test-service-class.model';
import { TestServiceClassService } from './test-service-class.service';
import { TestServiceClassComponent } from './test-service-class.component';
import { TestServiceClassDetailComponent } from './test-service-class-detail.component';
import { TestServiceClassUpdateComponent } from './test-service-class-update.component';
import { TestServiceClassDeletePopupComponent } from './test-service-class-delete-dialog.component';
import { ITestServiceClass } from 'app/shared/model/test-service-class.model';

@Injectable({ providedIn: 'root' })
export class TestServiceClassResolve implements Resolve<ITestServiceClass> {
    constructor(private service: TestServiceClassService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testServiceClass: HttpResponse<TestServiceClass>) => testServiceClass.body));
        }
        return of(new TestServiceClass());
    }
}

export const testServiceClassRoute: Routes = [
    {
        path: 'test-service-class',
        component: TestServiceClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-service-class/:id/view',
        component: TestServiceClassDetailComponent,
        resolve: {
            testServiceClass: TestServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-service-class/new',
        component: TestServiceClassUpdateComponent,
        resolve: {
            testServiceClass: TestServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-service-class/:id/edit',
        component: TestServiceClassUpdateComponent,
        resolve: {
            testServiceClass: TestServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testServiceClassPopupRoute: Routes = [
    {
        path: 'test-service-class/:id/delete',
        component: TestServiceClassDeletePopupComponent,
        resolve: {
            testServiceClass: TestServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestServiceClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
