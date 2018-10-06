export interface IEntityWithServiceImpl {
    id?: number;
    clara?: string;
}

export class EntityWithServiceImpl implements IEntityWithServiceImpl {
    constructor(public id?: number, public clara?: string) {}
}
