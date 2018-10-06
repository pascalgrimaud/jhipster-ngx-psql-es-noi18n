import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    EntityWithServiceImplPaginationAndDTOComponent,
    EntityWithServiceImplPaginationAndDTODetailComponent,
    EntityWithServiceImplPaginationAndDTOUpdateComponent,
    EntityWithServiceImplPaginationAndDTODeletePopupComponent,
    EntityWithServiceImplPaginationAndDTODeleteDialogComponent,
    entityWithServiceImplPaginationAndDTORoute,
    entityWithServiceImplPaginationAndDTOPopupRoute
} from './';

const ENTITY_STATES = [...entityWithServiceImplPaginationAndDTORoute, ...entityWithServiceImplPaginationAndDTOPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntityWithServiceImplPaginationAndDTOComponent,
        EntityWithServiceImplPaginationAndDTODetailComponent,
        EntityWithServiceImplPaginationAndDTOUpdateComponent,
        EntityWithServiceImplPaginationAndDTODeleteDialogComponent,
        EntityWithServiceImplPaginationAndDTODeletePopupComponent
    ],
    entryComponents: [
        EntityWithServiceImplPaginationAndDTOComponent,
        EntityWithServiceImplPaginationAndDTOUpdateComponent,
        EntityWithServiceImplPaginationAndDTODeleteDialogComponent,
        EntityWithServiceImplPaginationAndDTODeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityWithServiceImplPaginationAndDTOModule {}
