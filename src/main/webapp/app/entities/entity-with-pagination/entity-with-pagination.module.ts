import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    EntityWithPaginationComponent,
    EntityWithPaginationDetailComponent,
    EntityWithPaginationUpdateComponent,
    EntityWithPaginationDeletePopupComponent,
    EntityWithPaginationDeleteDialogComponent,
    entityWithPaginationRoute,
    entityWithPaginationPopupRoute
} from './';

const ENTITY_STATES = [...entityWithPaginationRoute, ...entityWithPaginationPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntityWithPaginationComponent,
        EntityWithPaginationDetailComponent,
        EntityWithPaginationUpdateComponent,
        EntityWithPaginationDeleteDialogComponent,
        EntityWithPaginationDeletePopupComponent
    ],
    entryComponents: [
        EntityWithPaginationComponent,
        EntityWithPaginationUpdateComponent,
        EntityWithPaginationDeleteDialogComponent,
        EntityWithPaginationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityWithPaginationModule {}
