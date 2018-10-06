import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';
import { FieldTestPagerEntityService } from './field-test-pager-entity.service';
import { FieldTestPagerEntityComponent } from './field-test-pager-entity.component';
import { FieldTestPagerEntityDetailComponent } from './field-test-pager-entity-detail.component';
import { FieldTestPagerEntityUpdateComponent } from './field-test-pager-entity-update.component';
import { FieldTestPagerEntityDeletePopupComponent } from './field-test-pager-entity-delete-dialog.component';
import { IFieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';

@Injectable({ providedIn: 'root' })
export class FieldTestPagerEntityResolve implements Resolve<IFieldTestPagerEntity> {
    constructor(private service: FieldTestPagerEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fieldTestPagerEntity: HttpResponse<FieldTestPagerEntity>) => fieldTestPagerEntity.body));
        }
        return of(new FieldTestPagerEntity());
    }
}

export const fieldTestPagerEntityRoute: Routes = [
    {
        path: 'field-test-pager-entity',
        component: FieldTestPagerEntityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'FieldTestPagerEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-pager-entity/:id/view',
        component: FieldTestPagerEntityDetailComponent,
        resolve: {
            fieldTestPagerEntity: FieldTestPagerEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPagerEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-pager-entity/new',
        component: FieldTestPagerEntityUpdateComponent,
        resolve: {
            fieldTestPagerEntity: FieldTestPagerEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPagerEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-pager-entity/:id/edit',
        component: FieldTestPagerEntityUpdateComponent,
        resolve: {
            fieldTestPagerEntity: FieldTestPagerEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPagerEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestPagerEntityPopupRoute: Routes = [
    {
        path: 'field-test-pager-entity/:id/delete',
        component: FieldTestPagerEntityDeletePopupComponent,
        resolve: {
            fieldTestPagerEntity: FieldTestPagerEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestPagerEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
