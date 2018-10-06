import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithPaginationAndDTO } from 'app/shared/model/entity-with-pagination-and-dto.model';
import { EntityWithPaginationAndDTOService } from './entity-with-pagination-and-dto.service';
import { EntityWithPaginationAndDTOComponent } from './entity-with-pagination-and-dto.component';
import { EntityWithPaginationAndDTODetailComponent } from './entity-with-pagination-and-dto-detail.component';
import { EntityWithPaginationAndDTOUpdateComponent } from './entity-with-pagination-and-dto-update.component';
import { EntityWithPaginationAndDTODeletePopupComponent } from './entity-with-pagination-and-dto-delete-dialog.component';
import { IEntityWithPaginationAndDTO } from 'app/shared/model/entity-with-pagination-and-dto.model';

@Injectable({ providedIn: 'root' })
export class EntityWithPaginationAndDTOResolve implements Resolve<IEntityWithPaginationAndDTO> {
    constructor(private service: EntityWithPaginationAndDTOService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((entityWithPaginationAndDTO: HttpResponse<EntityWithPaginationAndDTO>) => entityWithPaginationAndDTO.body));
        }
        return of(new EntityWithPaginationAndDTO());
    }
}

export const entityWithPaginationAndDTORoute: Routes = [
    {
        path: 'entity-with-pagination-and-dto',
        component: EntityWithPaginationAndDTOComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'EntityWithPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-pagination-and-dto/:id/view',
        component: EntityWithPaginationAndDTODetailComponent,
        resolve: {
            entityWithPaginationAndDTO: EntityWithPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-pagination-and-dto/new',
        component: EntityWithPaginationAndDTOUpdateComponent,
        resolve: {
            entityWithPaginationAndDTO: EntityWithPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-pagination-and-dto/:id/edit',
        component: EntityWithPaginationAndDTOUpdateComponent,
        resolve: {
            entityWithPaginationAndDTO: EntityWithPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithPaginationAndDTOPopupRoute: Routes = [
    {
        path: 'entity-with-pagination-and-dto/:id/delete',
        component: EntityWithPaginationAndDTODeletePopupComponent,
        resolve: {
            entityWithPaginationAndDTO: EntityWithPaginationAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithPaginationAndDTOS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
