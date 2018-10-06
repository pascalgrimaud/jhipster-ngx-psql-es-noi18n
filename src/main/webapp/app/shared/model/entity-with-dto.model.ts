export interface IEntityWithDTO {
    id?: number;
    emma?: string;
}

export class EntityWithDTO implements IEntityWithDTO {
    constructor(public id?: number, public emma?: string) {}
}
