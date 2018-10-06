import { ITestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { ITestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';
import { IUser } from 'app/core/user/user.model';

export interface ITestMapstruct {
    id?: number;
    testManyToOnes?: ITestManyToOneMySuffix[];
    testManyToManies?: ITestManyToManyMySuffix[];
    testManyRelPaginDTOS?: ITestManyRelPaginDTOMySuffix[];
    testOneToOneId?: number;
    userOneToManyLogin?: string;
    userOneToManyId?: number;
    userManyToManies?: IUser[];
    userOneToOneLogin?: string;
    userOneToOneId?: number;
}

export class TestMapstruct implements ITestMapstruct {
    constructor(
        public id?: number,
        public testManyToOnes?: ITestManyToOneMySuffix[],
        public testManyToManies?: ITestManyToManyMySuffix[],
        public testManyRelPaginDTOS?: ITestManyRelPaginDTOMySuffix[],
        public testOneToOneId?: number,
        public userOneToManyLogin?: string,
        public userOneToManyId?: number,
        public userManyToManies?: IUser[],
        public userOneToOneLogin?: string,
        public userOneToOneId?: number
    ) {}
}
