import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    TestManyToManyMySuffixComponent,
    TestManyToManyMySuffixDetailComponent,
    TestManyToManyMySuffixUpdateComponent,
    TestManyToManyMySuffixDeletePopupComponent,
    TestManyToManyMySuffixDeleteDialogComponent,
    testManyToManyRoute,
    testManyToManyPopupRoute
} from './';

const ENTITY_STATES = [...testManyToManyRoute, ...testManyToManyPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestManyToManyMySuffixComponent,
        TestManyToManyMySuffixDetailComponent,
        TestManyToManyMySuffixUpdateComponent,
        TestManyToManyMySuffixDeleteDialogComponent,
        TestManyToManyMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TestManyToManyMySuffixComponent,
        TestManyToManyMySuffixUpdateComponent,
        TestManyToManyMySuffixDeleteDialogComponent,
        TestManyToManyMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestManyToManyMySuffixModule {}
