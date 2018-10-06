import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    EntityWithServiceImplComponent,
    EntityWithServiceImplDetailComponent,
    EntityWithServiceImplUpdateComponent,
    EntityWithServiceImplDeletePopupComponent,
    EntityWithServiceImplDeleteDialogComponent,
    entityWithServiceImplRoute,
    entityWithServiceImplPopupRoute
} from './';

const ENTITY_STATES = [...entityWithServiceImplRoute, ...entityWithServiceImplPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntityWithServiceImplComponent,
        EntityWithServiceImplDetailComponent,
        EntityWithServiceImplUpdateComponent,
        EntityWithServiceImplDeleteDialogComponent,
        EntityWithServiceImplDeletePopupComponent
    ],
    entryComponents: [
        EntityWithServiceImplComponent,
        EntityWithServiceImplUpdateComponent,
        EntityWithServiceImplDeleteDialogComponent,
        EntityWithServiceImplDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityWithServiceImplModule {}
