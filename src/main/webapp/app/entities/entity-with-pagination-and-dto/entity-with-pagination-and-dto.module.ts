import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    EntityWithPaginationAndDTOComponent,
    EntityWithPaginationAndDTODetailComponent,
    EntityWithPaginationAndDTOUpdateComponent,
    EntityWithPaginationAndDTODeletePopupComponent,
    EntityWithPaginationAndDTODeleteDialogComponent,
    entityWithPaginationAndDTORoute,
    entityWithPaginationAndDTOPopupRoute
} from './';

const ENTITY_STATES = [...entityWithPaginationAndDTORoute, ...entityWithPaginationAndDTOPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntityWithPaginationAndDTOComponent,
        EntityWithPaginationAndDTODetailComponent,
        EntityWithPaginationAndDTOUpdateComponent,
        EntityWithPaginationAndDTODeleteDialogComponent,
        EntityWithPaginationAndDTODeletePopupComponent
    ],
    entryComponents: [
        EntityWithPaginationAndDTOComponent,
        EntityWithPaginationAndDTOUpdateComponent,
        EntityWithPaginationAndDTODeleteDialogComponent,
        EntityWithPaginationAndDTODeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityWithPaginationAndDTOModule {}
