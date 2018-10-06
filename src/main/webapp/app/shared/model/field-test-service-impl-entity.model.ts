import { Moment } from 'moment';

export const enum EnumFieldClass {
    ENUM_VALUE_1 = 'ENUM_VALUE_1',
    ENUM_VALUE_2 = 'ENUM_VALUE_2',
    ENUM_VALUE_3 = 'ENUM_VALUE_3'
}

export const enum EnumRequiredFieldClass {
    ENUM_VALUE_1 = 'ENUM_VALUE_1',
    ENUM_VALUE_2 = 'ENUM_VALUE_2',
    ENUM_VALUE_3 = 'ENUM_VALUE_3'
}

export interface IFieldTestServiceImplEntity {
    id?: number;
    stringMika?: string;
    stringRequiredMika?: string;
    stringMinlengthMika?: string;
    stringMaxlengthMika?: string;
    stringPatternMika?: string;
    integerMika?: number;
    integerRequiredMika?: number;
    integerMinMika?: number;
    integerMaxMika?: number;
    longMika?: number;
    longRequiredMika?: number;
    longMinMika?: number;
    longMaxMika?: number;
    floatMika?: number;
    floatRequiredMika?: number;
    floatMinMika?: number;
    floatMaxMika?: number;
    doubleRequiredMika?: number;
    doubleMinMika?: number;
    doubleMaxMika?: number;
    bigDecimalRequiredMika?: number;
    bigDecimalMinMika?: number;
    bigDecimalMaxMika?: number;
    localDateMika?: Moment;
    localDateRequiredMika?: Moment;
    instantMika?: Moment;
    instanteRequiredMika?: Moment;
    zonedDateTimeMika?: Moment;
    zonedDateTimeRequiredMika?: Moment;
    booleanMika?: boolean;
    booleanRequiredMika?: boolean;
    enumMika?: EnumFieldClass;
    enumRequiredMika?: EnumRequiredFieldClass;
    byteImageMikaContentType?: string;
    byteImageMika?: any;
    byteImageRequiredMikaContentType?: string;
    byteImageRequiredMika?: any;
    byteImageMinbytesMikaContentType?: string;
    byteImageMinbytesMika?: any;
    byteImageMaxbytesMikaContentType?: string;
    byteImageMaxbytesMika?: any;
    byteAnyMikaContentType?: string;
    byteAnyMika?: any;
    byteAnyRequiredMikaContentType?: string;
    byteAnyRequiredMika?: any;
    byteAnyMinbytesMikaContentType?: string;
    byteAnyMinbytesMika?: any;
    byteAnyMaxbytesMikaContentType?: string;
    byteAnyMaxbytesMika?: any;
    byteTextMika?: any;
    byteTextRequiredMika?: any;
    byteTextMinbytesMika?: any;
    byteTextMaxbytesMika?: any;
}

export class FieldTestServiceImplEntity implements IFieldTestServiceImplEntity {
    constructor(
        public id?: number,
        public stringMika?: string,
        public stringRequiredMika?: string,
        public stringMinlengthMika?: string,
        public stringMaxlengthMika?: string,
        public stringPatternMika?: string,
        public integerMika?: number,
        public integerRequiredMika?: number,
        public integerMinMika?: number,
        public integerMaxMika?: number,
        public longMika?: number,
        public longRequiredMika?: number,
        public longMinMika?: number,
        public longMaxMika?: number,
        public floatMika?: number,
        public floatRequiredMika?: number,
        public floatMinMika?: number,
        public floatMaxMika?: number,
        public doubleRequiredMika?: number,
        public doubleMinMika?: number,
        public doubleMaxMika?: number,
        public bigDecimalRequiredMika?: number,
        public bigDecimalMinMika?: number,
        public bigDecimalMaxMika?: number,
        public localDateMika?: Moment,
        public localDateRequiredMika?: Moment,
        public instantMika?: Moment,
        public instanteRequiredMika?: Moment,
        public zonedDateTimeMika?: Moment,
        public zonedDateTimeRequiredMika?: Moment,
        public booleanMika?: boolean,
        public booleanRequiredMika?: boolean,
        public enumMika?: EnumFieldClass,
        public enumRequiredMika?: EnumRequiredFieldClass,
        public byteImageMikaContentType?: string,
        public byteImageMika?: any,
        public byteImageRequiredMikaContentType?: string,
        public byteImageRequiredMika?: any,
        public byteImageMinbytesMikaContentType?: string,
        public byteImageMinbytesMika?: any,
        public byteImageMaxbytesMikaContentType?: string,
        public byteImageMaxbytesMika?: any,
        public byteAnyMikaContentType?: string,
        public byteAnyMika?: any,
        public byteAnyRequiredMikaContentType?: string,
        public byteAnyRequiredMika?: any,
        public byteAnyMinbytesMikaContentType?: string,
        public byteAnyMinbytesMika?: any,
        public byteAnyMaxbytesMikaContentType?: string,
        public byteAnyMaxbytesMika?: any,
        public byteTextMika?: any,
        public byteTextRequiredMika?: any,
        public byteTextMinbytesMika?: any,
        public byteTextMaxbytesMika?: any
    ) {
        this.booleanMika = this.booleanMika || false;
        this.booleanRequiredMika = this.booleanRequiredMika || false;
    }
}
