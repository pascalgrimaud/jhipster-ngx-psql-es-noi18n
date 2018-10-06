import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    FieldTestPaginationEntityComponent,
    FieldTestPaginationEntityDetailComponent,
    FieldTestPaginationEntityUpdateComponent,
    FieldTestPaginationEntityDeletePopupComponent,
    FieldTestPaginationEntityDeleteDialogComponent,
    fieldTestPaginationEntityRoute,
    fieldTestPaginationEntityPopupRoute
} from './';

const ENTITY_STATES = [...fieldTestPaginationEntityRoute, ...fieldTestPaginationEntityPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FieldTestPaginationEntityComponent,
        FieldTestPaginationEntityDetailComponent,
        FieldTestPaginationEntityUpdateComponent,
        FieldTestPaginationEntityDeleteDialogComponent,
        FieldTestPaginationEntityDeletePopupComponent
    ],
    entryComponents: [
        FieldTestPaginationEntityComponent,
        FieldTestPaginationEntityUpdateComponent,
        FieldTestPaginationEntityDeleteDialogComponent,
        FieldTestPaginationEntityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NFieldTestPaginationEntityModule {}
