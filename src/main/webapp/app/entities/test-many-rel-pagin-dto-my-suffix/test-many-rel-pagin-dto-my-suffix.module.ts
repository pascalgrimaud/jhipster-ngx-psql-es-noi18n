import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    TestManyRelPaginDTOMySuffixComponent,
    TestManyRelPaginDTOMySuffixDetailComponent,
    TestManyRelPaginDTOMySuffixUpdateComponent,
    TestManyRelPaginDTOMySuffixDeletePopupComponent,
    TestManyRelPaginDTOMySuffixDeleteDialogComponent,
    testManyRelPaginDTORoute,
    testManyRelPaginDTOPopupRoute
} from './';

const ENTITY_STATES = [...testManyRelPaginDTORoute, ...testManyRelPaginDTOPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TestManyRelPaginDTOMySuffixComponent,
        TestManyRelPaginDTOMySuffixDetailComponent,
        TestManyRelPaginDTOMySuffixUpdateComponent,
        TestManyRelPaginDTOMySuffixDeleteDialogComponent,
        TestManyRelPaginDTOMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TestManyRelPaginDTOMySuffixComponent,
        TestManyRelPaginDTOMySuffixUpdateComponent,
        TestManyRelPaginDTOMySuffixDeleteDialogComponent,
        TestManyRelPaginDTOMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NTestManyRelPaginDTOMySuffixModule {}
