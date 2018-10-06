import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';
import { FieldTestMapstructEntityService } from './field-test-mapstruct-entity.service';
import { FieldTestMapstructEntityComponent } from './field-test-mapstruct-entity.component';
import { FieldTestMapstructEntityDetailComponent } from './field-test-mapstruct-entity-detail.component';
import { FieldTestMapstructEntityUpdateComponent } from './field-test-mapstruct-entity-update.component';
import { FieldTestMapstructEntityDeletePopupComponent } from './field-test-mapstruct-entity-delete-dialog.component';
import { IFieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';

@Injectable({ providedIn: 'root' })
export class FieldTestMapstructEntityResolve implements Resolve<IFieldTestMapstructEntity> {
    constructor(private service: FieldTestMapstructEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((fieldTestMapstructEntity: HttpResponse<FieldTestMapstructEntity>) => fieldTestMapstructEntity.body));
        }
        return of(new FieldTestMapstructEntity());
    }
}

export const fieldTestMapstructEntityRoute: Routes = [
    {
        path: 'field-test-mapstruct-entity',
        component: FieldTestMapstructEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestMapstructEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-mapstruct-entity/:id/view',
        component: FieldTestMapstructEntityDetailComponent,
        resolve: {
            fieldTestMapstructEntity: FieldTestMapstructEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestMapstructEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-mapstruct-entity/new',
        component: FieldTestMapstructEntityUpdateComponent,
        resolve: {
            fieldTestMapstructEntity: FieldTestMapstructEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestMapstructEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-mapstruct-entity/:id/edit',
        component: FieldTestMapstructEntityUpdateComponent,
        resolve: {
            fieldTestMapstructEntity: FieldTestMapstructEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestMapstructEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestMapstructEntityPopupRoute: Routes = [
    {
        path: 'field-test-mapstruct-entity/:id/delete',
        component: FieldTestMapstructEntityDeletePopupComponent,
        resolve: {
            fieldTestMapstructEntity: FieldTestMapstructEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestMapstructEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
