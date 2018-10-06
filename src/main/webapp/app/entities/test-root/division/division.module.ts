import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import {
    DivisionComponent,
    DivisionDetailComponent,
    DivisionUpdateComponent,
    DivisionDeletePopupComponent,
    DivisionDeleteDialogComponent,
    divisionRoute,
    divisionPopupRoute
} from './';

const ENTITY_STATES = [...divisionRoute, ...divisionPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DivisionComponent,
        DivisionDetailComponent,
        DivisionUpdateComponent,
        DivisionDeleteDialogComponent,
        DivisionDeletePopupComponent
    ],
    entryComponents: [DivisionComponent, DivisionUpdateComponent, DivisionDeleteDialogComponent, DivisionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NDivisionModule {}
