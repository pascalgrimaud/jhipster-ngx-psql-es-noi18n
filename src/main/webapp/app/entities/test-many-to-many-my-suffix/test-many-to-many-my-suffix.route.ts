import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { TestManyToManyMySuffixService } from './test-many-to-many-my-suffix.service';
import { TestManyToManyMySuffixComponent } from './test-many-to-many-my-suffix.component';
import { TestManyToManyMySuffixDetailComponent } from './test-many-to-many-my-suffix-detail.component';
import { TestManyToManyMySuffixUpdateComponent } from './test-many-to-many-my-suffix-update.component';
import { TestManyToManyMySuffixDeletePopupComponent } from './test-many-to-many-my-suffix-delete-dialog.component';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TestManyToManyMySuffixResolve implements Resolve<ITestManyToManyMySuffix> {
    constructor(private service: TestManyToManyMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testManyToMany: HttpResponse<TestManyToManyMySuffix>) => testManyToMany.body));
        }
        return of(new TestManyToManyMySuffix());
    }
}

export const testManyToManyRoute: Routes = [
    {
        path: 'test-many-to-many-my-suffix',
        component: TestManyToManyMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToManies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-to-many-my-suffix/:id/view',
        component: TestManyToManyMySuffixDetailComponent,
        resolve: {
            testManyToMany: TestManyToManyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToManies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-to-many-my-suffix/new',
        component: TestManyToManyMySuffixUpdateComponent,
        resolve: {
            testManyToMany: TestManyToManyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToManies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-to-many-my-suffix/:id/edit',
        component: TestManyToManyMySuffixUpdateComponent,
        resolve: {
            testManyToMany: TestManyToManyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToManies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testManyToManyPopupRoute: Routes = [
    {
        path: 'test-many-to-many-my-suffix/:id/delete',
        component: TestManyToManyMySuffixDeletePopupComponent,
        resolve: {
            testManyToMany: TestManyToManyMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToManies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
