import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceImplAndPagination } from 'app/shared/model/entity-with-service-impl-and-pagination.model';
import { EntityWithServiceImplAndPaginationService } from './entity-with-service-impl-and-pagination.service';
import { EntityWithServiceImplAndPaginationComponent } from './entity-with-service-impl-and-pagination.component';
import { EntityWithServiceImplAndPaginationDetailComponent } from './entity-with-service-impl-and-pagination-detail.component';
import { EntityWithServiceImplAndPaginationUpdateComponent } from './entity-with-service-impl-and-pagination-update.component';
import { EntityWithServiceImplAndPaginationDeletePopupComponent } from './entity-with-service-impl-and-pagination-delete-dialog.component';
import { IEntityWithServiceImplAndPagination } from 'app/shared/model/entity-with-service-impl-and-pagination.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndPaginationResolve implements Resolve<IEntityWithServiceImplAndPagination> {
    constructor(private service: EntityWithServiceImplAndPaginationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map(
                        (entityWithServiceImplAndPagination: HttpResponse<EntityWithServiceImplAndPagination>) =>
                            entityWithServiceImplAndPagination.body
                    )
                );
        }
        return of(new EntityWithServiceImplAndPagination());
    }
}

export const entityWithServiceImplAndPaginationRoute: Routes = [
    {
        path: 'entity-with-service-impl-and-pagination',
        component: EntityWithServiceImplAndPaginationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'EntityWithServiceImplAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-and-pagination/:id/view',
        component: EntityWithServiceImplAndPaginationDetailComponent,
        resolve: {
            entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-and-pagination/new',
        component: EntityWithServiceImplAndPaginationUpdateComponent,
        resolve: {
            entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-and-pagination/:id/edit',
        component: EntityWithServiceImplAndPaginationUpdateComponent,
        resolve: {
            entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceImplAndPaginationPopupRoute: Routes = [
    {
        path: 'entity-with-service-impl-and-pagination/:id/delete',
        component: EntityWithServiceImplAndPaginationDeletePopupComponent,
        resolve: {
            entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndPaginations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
