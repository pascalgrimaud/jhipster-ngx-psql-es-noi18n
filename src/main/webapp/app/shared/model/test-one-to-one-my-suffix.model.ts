import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';
import { ITestServiceClass } from 'app/shared/model/test-service-class.model';
import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';
import { ITestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';
import { ITestPager } from 'app/shared/model/test-pager.model';
import { ITestPagination } from 'app/shared/model/test-pagination.model';
import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

export interface ITestOneToOneMySuffix {
    id?: number;
    testEntity?: ITestEntityMySuffixAlt;
    testMapstruct?: ITestMapstruct;
    testServiceClass?: ITestServiceClass;
    testServiceImpl?: ITestServiceImpl;
    testInfiniteScroll?: ITestInfiniteScroll;
    testPager?: ITestPager;
    testPagination?: ITestPagination;
    testCustomTableName?: ITestCustomTableName;
}

export class TestOneToOneMySuffix implements ITestOneToOneMySuffix {
    constructor(
        public id?: number,
        public testEntity?: ITestEntityMySuffixAlt,
        public testMapstruct?: ITestMapstruct,
        public testServiceClass?: ITestServiceClass,
        public testServiceImpl?: ITestServiceImpl,
        public testInfiniteScroll?: ITestInfiniteScroll,
        public testPager?: ITestPager,
        public testPagination?: ITestPagination,
        public testCustomTableName?: ITestCustomTableName
    ) {}
}
