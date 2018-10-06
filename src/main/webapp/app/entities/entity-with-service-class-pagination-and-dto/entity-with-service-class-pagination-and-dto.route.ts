import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceClassPaginationAndDTO } from 'app/shared/model/entity-with-service-class-pagination-and-dto.model';
import { EntityWithServiceClassPaginationAndDTOService } from './entity-with-service-class-pagination-and-dto.service';
import { EntityWithServiceClassPaginationAndDTOComponent } from './entity-with-service-class-pagination-and-dto.component';
import { EntityWithServiceClassPaginationAndDTODetailComponent } from './entity-with-service-class-pagination-and-dto-detail.component';
import { EntityWithServiceClassPaginationAndDTOUpdateComponent } from './entity-with-service-class-pagination-and-dto-update.component';
import { EntityWithServiceClassPaginationAndDTODeletePopupComponent } from './entity-with-service-class-pagination-and-dto-delete-dialog.component';
import { IEntityWithServiceClassPaginationAndDTO } from 'app/shared/model/entity-with-service-class-pagination-and-dto.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassPaginationAndDTOResolve implements Resolve<IEntityWithServiceClassPaginationAndDTO> {
    constructor(private service: EntityWithServiceClassPaginationAndDTOService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map(
                        (entityWithServiceClassPaginationAndDTO: HttpResponse<EntityWithServiceClassPaginationAndDTO>) =>
                            entityWithServiceClassPaginationAndDTO.body
                    )
                );
        }
        return of(new EntityWithServiceClassPaginationAndDTO());
    }
}

export const entityWithServiceClassPaginationAndDTORoute: Routes = [
    {
        path: 'entity-with-service-class-pagination-and-dto',
        component: EntityWithServiceClassPaginationAndDTOComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'EntityWithServiceClassPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-pagination-and-dto/:id/view',
        component: EntityWithServiceClassPaginationAndDTODetailComponent,
        resolve: {
            entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-pagination-and-dto/new',
        component: EntityWithServiceClassPaginationAndDTOUpdateComponent,
        resolve: {
            entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-pagination-and-dto/:id/edit',
        component: EntityWithServiceClassPaginationAndDTOUpdateComponent,
        resolve: {
            entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceClassPaginationAndDTOPopupRoute: Routes = [
    {
        path: 'entity-with-service-class-pagination-and-dto/:id/delete',
        component: EntityWithServiceClassPaginationAndDTODeletePopupComponent,
        resolve: {
            entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
