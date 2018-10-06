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

export interface IFieldTestEntity {
    id?: number;
    stringTom?: string;
    stringRequiredTom?: string;
    stringMinlengthTom?: string;
    stringMaxlengthTom?: string;
    stringPatternTom?: string;
    integerTom?: number;
    integerRequiredTom?: number;
    integerMinTom?: number;
    integerMaxTom?: number;
    longTom?: number;
    longRequiredTom?: number;
    longMinTom?: number;
    longMaxTom?: number;
    floatTom?: number;
    floatRequiredTom?: number;
    floatMinTom?: number;
    floatMaxTom?: number;
    doubleRequiredTom?: number;
    doubleMinTom?: number;
    doubleMaxTom?: number;
    bigDecimalRequiredTom?: number;
    bigDecimalMinTom?: number;
    bigDecimalMaxTom?: number;
    localDateTom?: Moment;
    localDateRequiredTom?: Moment;
    instantTom?: Moment;
    instantRequiredTom?: Moment;
    zonedDateTimeTom?: Moment;
    zonedDateTimeRequiredTom?: Moment;
    booleanTom?: boolean;
    booleanRequiredTom?: boolean;
    enumTom?: EnumFieldClass;
    enumRequiredTom?: EnumRequiredFieldClass;
    byteImageTomContentType?: string;
    byteImageTom?: any;
    byteImageRequiredTomContentType?: string;
    byteImageRequiredTom?: any;
    byteImageMinbytesTomContentType?: string;
    byteImageMinbytesTom?: any;
    byteImageMaxbytesTomContentType?: string;
    byteImageMaxbytesTom?: any;
    byteAnyTomContentType?: string;
    byteAnyTom?: any;
    byteAnyRequiredTomContentType?: string;
    byteAnyRequiredTom?: any;
    byteAnyMinbytesTomContentType?: string;
    byteAnyMinbytesTom?: any;
    byteAnyMaxbytesTomContentType?: string;
    byteAnyMaxbytesTom?: any;
    byteTextTom?: any;
    byteTextRequiredTom?: any;
    byteTextMinbytesTom?: any;
    byteTextMaxbytesTom?: any;
}

export class FieldTestEntity implements IFieldTestEntity {
    constructor(
        public id?: number,
        public stringTom?: string,
        public stringRequiredTom?: string,
        public stringMinlengthTom?: string,
        public stringMaxlengthTom?: string,
        public stringPatternTom?: string,
        public integerTom?: number,
        public integerRequiredTom?: number,
        public integerMinTom?: number,
        public integerMaxTom?: number,
        public longTom?: number,
        public longRequiredTom?: number,
        public longMinTom?: number,
        public longMaxTom?: number,
        public floatTom?: number,
        public floatRequiredTom?: number,
        public floatMinTom?: number,
        public floatMaxTom?: number,
        public doubleRequiredTom?: number,
        public doubleMinTom?: number,
        public doubleMaxTom?: number,
        public bigDecimalRequiredTom?: number,
        public bigDecimalMinTom?: number,
        public bigDecimalMaxTom?: number,
        public localDateTom?: Moment,
        public localDateRequiredTom?: Moment,
        public instantTom?: Moment,
        public instantRequiredTom?: Moment,
        public zonedDateTimeTom?: Moment,
        public zonedDateTimeRequiredTom?: Moment,
        public booleanTom?: boolean,
        public booleanRequiredTom?: boolean,
        public enumTom?: EnumFieldClass,
        public enumRequiredTom?: EnumRequiredFieldClass,
        public byteImageTomContentType?: string,
        public byteImageTom?: any,
        public byteImageRequiredTomContentType?: string,
        public byteImageRequiredTom?: any,
        public byteImageMinbytesTomContentType?: string,
        public byteImageMinbytesTom?: any,
        public byteImageMaxbytesTomContentType?: string,
        public byteImageMaxbytesTom?: any,
        public byteAnyTomContentType?: string,
        public byteAnyTom?: any,
        public byteAnyRequiredTomContentType?: string,
        public byteAnyRequiredTom?: any,
        public byteAnyMinbytesTomContentType?: string,
        public byteAnyMinbytesTom?: any,
        public byteAnyMaxbytesTomContentType?: string,
        public byteAnyMaxbytesTom?: any,
        public byteTextTom?: any,
        public byteTextRequiredTom?: any,
        public byteTextMinbytesTom?: any,
        public byteTextMaxbytesTom?: any
    ) {
        this.booleanTom = this.booleanTom || false;
        this.booleanRequiredTom = this.booleanRequiredTom || false;
    }
}
