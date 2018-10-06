import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    FieldTestServiceClassEntityComponent,
    FieldTestServiceClassEntityDetailComponent,
    FieldTestServiceClassEntityUpdateComponent,
    FieldTestServiceClassEntityDeletePopupComponent,
    FieldTestServiceClassEntityDeleteDialogComponent,
    fieldTestServiceClassEntityRoute,
    fieldTestServiceClassEntityPopupRoute
} from './';

const ENTITY_STATES = [...fieldTestServiceClassEntityRoute, ...fieldTestServiceClassEntityPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FieldTestServiceClassEntityComponent,
        FieldTestServiceClassEntityDetailComponent,
        FieldTestServiceClassEntityUpdateComponent,
        FieldTestServiceClassEntityDeleteDialogComponent,
        FieldTestServiceClassEntityDeletePopupComponent
    ],
    entryComponents: [
        FieldTestServiceClassEntityComponent,
        FieldTestServiceClassEntityUpdateComponent,
        FieldTestServiceClassEntityDeleteDialogComponent,
        FieldTestServiceClassEntityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NFieldTestServiceClassEntityModule {}
