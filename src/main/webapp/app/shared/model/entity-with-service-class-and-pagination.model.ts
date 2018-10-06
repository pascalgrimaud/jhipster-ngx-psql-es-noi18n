export interface IEntityWithServiceClassAndPagination {
    id?: number;
    enzo?: string;
}

export class EntityWithServiceClassAndPagination implements IEntityWithServiceClassAndPagination {
    constructor(public id?: number, public enzo?: string) {}
}
