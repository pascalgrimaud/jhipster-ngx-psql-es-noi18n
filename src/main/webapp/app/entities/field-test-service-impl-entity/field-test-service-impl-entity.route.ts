import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from './field-test-service-impl-entity.service';
import { FieldTestServiceImplEntityComponent } from './field-test-service-impl-entity.component';
import { FieldTestServiceImplEntityDetailComponent } from './field-test-service-impl-entity-detail.component';
import { FieldTestServiceImplEntityUpdateComponent } from './field-test-service-impl-entity-update.component';
import { FieldTestServiceImplEntityDeletePopupComponent } from './field-test-service-impl-entity-delete-dialog.component';
import { IFieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';

@Injectable({ providedIn: 'root' })
export class FieldTestServiceImplEntityResolve implements Resolve<IFieldTestServiceImplEntity> {
    constructor(private service: FieldTestServiceImplEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((fieldTestServiceImplEntity: HttpResponse<FieldTestServiceImplEntity>) => fieldTestServiceImplEntity.body));
        }
        return of(new FieldTestServiceImplEntity());
    }
}

export const fieldTestServiceImplEntityRoute: Routes = [
    {
        path: 'field-test-service-impl-entity',
        component: FieldTestServiceImplEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceImplEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-service-impl-entity/:id/view',
        component: FieldTestServiceImplEntityDetailComponent,
        resolve: {
            fieldTestServiceImplEntity: FieldTestServiceImplEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceImplEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-service-impl-entity/new',
        component: FieldTestServiceImplEntityUpdateComponent,
        resolve: {
            fieldTestServiceImplEntity: FieldTestServiceImplEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceImplEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-service-impl-entity/:id/edit',
        component: FieldTestServiceImplEntityUpdateComponent,
        resolve: {
            fieldTestServiceImplEntity: FieldTestServiceImplEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceImplEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestServiceImplEntityPopupRoute: Routes = [
    {
        path: 'field-test-service-impl-entity/:id/delete',
        component: FieldTestServiceImplEntityDeletePopupComponent,
        resolve: {
            fieldTestServiceImplEntity: FieldTestServiceImplEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceImplEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
