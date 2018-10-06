import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';
import { EntityWithServiceClassAndDTOService } from './entity-with-service-class-and-dto.service';
import { EntityWithServiceClassAndDTOComponent } from './entity-with-service-class-and-dto.component';
import { EntityWithServiceClassAndDTODetailComponent } from './entity-with-service-class-and-dto-detail.component';
import { EntityWithServiceClassAndDTOUpdateComponent } from './entity-with-service-class-and-dto-update.component';
import { EntityWithServiceClassAndDTODeletePopupComponent } from './entity-with-service-class-and-dto-delete-dialog.component';
import { IEntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassAndDTOResolve implements Resolve<IEntityWithServiceClassAndDTO> {
    constructor(private service: EntityWithServiceClassAndDTOService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((entityWithServiceClassAndDTO: HttpResponse<EntityWithServiceClassAndDTO>) => entityWithServiceClassAndDTO.body));
        }
        return of(new EntityWithServiceClassAndDTO());
    }
}

export const entityWithServiceClassAndDTORoute: Routes = [
    {
        path: 'entity-with-service-class-and-dto',
        component: EntityWithServiceClassAndDTOComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-and-dto/:id/view',
        component: EntityWithServiceClassAndDTODetailComponent,
        resolve: {
            entityWithServiceClassAndDTO: EntityWithServiceClassAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-and-dto/new',
        component: EntityWithServiceClassAndDTOUpdateComponent,
        resolve: {
            entityWithServiceClassAndDTO: EntityWithServiceClassAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class-and-dto/:id/edit',
        component: EntityWithServiceClassAndDTOUpdateComponent,
        resolve: {
            entityWithServiceClassAndDTO: EntityWithServiceClassAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndDTOS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceClassAndDTOPopupRoute: Routes = [
    {
        path: 'entity-with-service-class-and-dto/:id/delete',
        component: EntityWithServiceClassAndDTODeletePopupComponent,
        resolve: {
            entityWithServiceClassAndDTO: EntityWithServiceClassAndDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClassAndDTOS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
