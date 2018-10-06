import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldTestPaginationEntity } from 'app/shared/model/field-test-pagination-entity.model';
import { FieldTestPaginationEntityService } from './field-test-pagination-entity.service';
import { FieldTestPaginationEntityComponent } from './field-test-pagination-entity.component';
import { FieldTestPaginationEntityDetailComponent } from './field-test-pagination-entity-detail.component';
import { FieldTestPaginationEntityUpdateComponent } from './field-test-pagination-entity-update.component';
import { FieldTestPaginationEntityDeletePopupComponent } from './field-test-pagination-entity-delete-dialog.component';
import { IFieldTestPaginationEntity } from 'app/shared/model/field-test-pagination-entity.model';

@Injectable({ providedIn: 'root' })
export class FieldTestPaginationEntityResolve implements Resolve<IFieldTestPaginationEntity> {
    constructor(private service: FieldTestPaginationEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((fieldTestPaginationEntity: HttpResponse<FieldTestPaginationEntity>) => fieldTestPaginationEntity.body));
        }
        return of(new FieldTestPaginationEntity());
    }
}

export const fieldTestPaginationEntityRoute: Routes = [
    {
        path: 'field-test-pagination-entity',
        component: FieldTestPaginationEntityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'FieldTestPaginationEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-pagination-entity/:id/view',
        component: FieldTestPaginationEntityDetailComponent,
        resolve: {
            fieldTestPaginationEntity: FieldTestPaginationEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPaginationEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-pagination-entity/new',
        component: FieldTestPaginationEntityUpdateComponent,
        resolve: {
            fieldTestPaginationEntity: FieldTestPaginationEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPaginationEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-pagination-entity/:id/edit',
        component: FieldTestPaginationEntityUpdateComponent,
        resolve: {
            fieldTestPaginationEntity: FieldTestPaginationEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPaginationEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestPaginationEntityPopupRoute: Routes = [
    {
        path: 'field-test-pagination-entity/:id/delete',
        component: FieldTestPaginationEntityDeletePopupComponent,
        resolve: {
            fieldTestPaginationEntity: FieldTestPaginationEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPaginationEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
