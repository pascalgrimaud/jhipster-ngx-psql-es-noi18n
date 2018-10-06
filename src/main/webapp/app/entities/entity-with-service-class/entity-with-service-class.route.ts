import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';
import { EntityWithServiceClassService } from './entity-with-service-class.service';
import { EntityWithServiceClassComponent } from './entity-with-service-class.component';
import { EntityWithServiceClassDetailComponent } from './entity-with-service-class-detail.component';
import { EntityWithServiceClassUpdateComponent } from './entity-with-service-class-update.component';
import { EntityWithServiceClassDeletePopupComponent } from './entity-with-service-class-delete-dialog.component';
import { IEntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassResolve implements Resolve<IEntityWithServiceClass> {
    constructor(private service: EntityWithServiceClassService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((entityWithServiceClass: HttpResponse<EntityWithServiceClass>) => entityWithServiceClass.body));
        }
        return of(new EntityWithServiceClass());
    }
}

export const entityWithServiceClassRoute: Routes = [
    {
        path: 'entity-with-service-class',
        component: EntityWithServiceClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class/:id/view',
        component: EntityWithServiceClassDetailComponent,
        resolve: {
            entityWithServiceClass: EntityWithServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class/new',
        component: EntityWithServiceClassUpdateComponent,
        resolve: {
            entityWithServiceClass: EntityWithServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'entity-with-service-class/:id/edit',
        component: EntityWithServiceClassUpdateComponent,
        resolve: {
            entityWithServiceClass: EntityWithServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClasses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceClassPopupRoute: Routes = [
    {
        path: 'entity-with-service-class/:id/delete',
        component: EntityWithServiceClassDeletePopupComponent,
        resolve: {
            entityWithServiceClass: EntityWithServiceClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EntityWithServiceClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
