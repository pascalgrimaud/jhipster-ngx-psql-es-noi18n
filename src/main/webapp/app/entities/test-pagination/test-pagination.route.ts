import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestPagination } from 'app/shared/model/test-pagination.model';
import { TestPaginationService } from './test-pagination.service';
import { TestPaginationComponent } from './test-pagination.component';
import { TestPaginationDetailComponent } from './test-pagination-detail.component';
import { TestPaginationUpdateComponent } from './test-pagination-update.component';
import { TestPaginationDeletePopupComponent } from './test-pagination-delete-dialog.component';
import { ITestPagination } from 'app/shared/model/test-pagination.model';

@Injectable({ providedIn: 'root' })
export class TestPaginationResolve implements Resolve<ITestPagination> {
    constructor(private service: TestPaginationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testPagination: HttpResponse<TestPagination>) => testPagination.body));
        }
        return of(new TestPagination());
    }
}

export const testPaginationRoute: Routes = [
    {
        path: 'test-pagination',
        component: TestPaginationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'TestPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-pagination/:id/view',
        component: TestPaginationDetailComponent,
        resolve: {
            testPagination: TestPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-pagination/new',
        component: TestPaginationUpdateComponent,
        resolve: {
            testPagination: TestPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-pagination/:id/edit',
        component: TestPaginationUpdateComponent,
        resolve: {
            testPagination: TestPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaginations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testPaginationPopupRoute: Routes = [
    {
        path: 'test-pagination/:id/delete',
        component: TestPaginationDeletePopupComponent,
        resolve: {
            testPagination: TestPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestPaginations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
