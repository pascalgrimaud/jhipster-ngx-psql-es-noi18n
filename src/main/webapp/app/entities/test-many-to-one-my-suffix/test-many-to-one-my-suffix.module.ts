import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    TestManyToOneMySuffixComponent,
    TestManyToOneMySuffixDetailComponent,
    TestManyToOneMySuffixUpdateComponent,
    TestManyToOneMySuffixDeletePopupComponent,
    TestManyToOneMySuffixDeleteDialogComponent,
    testManyToOneRoute,
    testManyToOnePopupRoute
} from './';

const ENTITY_STATES = [...testManyToOneRoute, ...testManyToOnePopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestManyToOneMySuffixComponent,
        TestManyToOneMySuffixDetailComponent,
        TestManyToOneMySuffixUpdateComponent,
        TestManyToOneMySuffixDeleteDialogComponent,
        TestManyToOneMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TestManyToOneMySuffixComponent,
        TestManyToOneMySuffixUpdateComponent,
        TestManyToOneMySuffixDeleteDialogComponent,
        TestManyToOneMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestManyToOneMySuffixModule {}
