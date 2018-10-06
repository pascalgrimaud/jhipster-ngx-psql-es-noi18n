import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    EntityWithServiceClassAndPaginationComponent,
    EntityWithServiceClassAndPaginationDetailComponent,
    EntityWithServiceClassAndPaginationUpdateComponent,
    EntityWithServiceClassAndPaginationDeletePopupComponent,
    EntityWithServiceClassAndPaginationDeleteDialogComponent,
    entityWithServiceClassAndPaginationRoute,
    entityWithServiceClassAndPaginationPopupRoute
} from './';

const ENTITY_STATES = [...entityWithServiceClassAndPaginationRoute, ...entityWithServiceClassAndPaginationPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntityWithServiceClassAndPaginationComponent,
        EntityWithServiceClassAndPaginationDetailComponent,
        EntityWithServiceClassAndPaginationUpdateComponent,
        EntityWithServiceClassAndPaginationDeleteDialogComponent,
        EntityWithServiceClassAndPaginationDeletePopupComponent
    ],
    entryComponents: [
        EntityWithServiceClassAndPaginationComponent,
        EntityWithServiceClassAndPaginationUpdateComponent,
        EntityWithServiceClassAndPaginationDeleteDialogComponent,
        EntityWithServiceClassAndPaginationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityWithServiceClassAndPaginationModule {}
