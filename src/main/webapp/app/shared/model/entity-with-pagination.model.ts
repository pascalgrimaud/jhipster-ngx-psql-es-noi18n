export interface IEntityWithPagination {
    id?: number;
    nathan?: string;
}

export class EntityWithPagination implements IEntityWithPagination {
    constructor(public id?: number, public nathan?: string) {}
}
