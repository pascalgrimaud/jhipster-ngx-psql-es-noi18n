import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestMapstructComponent,
    TestMapstructDetailComponent,
    TestMapstructUpdateComponent,
    TestMapstructDeletePopupComponent,
    TestMapstructDeleteDialogComponent,
    testMapstructRoute,
    testMapstructPopupRoute
} from './';

const ENTITY_STATES = [...testMapstructRoute, ...testMapstructPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestMapstructComponent,
        TestMapstructDetailComponent,
        TestMapstructUpdateComponent,
        TestMapstructDeleteDialogComponent,
        TestMapstructDeletePopupComponent
    ],
    entryComponents: [
        TestMapstructComponent,
        TestMapstructUpdateComponent,
        TestMapstructDeleteDialogComponent,
        TestMapstructDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestMapstructModule {}
