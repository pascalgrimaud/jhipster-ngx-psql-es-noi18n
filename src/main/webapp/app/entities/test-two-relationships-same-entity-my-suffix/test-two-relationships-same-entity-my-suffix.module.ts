import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    TestTwoRelationshipsSameEntityMySuffixComponent,
    TestTwoRelationshipsSameEntityMySuffixDetailComponent,
    TestTwoRelationshipsSameEntityMySuffixUpdateComponent,
    TestTwoRelationshipsSameEntityMySuffixDeletePopupComponent,
    TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent,
    testTwoRelationshipsSameEntityRoute,
    testTwoRelationshipsSameEntityPopupRoute
} from './';

const ENTITY_STATES = [...testTwoRelationshipsSameEntityRoute, ...testTwoRelationshipsSameEntityPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestTwoRelationshipsSameEntityMySuffixComponent,
        TestTwoRelationshipsSameEntityMySuffixDetailComponent,
        TestTwoRelationshipsSameEntityMySuffixUpdateComponent,
        TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent,
        TestTwoRelationshipsSameEntityMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TestTwoRelationshipsSameEntityMySuffixComponent,
        TestTwoRelationshipsSameEntityMySuffixUpdateComponent,
        TestTwoRelationshipsSameEntityMySuffixDeleteDialogComponent,
        TestTwoRelationshipsSameEntityMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestTwoRelationshipsSameEntityMySuffixModule {}
