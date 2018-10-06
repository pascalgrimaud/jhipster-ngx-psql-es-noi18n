import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { TestEntityMySuffixAltService } from './test-entity-my-suffix-alt.service';
import { TestEntityMySuffixAltComponent } from './test-entity-my-suffix-alt.component';
import { TestEntityMySuffixAltDetailComponent } from './test-entity-my-suffix-alt-detail.component';
import { TestEntityMySuffixAltUpdateComponent } from './test-entity-my-suffix-alt-update.component';
import { TestEntityMySuffixAltDeletePopupComponent } from './test-entity-my-suffix-alt-delete-dialog.component';
import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';

@Injectable({ providedIn: 'root' })
export class TestEntityMySuffixAltResolve implements Resolve<ITestEntityMySuffixAlt> {
    constructor(private service: TestEntityMySuffixAltService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((testEntity: HttpResponse<TestEntityMySuffixAlt>) => testEntity.body));
        }
        return of(new TestEntityMySuffixAlt());
    }
}

export const testEntityRoute: Routes = [
    {
        path: 'test-entity-my-suffix-alt',
        component: TestEntityMySuffixAltComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-entity-my-suffix-alt/:id/view',
        component: TestEntityMySuffixAltDetailComponent,
        resolve: {
            testEntity: TestEntityMySuffixAltResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-entity-my-suffix-alt/new',
        component: TestEntityMySuffixAltUpdateComponent,
        resolve: {
            testEntity: TestEntityMySuffixAltResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'test-entity-my-suffix-alt/:id/edit',
        component: TestEntityMySuffixAltUpdateComponent,
        resolve: {
            testEntity: TestEntityMySuffixAltResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testEntityPopupRoute: Routes = [
    {
        path: 'test-entity-my-suffix-alt/:id/delete',
        component: TestEntityMySuffixAltDeletePopupComponent,
        resolve: {
            testEntity: TestEntityMySuffixAltResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TestEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
