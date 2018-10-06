import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';
import { TestManyToOneMySuffixService } from './test-many-to-one-my-suffix.service';
import { TestManyToOneMySuffixComponent } from './test-many-to-one-my-suffix.component';
import { TestManyToOneMySuffixDetailComponent } from './test-many-to-one-my-suffix-detail.component';
import { TestManyToOneMySuffixUpdateComponent } from './test-many-to-one-my-suffix-update.component';
import { TestManyToOneMySuffixDeletePopupComponent } from './test-many-to-one-my-suffix-delete-dialog.component';
import { ITestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TestManyToOneMySuffixResolve implements Resolve<ITestManyToOneMySuffix> {
    constructor(private service: TestManyToOneMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testManyToOne: HttpResponse<TestManyToOneMySuffix>) => testManyToOne.body));
        }
        return of(new TestManyToOneMySuffix());
    }
}

export const testManyToOneRoute: Routes = [
    {
        path: 'test-many-to-one-my-suffix',
        component: TestManyToOneMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToOnes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-to-one-my-suffix/:id/view',
        component: TestManyToOneMySuffixDetailComponent,
        resolve: {
            testManyToOne: TestManyToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToOnes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-to-one-my-suffix/new',
        component: TestManyToOneMySuffixUpdateComponent,
        resolve: {
            testManyToOne: TestManyToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToOnes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-to-one-my-suffix/:id/edit',
        component: TestManyToOneMySuffixUpdateComponent,
        resolve: {
            testManyToOne: TestManyToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToOnes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testManyToOnePopupRoute: Routes = [
    {
        path: 'test-many-to-one-my-suffix/:id/delete',
        component: TestManyToOneMySuffixDeletePopupComponent,
        resolve: {
            testManyToOne: TestManyToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyToOnes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
