import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestPagerComponent,
    TestPagerDetailComponent,
    TestPagerUpdateComponent,
    TestPagerDeletePopupComponent,
    TestPagerDeleteDialogComponent,
    testPagerRoute,
    testPagerPopupRoute
} from './';

const ENTITY_STATES = [...testPagerRoute, ...testPagerPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestPagerComponent,
        TestPagerDetailComponent,
        TestPagerUpdateComponent,
        TestPagerDeleteDialogComponent,
        TestPagerDeletePopupComponent
    ],
    entryComponents: [TestPagerComponent, TestPagerUpdateComponent, TestPagerDeleteDialogComponent, TestPagerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestPagerModule {}
