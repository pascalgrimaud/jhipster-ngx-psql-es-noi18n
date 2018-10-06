export interface IEntityWithServiceImplPaginationAndDTO {
    id?: number;
    theo?: string;
}

export class EntityWithServiceImplPaginationAndDTO implements IEntityWithServiceImplPaginationAndDTO {
    constructor(public id?: number, public theo?: string) {}
}
