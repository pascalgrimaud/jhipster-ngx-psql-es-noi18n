import { IPlace } from 'app/shared/model/test-root/place.model';

export const enum DivisionType {
    SCHOOL = 'SCHOOL',
    CLASS = 'CLASS',
    SUBGROUP = 'SUBGROUP'
}

export interface IDivision {
    id?: number;
    name?: string;
    shortName?: string;
    numberOfPeople?: number;
    divisionType?: DivisionType;
    colorBackground?: string;
    colorText?: string;
    divisionsPlaces?: IPlace[];
    preferredPlaces?: IPlace[];
}

export class Division implements IDivision {
    constructor(
        public id?: number,
        public name?: string,
        public shortName?: string,
        public numberOfPeople?: number,
        public divisionType?: DivisionType,
        public colorBackground?: string,
        public colorText?: string,
        public divisionsPlaces?: IPlace[],
        public preferredPlaces?: IPlace[]
    ) {}
}
