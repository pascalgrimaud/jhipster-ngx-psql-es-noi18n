export interface IEntityWithServiceClassPaginationAndDTO {
    id?: number;
    lena?: string;
}

export class EntityWithServiceClassPaginationAndDTO implements IEntityWithServiceClassPaginationAndDTO {
    constructor(public id?: number, public lena?: string) {}
}
