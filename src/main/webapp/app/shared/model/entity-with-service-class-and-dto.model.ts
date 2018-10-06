export interface IEntityWithServiceClassAndDTO {
    id?: number;
    lucas?: string;
}

export class EntityWithServiceClassAndDTO implements IEntityWithServiceClassAndDTO {
    constructor(public id?: number, public lucas?: string) {}
}
