import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';
import { TestManyRelPaginDTOMySuffixService } from './test-many-rel-pagin-dto-my-suffix.service';
import { TestManyRelPaginDTOMySuffixComponent } from './test-many-rel-pagin-dto-my-suffix.component';
import { TestManyRelPaginDTOMySuffixDetailComponent } from './test-many-rel-pagin-dto-my-suffix-detail.component';
import { TestManyRelPaginDTOMySuffixUpdateComponent } from './test-many-rel-pagin-dto-my-suffix-update.component';
import { TestManyRelPaginDTOMySuffixDeletePopupComponent } from './test-many-rel-pagin-dto-my-suffix-delete-dialog.component';
import { ITestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TestManyRelPaginDTOMySuffixResolve implements Resolve<ITestManyRelPaginDTOMySuffix> {
    constructor(private service: TestManyRelPaginDTOMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((testManyRelPaginDTO: HttpResponse<TestManyRelPaginDTOMySuffix>) => testManyRelPaginDTO.body));
        }
        return of(new TestManyRelPaginDTOMySuffix());
    }
}

export const testManyRelPaginDTORoute: Routes = [
    {
        path: 'test-many-rel-pagin-dto-my-suffix',
        component: TestManyRelPaginDTOMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'TestManyRelPaginDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-rel-pagin-dto-my-suffix/:id/view',
        component: TestManyRelPaginDTOMySuffixDetailComponent,
        resolve: {
            testManyRelPaginDTO: TestManyRelPaginDTOMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyRelPaginDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-rel-pagin-dto-my-suffix/new',
        component: TestManyRelPaginDTOMySuffixUpdateComponent,
        resolve: {
            testManyRelPaginDTO: TestManyRelPaginDTOMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyRelPaginDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-many-rel-pagin-dto-my-suffix/:id/edit',
        component: TestManyRelPaginDTOMySuffixUpdateComponent,
        resolve: {
            testManyRelPaginDTO: TestManyRelPaginDTOMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyRelPaginDTOS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testManyRelPaginDTOPopupRoute: Routes = [
    {
        path: 'test-many-rel-pagin-dto-my-suffix/:id/delete',
        component: TestManyRelPaginDTOMySuffixDeletePopupComponent,
        resolve: {
            testManyRelPaginDTO: TestManyRelPaginDTOMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestManyRelPaginDTOS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
