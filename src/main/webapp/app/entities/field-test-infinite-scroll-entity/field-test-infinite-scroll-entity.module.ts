import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    FieldTestInfiniteScrollEntityComponent,
    FieldTestInfiniteScrollEntityDetailComponent,
    FieldTestInfiniteScrollEntityUpdateComponent,
    FieldTestInfiniteScrollEntityDeletePopupComponent,
    FieldTestInfiniteScrollEntityDeleteDialogComponent,
    fieldTestInfiniteScrollEntityRoute,
    fieldTestInfiniteScrollEntityPopupRoute
} from './';

const ENTITY_STATES = [...fieldTestInfiniteScrollEntityRoute, ...fieldTestInfiniteScrollEntityPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FieldTestInfiniteScrollEntityComponent,
        FieldTestInfiniteScrollEntityDetailComponent,
        FieldTestInfiniteScrollEntityUpdateComponent,
        FieldTestInfiniteScrollEntityDeleteDialogComponent,
        FieldTestInfiniteScrollEntityDeletePopupComponent
    ],
    entryComponents: [
        FieldTestInfiniteScrollEntityComponent,
        FieldTestInfiniteScrollEntityUpdateComponent,
        FieldTestInfiniteScrollEntityDeleteDialogComponent,
        FieldTestInfiniteScrollEntityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NFieldTestInfiniteScrollEntityModule {}
