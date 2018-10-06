import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceImplPaginationAndDTO } from 'app/shared/model/entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOService } from './entity-with-service-impl-pagination-and-dto.service';
import { EntityWithServiceImplPaginationAndDTOComponent } from './entity-with-service-impl-pagination-and-dto.component';
import { EntityWithServiceImplPaginationAndDTODetailComponent } from './entity-with-service-impl-pagination-and-dto-detail.component';
import { EntityWithServiceImplPaginationAndDTOUpdateComponent } from './entity-with-service-impl-pagination-and-dto-update.component';
import { EntityWithServiceImplPaginationAndDTODeletePopupComponent } from './entity-with-service-impl-pagination-and-dto-delete-dialog.component';
import { IEntityWithServiceImplPaginationAndDTO } from 'app/shared/model/entity-with-service-impl-pagination-and-dto.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplPaginationAndDTOResolve implements Resolve<IEntityWithServiceImplPaginationAndDTO> {
    constructor(private service: EntityWithServiceImplPaginationAndDTOService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map(
                        (entityWithServiceImplPaginationAndDTO: HttpResponse<EntityWithServiceImplPaginationAndDTO>) =>
                            entityWithServiceImplPaginationAndDTO.body
                    )
                );
        }
        return of(new EntityWithServiceImplPaginationAndDTO());
    }
}

export const entityWithServiceImplPaginationAndDTORoute: Routes = [
    {
        path: 'entity-with-service-impl-pagination-and-dto',
        component: EntityWithServiceImplPaginationAndDTOComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'EntityWithServiceImplPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-pagination-and-dto/:id/view',
        component: EntityWithServiceImplPaginationAndDTODetailComponent,
        resolve: {
            entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-pagination-and-dto/new',
        component: EntityWithServiceImplPaginationAndDTOUpdateComponent,
        resolve: {
            entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-pagination-and-dto/:id/edit',
        component: EntityWithServiceImplPaginationAndDTOUpdateComponent,
        resolve: {
            entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceImplPaginationAndDTOPopupRoute: Routes = [
    {
        path: 'entity-with-service-impl-pagination-and-dto/:id/delete',
        component: EntityWithServiceImplPaginationAndDTODeletePopupComponent,
        resolve: {
            entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
