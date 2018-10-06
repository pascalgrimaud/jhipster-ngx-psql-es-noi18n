import { IDivision } from 'app/shared/model/test-root/division.model';

export interface IPlace {
    id?: number;
    name?: string;
    numberOfSeats?: number;
    shortName?: string;
    colorBackground?: string;
    colorText?: string;
    description?: any;
    preferredDivisions?: IDivision[];
    owner?: IDivision;
}

export class Place implements IPlace {
    constructor(
        public id?: number,
        public name?: string,
        public numberOfSeats?: number,
        public shortName?: string,
        public colorBackground?: string,
        public colorText?: string,
        public description?: any,
        public preferredDivisions?: IDivision[],
        public owner?: IDivision
    ) {}
}
