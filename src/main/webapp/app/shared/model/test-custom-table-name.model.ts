import { ITestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { IUser } from 'app/core/user/user.model';

export interface ITestCustomTableName {
    id?: number;
    testManyToOnes?: ITestManyToOneMySuffix[];
    testManyToManies?: ITestManyToManyMySuffix[];
    testOneToOne?: ITestOneToOneMySuffix;
    testEntity?: ITestEntityMySuffixAlt;
    userOneToMany?: IUser;
    userManyToManies?: IUser[];
    userOneToOne?: IUser;
}

export class TestCustomTableName implements ITestCustomTableName {
    constructor(
        public id?: number,
        public testManyToOnes?: ITestManyToOneMySuffix[],
        public testManyToManies?: ITestManyToManyMySuffix[],
        public testOneToOne?: ITestOneToOneMySuffix,
        public testEntity?: ITestEntityMySuffixAlt,
        public userOneToMany?: IUser,
        public userManyToManies?: IUser[],
        public userOneToOne?: IUser
    ) {}
}
