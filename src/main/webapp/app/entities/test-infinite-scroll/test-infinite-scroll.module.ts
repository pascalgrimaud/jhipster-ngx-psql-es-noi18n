import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestInfiniteScrollComponent,
    TestInfiniteScrollDetailComponent,
    TestInfiniteScrollUpdateComponent,
    TestInfiniteScrollDeletePopupComponent,
    TestInfiniteScrollDeleteDialogComponent,
    testInfiniteScrollRoute,
    testInfiniteScrollPopupRoute
} from './';

const ENTITY_STATES = [...testInfiniteScrollRoute, ...testInfiniteScrollPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestInfiniteScrollComponent,
        TestInfiniteScrollDetailComponent,
        TestInfiniteScrollUpdateComponent,
        TestInfiniteScrollDeleteDialogComponent,
        TestInfiniteScrollDeletePopupComponent
    ],
    entryComponents: [
        TestInfiniteScrollComponent,
        TestInfiniteScrollUpdateComponent,
        TestInfiniteScrollDeleteDialogComponent,
        TestInfiniteScrollDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestInfiniteScrollModule {}
