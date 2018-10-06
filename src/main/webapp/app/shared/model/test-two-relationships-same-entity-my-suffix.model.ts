import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { IUser } from 'app/core/user/user.model';
import { IDivision } from 'app/shared/model/test-root/division.model';

export interface ITestTwoRelationshipsSameEntityMySuffix {
    id?: number;
    firstRelationship?: ITestEntityMySuffixAlt;
    secondRelationship?: ITestEntityMySuffixAlt;
    userOne?: IUser;
    userTwo?: IUser;
    firstUniqueRequiredRelation?: IDivision;
    secondUniqueRequiredRelation?: IDivision;
}

export class TestTwoRelationshipsSameEntityMySuffix implements ITestTwoRelationshipsSameEntityMySuffix {
    constructor(
        public id?: number,
        public firstRelationship?: ITestEntityMySuffixAlt,
        public secondRelationship?: ITestEntityMySuffixAlt,
        public userOne?: IUser,
        public userTwo?: IUser,
        public firstUniqueRequiredRelation?: IDivision,
        public secondUniqueRequiredRelation?: IDivision
    ) {}
}
