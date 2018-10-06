import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';

export interface ITestManyRelPaginDTOMySuffix {
    id?: number;
    testMapstructs?: ITestMapstruct[];
}

export class TestManyRelPaginDTOMySuffix implements ITestManyRelPaginDTOMySuffix {
    constructor(public id?: number, public testMapstructs?: ITestMapstruct[]) {}
}
