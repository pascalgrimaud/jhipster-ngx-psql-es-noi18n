export interface IEntityWithServiceClass {
    id?: number;
    zoe?: string;
}

export class EntityWithServiceClass implements IEntityWithServiceClass {
    constructor(public id?: number, public zoe?: string) {}
}
