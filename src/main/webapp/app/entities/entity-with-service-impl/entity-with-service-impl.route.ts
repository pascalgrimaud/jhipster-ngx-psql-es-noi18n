import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';
import { EntityWithServiceImplService } from './entity-with-service-impl.service';
import { EntityWithServiceImplComponent } from './entity-with-service-impl.component';
import { EntityWithServiceImplDetailComponent } from './entity-with-service-impl-detail.component';
import { EntityWithServiceImplUpdateComponent } from './entity-with-service-impl-update.component';
import { EntityWithServiceImplDeletePopupComponent } from './entity-with-service-impl-delete-dialog.component';
import { IEntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplResolve implements Resolve<IEntityWithServiceImpl> {
    constructor(private service: EntityWithServiceImplService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((entityWithServiceImpl: HttpResponse<EntityWithServiceImpl>) => entityWithServiceImpl.body));
        }
        return of(new EntityWithServiceImpl());
    }
}

export const entityWithServiceImplRoute: Routes = [
    {
        path: 'entity-with-service-impl',
        component: EntityWithServiceImplComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl/:id/view',
        component: EntityWithServiceImplDetailComponent,
        resolve: {
            entityWithServiceImpl: EntityWithServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl/new',
        component: EntityWithServiceImplUpdateComponent,
        resolve: {
            entityWithServiceImpl: EntityWithServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-impl/:id/edit',
        component: EntityWithServiceImplUpdateComponent,
        resolve: {
            entityWithServiceImpl: EntityWithServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImpls'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceImplPopupRoute: Routes = [
    {
        path: 'entity-with-service-impl/:id/delete',
        component: EntityWithServiceImplDeletePopupComponent,
        resolve: {
            entityWithServiceImpl: EntityWithServiceImplResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceImpls'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
