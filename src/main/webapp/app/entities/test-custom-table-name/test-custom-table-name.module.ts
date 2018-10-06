import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestCustomTableNameComponent,
    TestCustomTableNameDetailComponent,
    TestCustomTableNameUpdateComponent,
    TestCustomTableNameDeletePopupComponent,
    TestCustomTableNameDeleteDialogComponent,
    testCustomTableNameRoute,
    testCustomTableNamePopupRoute
} from './';

const ENTITY_STATES = [...testCustomTableNameRoute, ...testCustomTableNamePopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestCustomTableNameComponent,
        TestCustomTableNameDetailComponent,
        TestCustomTableNameUpdateComponent,
        TestCustomTableNameDeleteDialogComponent,
        TestCustomTableNameDeletePopupComponent
    ],
    entryComponents: [
        TestCustomTableNameComponent,
        TestCustomTableNameUpdateComponent,
        TestCustomTableNameDeleteDialogComponent,
        TestCustomTableNameDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestCustomTableNameModule {}
