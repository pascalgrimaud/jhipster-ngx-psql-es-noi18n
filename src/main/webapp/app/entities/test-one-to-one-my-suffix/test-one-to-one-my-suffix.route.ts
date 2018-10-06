import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { TestOneToOneMySuffixService } from './test-one-to-one-my-suffix.service';
import { TestOneToOneMySuffixComponent } from './test-one-to-one-my-suffix.component';
import { TestOneToOneMySuffixDetailComponent } from './test-one-to-one-my-suffix-detail.component';
import { TestOneToOneMySuffixUpdateComponent } from './test-one-to-one-my-suffix-update.component';
import { TestOneToOneMySuffixDeletePopupComponent } from './test-one-to-one-my-suffix-delete-dialog.component';
import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TestOneToOneMySuffixResolve implements Resolve<ITestOneToOneMySuffix> {
    constructor(private service: TestOneToOneMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testOneToOne: HttpResponse<TestOneToOneMySuffix>) => testOneToOne.body));
        }
        return of(new TestOneToOneMySuffix());
    }
}

export const testOneToOneRoute: Routes = [
    {
        path: 'test-one-to-one-my-suffix',
        component: TestOneToOneMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestOneToOnes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-one-to-one-my-suffix/:id/view',
        component: TestOneToOneMySuffixDetailComponent,
        resolve: {
            testOneToOne: TestOneToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestOneToOnes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-one-to-one-my-suffix/new',
        component: TestOneToOneMySuffixUpdateComponent,
        resolve: {
            testOneToOne: TestOneToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestOneToOnes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-one-to-one-my-suffix/:id/edit',
        component: TestOneToOneMySuffixUpdateComponent,
        resolve: {
            testOneToOne: TestOneToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestOneToOnes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testOneToOnePopupRoute: Routes = [
    {
        path: 'test-one-to-one-my-suffix/:id/delete',
        component: TestOneToOneMySuffixDeletePopupComponent,
        resolve: {
            testOneToOne: TestOneToOneMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestOneToOnes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
