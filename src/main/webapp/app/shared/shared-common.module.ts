import { NgModule } from '@angular/core';

import { TravisPsqlEsNoi18NSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TravisPsqlEsNoi18NSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TravisPsqlEsNoi18NSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TravisPsqlEsNoi18NSharedCommonModule {}
