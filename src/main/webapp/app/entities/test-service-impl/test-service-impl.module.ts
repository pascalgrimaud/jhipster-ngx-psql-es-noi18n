import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestServiceImplComponent,
    TestServiceImplDetailComponent,
    TestServiceImplUpdateComponent,
    TestServiceImplDeletePopupComponent,
    TestServiceImplDeleteDialogComponent,
    testServiceImplRoute,
    testServiceImplPopupRoute
} from './';

const ENTITY_STATES = [...testServiceImplRoute, ...testServiceImplPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestServiceImplComponent,
        TestServiceImplDetailComponent,
        TestServiceImplUpdateComponent,
        TestServiceImplDeleteDialogComponent,
        TestServiceImplDeletePopupComponent
    ],
    entryComponents: [
        TestServiceImplComponent,
        TestServiceImplUpdateComponent,
        TestServiceImplDeleteDialogComponent,
        TestServiceImplDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestServiceImplModule {}
