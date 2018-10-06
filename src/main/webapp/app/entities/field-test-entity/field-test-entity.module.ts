import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    FieldTestEntityComponent,
    FieldTestEntityDetailComponent,
    FieldTestEntityUpdateComponent,
    FieldTestEntityDeletePopupComponent,
    FieldTestEntityDeleteDialogComponent,
    fieldTestEntityRoute,
    fieldTestEntityPopupRoute
} from './';

const ENTITY_STATES = [...fieldTestEntityRoute, ...fieldTestEntityPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FieldTestEntityComponent,
        FieldTestEntityDetailComponent,
        FieldTestEntityUpdateComponent,
        FieldTestEntityDeleteDialogComponent,
        FieldTestEntityDeletePopupComponent
    ],
    entryComponents: [
        FieldTestEntityComponent,
        FieldTestEntityUpdateComponent,
        FieldTestEntityDeleteDialogComponent,
        FieldTestEntityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NFieldTestEntityModule {}
