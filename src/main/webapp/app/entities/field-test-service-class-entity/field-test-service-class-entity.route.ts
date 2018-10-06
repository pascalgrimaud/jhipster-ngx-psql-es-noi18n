import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldTestServiceClassEntity } from 'app/shared/model/field-test-service-class-entity.model';
import { FieldTestServiceClassEntityService } from './field-test-service-class-entity.service';
import { FieldTestServiceClassEntityComponent } from './field-test-service-class-entity.component';
import { FieldTestServiceClassEntityDetailComponent } from './field-test-service-class-entity-detail.component';
import { FieldTestServiceClassEntityUpdateComponent } from './field-test-service-class-entity-update.component';
import { FieldTestServiceClassEntityDeletePopupComponent } from './field-test-service-class-entity-delete-dialog.component';
import { IFieldTestServiceClassEntity } from 'app/shared/model/field-test-service-class-entity.model';

@Injectable({ providedIn: 'root' })
export class FieldTestServiceClassEntityResolve implements Resolve<IFieldTestServiceClassEntity> {
    constructor(private service: FieldTestServiceClassEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((fieldTestServiceClassEntity: HttpResponse<FieldTestServiceClassEntity>) => fieldTestServiceClassEntity.body));
        }
        return of(new FieldTestServiceClassEntity());
    }
}

export const fieldTestServiceClassEntityRoute: Routes = [
    {
        path: 'field-test-service-class-entity',
        component: FieldTestServiceClassEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceClassEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-service-class-entity/:id/view',
        component: FieldTestServiceClassEntityDetailComponent,
        resolve: {
            fieldTestServiceClassEntity: FieldTestServiceClassEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceClassEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-service-class-entity/new',
        component: FieldTestServiceClassEntityUpdateComponent,
        resolve: {
            fieldTestServiceClassEntity: FieldTestServiceClassEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceClassEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-service-class-entity/:id/edit',
        component: FieldTestServiceClassEntityUpdateComponent,
        resolve: {
            fieldTestServiceClassEntity: FieldTestServiceClassEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceClassEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestServiceClassEntityPopupRoute: Routes = [
    {
        path: 'field-test-service-class-entity/:id/delete',
        component: FieldTestServiceClassEntityDeletePopupComponent,
        resolve: {
            fieldTestServiceClassEntity: FieldTestServiceClassEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestServiceClassEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
