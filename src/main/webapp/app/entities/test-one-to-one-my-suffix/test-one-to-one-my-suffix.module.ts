import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    TestOneToOneMySuffixComponent,
    TestOneToOneMySuffixDetailComponent,
    TestOneToOneMySuffixUpdateComponent,
    TestOneToOneMySuffixDeletePopupComponent,
    TestOneToOneMySuffixDeleteDialogComponent,
    testOneToOneRoute,
    testOneToOnePopupRoute
} from './';

const ENTITY_STATES = [...testOneToOneRoute, ...testOneToOnePopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestOneToOneMySuffixComponent,
        TestOneToOneMySuffixDetailComponent,
        TestOneToOneMySuffixUpdateComponent,
        TestOneToOneMySuffixDeleteDialogComponent,
        TestOneToOneMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TestOneToOneMySuffixComponent,
        TestOneToOneMySuffixUpdateComponent,
        TestOneToOneMySuffixDeleteDialogComponent,
        TestOneToOneMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestOneToOneMySuffixModule {}
