import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestEntityMySuffixAltComponent,
    TestEntityMySuffixAltDetailComponent,
    TestEntityMySuffixAltUpdateComponent,
    TestEntityMySuffixAltDeletePopupComponent,
    TestEntityMySuffixAltDeleteDialogComponent,
    testEntityRoute,
    testEntityPopupRoute
} from './';

const ENTITY_STATES = [...testEntityRoute, ...testEntityPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestEntityMySuffixAltComponent,
        TestEntityMySuffixAltDetailComponent,
        TestEntityMySuffixAltUpdateComponent,
        TestEntityMySuffixAltDeleteDialogComponent,
        TestEntityMySuffixAltDeletePopupComponent
    ],
    entryComponents: [
        TestEntityMySuffixAltComponent,
        TestEntityMySuffixAltUpdateComponent,
        TestEntityMySuffixAltDeleteDialogComponent,
        TestEntityMySuffixAltDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestEntityMySuffixAltModule {}
