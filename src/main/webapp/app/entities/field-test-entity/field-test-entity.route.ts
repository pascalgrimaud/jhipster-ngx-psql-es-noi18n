import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldTestEntity } from 'app/shared/model/field-test-entity.model';
import { FieldTestEntityService } from './field-test-entity.service';
import { FieldTestEntityComponent } from './field-test-entity.component';
import { FieldTestEntityDetailComponent } from './field-test-entity-detail.component';
import { FieldTestEntityUpdateComponent } from './field-test-entity-update.component';
import { FieldTestEntityDeletePopupComponent } from './field-test-entity-delete-dialog.component';
import { IFieldTestEntity } from 'app/shared/model/field-test-entity.model';

@Injectable({ providedIn: 'root' })
export class FieldTestEntityResolve implements Resolve<IFieldTestEntity> {
    constructor(private service: FieldTestEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fieldTestEntity: HttpResponse<FieldTestEntity>) => fieldTestEntity.body));
        }
        return of(new FieldTestEntity());
    }
}

export const fieldTestEntityRoute: Routes = [
    {
        path: 'field-test-entity',
        component: FieldTestEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-entity/:id/view',
        component: FieldTestEntityDetailComponent,
        resolve: {
            fieldTestEntity: FieldTestEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-entity/new',
        component: FieldTestEntityUpdateComponent,
        resolve: {
            fieldTestEntity: FieldTestEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-entity/:id/edit',
        component: FieldTestEntityUpdateComponent,
        resolve: {
            fieldTestEntity: FieldTestEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestEntityPopupRoute: Routes = [
    {
        path: 'field-test-entity/:id/delete',
        component: FieldTestEntityDeletePopupComponent,
        resolve: {
            fieldTestEntity: FieldTestEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
