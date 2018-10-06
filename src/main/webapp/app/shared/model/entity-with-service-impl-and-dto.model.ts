export interface IEntityWithServiceImplAndDTO {
    id?: number;
    louis?: string;
}

export class EntityWithServiceImplAndDTO implements IEntityWithServiceImplAndDTO {
    constructor(public id?: number, public louis?: string) {}
}
