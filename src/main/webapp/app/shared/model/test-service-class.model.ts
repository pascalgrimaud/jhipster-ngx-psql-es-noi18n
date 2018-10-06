import { ITestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { IUser } from 'app/core/user/user.model';

export interface ITestServiceClass {
    id?: number;
    testManyToOnes?: ITestManyToOneMySuffix[];
    testManyToManies?: ITestManyToManyMySuffix[];
    testOneToOne?: ITestOneToOneMySuffix;
    userOneToMany?: IUser;
    userManyToManies?: IUser[];
    userOneToOne?: IUser;
}

export class TestServiceClass implements ITestServiceClass {
    constructor(
        public id?: number,
        public testManyToOnes?: ITestManyToOneMySuffix[],
        public testManyToManies?: ITestManyToManyMySuffix[],
        public testOneToOne?: ITestOneToOneMySuffix,
        public userOneToMany?: IUser,
        public userManyToManies?: IUser[],
        public userOneToOne?: IUser
    ) {}
}
