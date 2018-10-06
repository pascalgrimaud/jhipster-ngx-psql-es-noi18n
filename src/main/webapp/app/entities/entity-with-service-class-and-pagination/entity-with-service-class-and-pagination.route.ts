import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceClassAndPagination } from 'app/shared/model/entity-with-service-class-and-pagination.model';
import { EntityWithServiceClassAndPaginationService } from './entity-with-service-class-and-pagination.service';
import { EntityWithServiceClassAndPaginationComponent } from './entity-with-service-class-and-pagination.component';
import { EntityWithServiceClassAndPaginationDetailComponent } from './entity-with-service-class-and-pagination-detail.component';
import { EntityWithServiceClassAndPaginationUpdateComponent } from './entity-with-service-class-and-pagination-update.component';
import { EntityWithServiceClassAndPaginationDeletePopupComponent } from './entity-with-service-class-and-pagination-delete-dialog.component';
import { IEntityWithServiceClassAndPagination } from 'app/shared/model/entity-with-service-class-and-pagination.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassAndPaginationResolve implements Resolve<IEntityWithServiceClassAndPagination> {
    constructor(private service: EntityWithServiceClassAndPaginationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map(
                        (entityWithServiceClassAndPagination: HttpResponse<EntityWithServiceClassAndPagination>) =>
                            entityWithServiceClassAndPagination.body
                    )
                );
        }
        return of(new EntityWithServiceClassAndPagination());
    }
}

export const entityWithServiceClassAndPaginationRoute: Routes = [
    {
        path: 'entity-with-service-class-and-pagination',
        component: EntityWithServiceClassAndPaginationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'EntityWithServiceClassAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-and-pagination/:id/view',
        component: EntityWithServiceClassAndPaginationDetailComponent,
        resolve: {
            entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-and-pagination/new',
        component: EntityWithServiceClassAndPaginationUpdateComponent,
        resolve: {
            entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-and-pagination/:id/edit',
        component: EntityWithServiceClassAndPaginationUpdateComponent,
        resolve: {
            entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndPaginations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceClassAndPaginationPopupRoute: Routes = [
    {
        path: 'entity-with-service-class-and-pagination/:id/delete',
        component: EntityWithServiceClassAndPaginationDeletePopupComponent,
        resolve: {
            entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndPaginations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
