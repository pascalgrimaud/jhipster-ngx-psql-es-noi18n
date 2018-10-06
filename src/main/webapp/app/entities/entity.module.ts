import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TravisPsqlEsNoi18NBankAccountMySuffixModule } from './test-root/bank-account-my-suffix/bank-account-my-suffix.module';
import { TravisPsqlEsNoi18NLabelModule } from './test-root/label/label.module';
import { TravisPsqlEsNoi18NOperationModule } from './test-root/operation/operation.module';
import { TravisPsqlEsNoi18NFieldTestServiceClassEntityModule } from './field-test-service-class-entity/field-test-service-class-entity.module';
import { TravisPsqlEsNoi18NFieldTestServiceImplEntityModule } from './field-test-service-impl-entity/field-test-service-impl-entity.module';
import { TravisPsqlEsNoi18NFieldTestPaginationEntityModule } from './field-test-pagination-entity/field-test-pagination-entity.module';
import { TravisPsqlEsNoi18NFieldTestPagerEntityModule } from './field-test-pager-entity/field-test-pager-entity.module';
import { TravisPsqlEsNoi18NFieldTestMapstructEntityModule } from './field-test-mapstruct-entity/field-test-mapstruct-entity.module';
import { TravisPsqlEsNoi18NFieldTestInfiniteScrollEntityModule } from './field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.module';
import { TravisPsqlEsNoi18NFieldTestEntityModule } from './field-test-entity/field-test-entity.module';
import { TravisPsqlEsNoi18NTestCustomTableNameModule } from './test-custom-table-name/test-custom-table-name.module';
// prettier-ignore
import {
    TravisPsqlEsNoi18NTestTwoRelationshipsSameEntityMySuffixModule
} from './test-two-relationships-same-entity-my-suffix/test-two-relationships-same-entity-my-suffix.module';
import { TravisPsqlEsNoi18NTestServiceImplModule } from './test-service-impl/test-service-impl.module';
import { TravisPsqlEsNoi18NTestServiceClassModule } from './test-service-class/test-service-class.module';
import { TravisPsqlEsNoi18NTestPaginationModule } from './test-pagination/test-pagination.module';
import { TravisPsqlEsNoi18NTestPagerModule } from './test-pager/test-pager.module';
import { TravisPsqlEsNoi18NTestMapstructModule } from './test-mapstruct/test-mapstruct.module';
import { TravisPsqlEsNoi18NTestInfiniteScrollModule } from './test-infinite-scroll/test-infinite-scroll.module';
import { TravisPsqlEsNoi18NTestEntityMySuffixAltModule } from './test-entity-my-suffix-alt/test-entity-my-suffix-alt.module';
import { TravisPsqlEsNoi18NTestManyToManyMySuffixModule } from './test-many-to-many-my-suffix/test-many-to-many-my-suffix.module';
import { TravisPsqlEsNoi18NTestManyRelPaginDTOMySuffixModule } from './test-many-rel-pagin-dto-my-suffix/test-many-rel-pagin-dto-my-suffix.module';
import { TravisPsqlEsNoi18NTestManyToOneMySuffixModule } from './test-many-to-one-my-suffix/test-many-to-one-my-suffix.module';
import { TravisPsqlEsNoi18NTestOneToOneMySuffixModule } from './test-one-to-one-my-suffix/test-one-to-one-my-suffix.module';
import { TravisPsqlEsNoi18NEntityWithDTOModule } from './entity-with-dto/entity-with-dto.module';
import { TravisPsqlEsNoi18NEntityWithServiceClassModule } from './entity-with-service-class/entity-with-service-class.module';
import { TravisPsqlEsNoi18NEntityWithServiceImplModule } from './entity-with-service-impl/entity-with-service-impl.module';
import { TravisPsqlEsNoi18NEntityWithPaginationModule } from './entity-with-pagination/entity-with-pagination.module';
import { TravisPsqlEsNoi18NEntityWithServiceClassAndPaginationModule } from './entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.module';
import { TravisPsqlEsNoi18NEntityWithServiceImplAndPaginationModule } from './entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.module';
import { TravisPsqlEsNoi18NEntityWithServiceClassAndDTOModule } from './entity-with-service-class-and-dto/entity-with-service-class-and-dto.module';
import { TravisPsqlEsNoi18NEntityWithServiceImplAndDTOModule } from './entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.module';
import { TravisPsqlEsNoi18NEntityWithPaginationAndDTOModule } from './entity-with-pagination-and-dto/entity-with-pagination-and-dto.module';
// prettier-ignore
import {
    TravisPsqlEsNoi18NEntityWithServiceClassPaginationAndDTOModule
} from './entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.module';
import { TravisPsqlEsNoi18NEntityWithServiceImplPaginationAndDTOModule } from './entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.module';
import { TravisPsqlEsNoi18NDivisionModule } from './test-root/division/division.module';
import { TravisPsqlEsNoi18NPlaceModule } from './test-root/place/place.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TravisPsqlEsNoi18NBankAccountMySuffixModule,
        TravisPsqlEsNoi18NLabelModule,
        TravisPsqlEsNoi18NOperationModule,
        TravisPsqlEsNoi18NFieldTestServiceClassEntityModule,
        TravisPsqlEsNoi18NFieldTestServiceImplEntityModule,
        TravisPsqlEsNoi18NFieldTestPaginationEntityModule,
        TravisPsqlEsNoi18NFieldTestPagerEntityModule,
        TravisPsqlEsNoi18NFieldTestMapstructEntityModule,
        TravisPsqlEsNoi18NFieldTestInfiniteScrollEntityModule,
        TravisPsqlEsNoi18NFieldTestEntityModule,
        TravisPsqlEsNoi18NTestCustomTableNameModule,
        TravisPsqlEsNoi18NTestTwoRelationshipsSameEntityMySuffixModule,
        TravisPsqlEsNoi18NTestServiceImplModule,
        TravisPsqlEsNoi18NTestServiceClassModule,
        TravisPsqlEsNoi18NTestPaginationModule,
        TravisPsqlEsNoi18NTestPagerModule,
        TravisPsqlEsNoi18NTestMapstructModule,
        TravisPsqlEsNoi18NTestInfiniteScrollModule,
        TravisPsqlEsNoi18NTestEntityMySuffixAltModule,
        TravisPsqlEsNoi18NTestManyToManyMySuffixModule,
        TravisPsqlEsNoi18NTestManyRelPaginDTOMySuffixModule,
        TravisPsqlEsNoi18NTestManyToOneMySuffixModule,
        TravisPsqlEsNoi18NTestOneToOneMySuffixModule,
        TravisPsqlEsNoi18NEntityWithDTOModule,
        TravisPsqlEsNoi18NEntityWithServiceClassModule,
        TravisPsqlEsNoi18NEntityWithServiceImplModule,
        TravisPsqlEsNoi18NEntityWithPaginationModule,
        TravisPsqlEsNoi18NEntityWithServiceClassAndPaginationModule,
        TravisPsqlEsNoi18NEntityWithServiceImplAndPaginationModule,
        TravisPsqlEsNoi18NEntityWithServiceClassAndDTOModule,
        TravisPsqlEsNoi18NEntityWithServiceImplAndDTOModule,
        TravisPsqlEsNoi18NEntityWithPaginationAndDTOModule,
        TravisPsqlEsNoi18NEntityWithServiceClassPaginationAndDTOModule,
        TravisPsqlEsNoi18NEntityWithServiceImplPaginationAndDTOModule,
        TravisPsqlEsNoi18NDivisionModule,
        TravisPsqlEsNoi18NPlaceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravisPsqlEsNoi18NEntityModule {}
