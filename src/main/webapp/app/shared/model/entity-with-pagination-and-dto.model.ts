export interface IEntityWithPaginationAndDTO {
    id?: number;
    lea?: string;
}

export class EntityWithPaginationAndDTO implements IEntityWithPaginationAndDTO {
    constructor(public id?: number, public lea?: string) {}
}
