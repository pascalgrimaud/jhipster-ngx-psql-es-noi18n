import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravisPsqlEsNoi18NSharedModule } from 'app/shared';
import { TravisPsqlEsNoi18NAdminModule } from 'app/admin/admin.module';
import {
    BankAccountMySuffixComponent,
    BankAccountMySuffixDetailComponent,
    BankAccountMySuffixUpdateComponent,
    BankAccountMySuffixDeletePopupComponent,
    BankAccountMySuffixDeleteDialogComponent,
    bankAccountRoute,
    bankAccountPopupRoute
} from './';

const ENTITY_STATES = [...bankAccountRoute, ...bankAccountPopupRoute];

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedModule, TravisPsqlEsNoi18NAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BankAccountMySuffixComponent,
        BankAccountMySuffixDetailComponent,
        BankAccountMySuffixUpdateComponent,
        BankAccountMySuffixDeleteDialogComponent,
        BankAccountMySuffixDeletePopupComponent
    ],
    entryComponents: [
        BankAccountMySuffixComponent,
        BankAccountMySuffixUpdateComponent,
        BankAccountMySuffixDeleteDialogComponent,
        BankAccountMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NBankAccountMySuffixModule {}
