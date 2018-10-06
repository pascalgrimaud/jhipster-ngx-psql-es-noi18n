import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithDTO } from 'app/shared/model/entity-with-dto.model';
import { EntityWithDTOService } from './entity-with-dto.service';
import { EntityWithDTOComponent } from './entity-with-dto.component';
import { EntityWithDTODetailComponent } from './entity-with-dto-detail.component';
import { EntityWithDTOUpdateComponent } from './entity-with-dto-update.component';
import { EntityWithDTODeletePopupComponent } from './entity-with-dto-delete-dialog.component';
import { IEntityWithDTO } from 'app/shared/model/entity-with-dto.model';

@Injectable({ providedIn: 'root' })
export class EntityWithDTOResolve implements Resolve<IEntityWithDTO> {
    constructor(private service: EntityWithDTOService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((entityWithDTO: HttpResponse<EntityWithDTO>) => entityWithDTO.body));
        }
        return of(new EntityWithDTO());
    }
}

export const entityWithDTORoute: Routes = [
    {
        path: 'entity-with-dto',
        component: EntityWithDTOComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-dto/:id/view',
        component: EntityWithDTODetailComponent,
        resolve: {
            entityWithDTO: EntityWithDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-dto/new',
        component: EntityWithDTOUpdateComponent,
        resolve: {
            entityWithDTO: EntityWithDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithDTOS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-dto/:id/edit',
        component: EntityWithDTOUpdateComponent,
        resolve: {
            entityWithDTO: EntityWithDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithDTOS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithDTOPopupRoute: Routes = [
    {
        path: 'entity-with-dto/:id/delete',
        component: EntityWithDTODeletePopupComponent,
        resolve: {
            entityWithDTO: EntityWithDTOResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithDTOS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
