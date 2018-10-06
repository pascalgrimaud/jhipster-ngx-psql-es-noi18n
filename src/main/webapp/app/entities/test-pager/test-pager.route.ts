import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestPager } from 'app/shared/model/test-pager.model';
import { TestPagerService } from './test-pager.service';
import { TestPagerComponent } from './test-pager.component';
import { TestPagerDetailComponent } from './test-pager-detail.component';
import { TestPagerUpdateComponent } from './test-pager-update.component';
import { TestPagerDeletePopupComponent } from './test-pager-delete-dialog.component';
import { ITestPager } from 'app/shared/model/test-pager.model';

@Injectable({ providedIn: 'root' })
export class TestPagerResolve implements Resolve<ITestPager> {
    constructor(private service: TestPagerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testPager: HttpResponse<TestPager>) => testPager.body));
        }
        return of(new TestPager());
    }
}

export const testPagerRoute: Routes = [
    {
        path: 'test-pager',
        component: TestPagerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'TestPagers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-pager/:id/view',
        component: TestPagerDetailComponent,
        resolve: {
            testPager: TestPagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPagers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-pager/new',
        component: TestPagerUpdateComponent,
        resolve: {
            testPager: TestPagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPagers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-pager/:id/edit',
        component: TestPagerUpdateComponent,
        resolve: {
            testPager: TestPagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPagers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testPagerPopupRoute: Routes = [
    {
        path: 'test-pager/:id/delete',
        component: TestPagerDeletePopupComponent,
        resolve: {
            testPager: TestPagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPagers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
