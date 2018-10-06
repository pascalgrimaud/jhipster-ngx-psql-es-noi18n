import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';
import { ITestServiceClass } from 'app/shared/model/test-service-class.model';
import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';
import { ITestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';
import { ITestPager } from 'app/shared/model/test-pager.model';
import { ITestPagination } from 'app/shared/model/test-pagination.model';
import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

export interface ITestManyToManyMySuffix {
    id?: number;
    testEntities?: ITestEntityMySuffixAlt[];
    testMapstructs?: ITestMapstruct[];
    testServiceClasses?: ITestServiceClass[];
    testServiceImpls?: ITestServiceImpl[];
    testInfiniteScrolls?: ITestInfiniteScroll[];
    testPagers?: ITestPager[];
    testPaginations?: ITestPagination[];
    testCustomTableNames?: ITestCustomTableName[];
}

export class TestManyToManyMySuffix implements ITestManyToManyMySuffix {
    constructor(
        public id?: number,
        public testEntities?: ITestEntityMySuffixAlt[],
        public testMapstructs?: ITestMapstruct[],
        public testServiceClasses?: ITestServiceClass[],
        public testServiceImpls?: ITestServiceImpl[],
        public testInfiniteScrolls?: ITestInfiniteScroll[],
        public testPagers?: ITestPager[],
        public testPaginations?: ITestPagination[],
        public testCustomTableNames?: ITestCustomTableName[]
    ) {}
}
