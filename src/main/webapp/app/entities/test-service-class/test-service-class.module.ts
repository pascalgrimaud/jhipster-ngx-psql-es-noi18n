import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestServiceClassComponent,
    TestServiceClassDetailComponent,
    TestServiceClassUpdateComponent,
    TestServiceClassDeletePopupComponent,
    TestServiceClassDeleteDialogComponent,
    testServiceClassRoute,
    testServiceClassPopupRoute
} from './';

const ENTITY_STATES = [...testServiceClassRoute, ...testServiceClassPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestServiceClassComponent,
        TestServiceClassDetailComponent,
        TestServiceClassUpdateComponent,
        TestServiceClassDeleteDialogComponent,
        TestServiceClassDeletePopupComponent
    ],
    entryComponents: [
        TestServiceClassComponent,
        TestServiceClassUpdateComponent,
        TestServiceClassDeleteDialogComponent,
        TestServiceClassDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestServiceClassModule {}
