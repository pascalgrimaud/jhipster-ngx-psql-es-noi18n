import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithPagination } from 'app/shared/model/entity-with-pagination.model';
import { EntityWithPaginationService } from './entity-with-pagination.service';
import { EntityWithPaginationComponent } from './entity-with-pagination.component';
import { EntityWithPaginationDetailComponent } from './entity-with-pagination-detail.component';
import { EntityWithPaginationUpdateComponent } from './entity-with-pagination-update.component';
import { EntityWithPaginationDeletePopupComponent } from './entity-with-pagination-delete-dialog.component';
import { IEntityWithPagination } from 'app/shared/model/entity-with-pagination.model';

@Injectable({ providedIn: 'root' })
export class EntityWithPaginationResolve implements Resolve<IEntityWithPagination> {
    constructor(private service: EntityWithPaginationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((entityWithPagination: HttpResponse<EntityWithPagination>) => entityWithPagination.body));
        }
        return of(new EntityWithPagination());
    }
}

export const entityWithPaginationRoute: Routes = [
    {
        path: 'entity-with-pagination',
        component: EntityWithPaginationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'EntityWithPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-pagination/:id/view',
        component: EntityWithPaginationDetailComponent,
        resolve: {
            entityWithPagination: EntityWithPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-pagination/new',
        component: EntityWithPaginationUpdateComponent,
        resolve: {
            entityWithPagination: EntityWithPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-pagination/:id/edit',
        component: EntityWithPaginationUpdateComponent,
        resolve: {
            entityWithPagination: EntityWithPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithPaginationPopupRoute: Routes = [
    {
        path: 'entity-with-pagination/:id/delete',
        component: EntityWithPaginationDeletePopupComponent,
        resolve: {
            entityWithPagination: EntityWithPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
