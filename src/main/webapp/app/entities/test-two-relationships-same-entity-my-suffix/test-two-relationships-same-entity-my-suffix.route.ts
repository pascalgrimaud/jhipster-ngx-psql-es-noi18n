import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';
import { TestTwoRelationshipsSameEntityMySuffixService } from './test-two-relationships-same-entity-my-suffix.service';
import { TestTwoRelationshipsSameEntityMySuffixComponent } from './test-two-relationships-same-entity-my-suffix.component';
import { TestTwoRelationshipsSameEntityMySuffixDetailComponent } from './test-two-relationships-same-entity-my-suffix-detail.component';
import { TestTwoRelationshipsSameEntityMySuffixUpdateComponent } from './test-two-relationships-same-entity-my-suffix-update.component';
import { TestTwoRelationshipsSameEntityMySuffixDeletePopupComponent } from './test-two-relationships-same-entity-my-suffix-delete-dialog.component';
import { ITestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TestTwoRelationshipsSameEntityMySuffixResolve implements Resolve<ITestTwoRelationshipsSameEntityMySuffix> {
    constructor(private service: TestTwoRelationshipsSameEntityMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map(
                        (testTwoRelationshipsSameEntity: HttpResponse<TestTwoRelationshipsSameEntityMySuffix>) =>
                            testTwoRelationshipsSameEntity.body
                    )
                );
        }
        return of(new TestTwoRelationshipsSameEntityMySuffix());
    }
}

export const testTwoRelationshipsSameEntityRoute: Routes = [
    {
        path: 'test-two-relationships-same-entity-my-suffix',
        component: TestTwoRelationshipsSameEntityMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTwoRelationshipsSameEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-two-relationships-same-entity-my-suffix/:id/view',
        component: TestTwoRelationshipsSameEntityMySuffixDetailComponent,
        resolve: {
            testTwoRelationshipsSameEntity: TestTwoRelationshipsSameEntityMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTwoRelationshipsSameEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-two-relationships-same-entity-my-suffix/new',
        component: TestTwoRelationshipsSameEntityMySuffixUpdateComponent,
        resolve: {
            testTwoRelationshipsSameEntity: TestTwoRelationshipsSameEntityMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTwoRelationshipsSameEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-two-relationships-same-entity-my-suffix/:id/edit',
        component: TestTwoRelationshipsSameEntityMySuffixUpdateComponent,
        resolve: {
            testTwoRelationshipsSameEntity: TestTwoRelationshipsSameEntityMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTwoRelationshipsSameEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testTwoRelationshipsSameEntityPopupRoute: Routes = [
    {
        path: 'test-two-relationships-same-entity-my-suffix/:id/delete',
        component: TestTwoRelationshipsSameEntityMySuffixDeletePopupComponent,
        resolve: {
            testTwoRelationshipsSameEntity: TestTwoRelationshipsSameEntityMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestTwoRelationshipsSameEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
