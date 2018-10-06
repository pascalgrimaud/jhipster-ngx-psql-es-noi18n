import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';
import { EntityWithServiceImplAndDTOService } from './entity-with-service-impl-and-dto.service';
import { EntityWithServiceImplAndDTOComponent } from './entity-with-service-impl-and-dto.component';
import { EntityWithServiceImplAndDTODetailComponent } from './entity-with-service-impl-and-dto-detail.component';
import { EntityWithServiceImplAndDTOUpdateComponent } from './entity-with-service-impl-and-dto-update.component';
import { EntityWithServiceImplAndDTODeletePopupComponent } from './entity-with-service-impl-and-dto-delete-dialog.component';
import { IEntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndDTOResolve implements Resolve<IEntityWithServiceImplAndDTO> {
    constructor(private service: EntityWithServiceImplAndDTOService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((entityWithServiceImplAndDTO: HttpResponse<EntityWithServiceImplAndDTO>) => entityWithServiceImplAndDTO.body));
        }
        return of(new EntityWithServiceImplAndDTO());
    }
}

export const entityWithServiceImplAndDTORoute: Routes = [
    {
        path: 'entity-with-service-impl-and-dto',
        component: EntityWithServiceImplAndDTOComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-and-dto/:id/view',
        component: EntityWithServiceImplAndDTODetailComponent,
        resolve: {
            entityWithServiceImplAndDTO: EntityWithServiceImplAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-and-dto/new',
        component: EntityWithServiceImplAndDTOUpdateComponent,
        resolve: {
            entityWithServiceImplAndDTO: EntityWithServiceImplAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl-and-dto/:id/edit',
        component: EntityWithServiceImplAndDTOUpdateComponent,
        resolve: {
            entityWithServiceImplAndDTO: EntityWithServiceImplAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceImplAndDTOPopupRoute: Routes = [
    {
        path: 'entity-with-service-impl-and-dto/:id/delete',
        component: EntityWithServiceImplAndDTODeletePopupComponent,
        resolve: {
            entityWithServiceImplAndDTO: EntityWithServiceImplAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImplAndDTOS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
