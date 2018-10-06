import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';
import { TestInfiniteScrollService } from './test-infinite-scroll.service';
import { TestInfiniteScrollComponent } from './test-infinite-scroll.component';
import { TestInfiniteScrollDetailComponent } from './test-infinite-scroll-detail.component';
import { TestInfiniteScrollUpdateComponent } from './test-infinite-scroll-update.component';
import { TestInfiniteScrollDeletePopupComponent } from './test-infinite-scroll-delete-dialog.component';
import { ITestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';

@Injectable({ providedIn: 'root' })
export class TestInfiniteScrollResolve implements Resolve<ITestInfiniteScroll> {
    constructor(private service: TestInfiniteScrollService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testInfiniteScroll: HttpResponse<TestInfiniteScroll>) => testInfiniteScroll.body));
        }
        return of(new TestInfiniteScroll());
    }
}

export const testInfiniteScrollRoute: Routes = [
    {
        path: 'test-infinite-scroll',
        component: TestInfiniteScrollComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestInfiniteScrolls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-infinite-scroll/:id/view',
        component: TestInfiniteScrollDetailComponent,
        resolve: {
            testInfiniteScroll: TestInfiniteScrollResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestInfiniteScrolls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-infinite-scroll/new',
        component: TestInfiniteScrollUpdateComponent,
        resolve: {
            testInfiniteScroll: TestInfiniteScrollResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestInfiniteScrolls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-infinite-scroll/:id/edit',
        component: TestInfiniteScrollUpdateComponent,
        resolve: {
            testInfiniteScroll: TestInfiniteScrollResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestInfiniteScrolls'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testInfiniteScrollPopupRoute: Routes = [
    {
        path: 'test-infinite-scroll/:id/delete',
        component: TestInfiniteScrollDeletePopupComponent,
        resolve: {
            testInfiniteScroll: TestInfiniteScrollResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestInfiniteScrolls'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
