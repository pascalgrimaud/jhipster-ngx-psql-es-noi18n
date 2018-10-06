import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    EntityWithServiceImplAndPaginationComponent,
    EntityWithServiceImplAndPaginationDetailComponent,
    EntityWithServiceImplAndPaginationUpdateComponent,
    EntityWithServiceImplAndPaginationDeletePopupComponent,
    EntityWithServiceImplAndPaginationDeleteDialogComponent,
    entityWithServiceImplAndPaginationRoute,
    entityWithServiceImplAndPaginationPopupRoute
} from './';

const ENTITY_STATES = [...entityWithServiceImplAndPaginationRoute, ...entityWithServiceImplAndPaginationPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntityWithServiceImplAndPaginationComponent,
        EntityWithServiceImplAndPaginationDetailComponent,
        EntityWithServiceImplAndPaginationUpdateComponent,
        EntityWithServiceImplAndPaginationDeleteDialogComponent,
        EntityWithServiceImplAndPaginationDeletePopupComponent
    ],
    entryComponents: [
        EntityWithServiceImplAndPaginationComponent,
        EntityWithServiceImplAndPaginationUpdateComponent,
        EntityWithServiceImplAndPaginationDeleteDialogComponent,
        EntityWithServiceImplAndPaginationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityWithServiceImplAndPaginationModule {}
