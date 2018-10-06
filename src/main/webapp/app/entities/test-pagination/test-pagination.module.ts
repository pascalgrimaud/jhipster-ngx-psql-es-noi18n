import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestPaginationComponent,
    TestPaginationDetailComponent,
    TestPaginationUpdateComponent,
    TestPaginationDeletePopupComponent,
    TestPaginationDeleteDialogComponent,
    testPaginationRoute,
    testPaginationPopupRoute
} from './';

const ENTITY_STATES = [...testPaginationRoute, ...testPaginationPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestPaginationComponent,
        TestPaginationDetailComponent,
        TestPaginationUpdateComponent,
        TestPaginationDeleteDialogComponent,
        TestPaginationDeletePopupComponent
    ],
    entryComponents: [
        TestPaginationComponent,
        TestPaginationUpdateComponent,
        TestPaginationDeleteDialogComponent,
        TestPaginationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestPaginationModule {}
