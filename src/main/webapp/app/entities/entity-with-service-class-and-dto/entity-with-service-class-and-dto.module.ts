import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    EntityWithServiceClassAndDTOComponent,
    EntityWithServiceClassAndDTODetailComponent,
    EntityWithServiceClassAndDTOUpdateComponent,
    EntityWithServiceClassAndDTODeletePopupComponent,
    EntityWithServiceClassAndDTODeleteDialogComponent,
    entityWithServiceClassAndDTORoute,
    entityWithServiceClassAndDTOPopupRoute
} from './';

const ENTITY_STATES = [...entityWithServiceClassAndDTORoute, ...entityWithServiceClassAndDTOPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntityWithServiceClassAndDTOComponent,
        EntityWithServiceClassAndDTODetailComponent,
        EntityWithServiceClassAndDTOUpdateComponent,
        EntityWithServiceClassAndDTODeleteDialogComponent,
        EntityWithServiceClassAndDTODeletePopupComponent
    ],
    entryComponents: [
        EntityWithServiceClassAndDTOComponent,
        EntityWithServiceClassAndDTOUpdateComponent,
        EntityWithServiceClassAndDTODeleteDialogComponent,
        EntityWithServiceClassAndDTODeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityWithServiceClassAndDTOModule {}
