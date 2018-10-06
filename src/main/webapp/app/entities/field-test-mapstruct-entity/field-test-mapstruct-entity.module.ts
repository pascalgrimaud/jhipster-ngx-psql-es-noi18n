import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    FieldTestMapstructEntityComponent,
    FieldTestMapstructEntityDetailComponent,
    FieldTestMapstructEntityUpdateComponent,
    FieldTestMapstructEntityDeletePopupComponent,
    FieldTestMapstructEntityDeleteDialogComponent,
    fieldTestMapstructEntityRoute,
    fieldTestMapstructEntityPopupRoute
} from './';

const ENTITY_STATES = [...fieldTestMapstructEntityRoute, ...fieldTestMapstructEntityPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FieldTestMapstructEntityComponent,
        FieldTestMapstructEntityDetailComponent,
        FieldTestMapstructEntityUpdateComponent,
        FieldTestMapstructEntityDeleteDialogComponent,
        FieldTestMapstructEntityDeletePopupComponent
    ],
    entryComponents: [
        FieldTestMapstructEntityComponent,
        FieldTestMapstructEntityUpdateComponent,
        FieldTestMapstructEntityDeleteDialogComponent,
        FieldTestMapstructEntityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NFieldTestMapstructEntityModule {}
