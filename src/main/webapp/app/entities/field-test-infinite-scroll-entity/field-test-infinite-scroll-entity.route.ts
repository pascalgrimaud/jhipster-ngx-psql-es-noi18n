import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';
import { FieldTestInfiniteScrollEntityService } from './field-test-infinite-scroll-entity.service';
import { FieldTestInfiniteScrollEntityComponent } from './field-test-infinite-scroll-entity.component';
import { FieldTestInfiniteScrollEntityDetailComponent } from './field-test-infinite-scroll-entity-detail.component';
import { FieldTestInfiniteScrollEntityUpdateComponent } from './field-test-infinite-scroll-entity-update.component';
import { FieldTestInfiniteScrollEntityDeletePopupComponent } from './field-test-infinite-scroll-entity-delete-dialog.component';
import { IFieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';

@Injectable({ providedIn: 'root' })
export class FieldTestInfiniteScrollEntityResolve implements Resolve<IFieldTestInfiniteScrollEntity> {
    constructor(private service: FieldTestInfiniteScrollEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map((fieldTestInfiniteScrollEntity: HttpResponse<FieldTestInfiniteScrollEntity>) => fieldTestInfiniteScrollEntity.body)
                );
        }
        return of(new FieldTestInfiniteScrollEntity());
    }
}

export const fieldTestInfiniteScrollEntityRoute: Routes = [
    {
        path: 'field-test-infinite-scroll-entity',
        component: FieldTestInfiniteScrollEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestInfiniteScrollEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-infinite-scroll-entity/:id/view',
        component: FieldTestInfiniteScrollEntityDetailComponent,
        resolve: {
            fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestInfiniteScrollEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-infinite-scroll-entity/new',
        component: FieldTestInfiniteScrollEntityUpdateComponent,
        resolve: {
            fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestInfiniteScrollEntities'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'field-test-infinite-scroll-entity/:id/edit',
        component: FieldTestInfiniteScrollEntityUpdateComponent,
        resolve: {
            fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestInfiniteScrollEntities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestInfiniteScrollEntityPopupRoute: Routes = [
    {
        path: 'field-test-infinite-scroll-entity/:id/delete',
        component: FieldTestInfiniteScrollEntityDeletePopupComponent,
        resolve: {
            fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FieldTestInfiniteScrollEntities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
