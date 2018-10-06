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

export interface IFieldTestPagerEntity {
    id?: number;
    stringJade?: string;
    stringRequiredJade?: string;
    stringMinlengthJade?: string;
    stringMaxlengthJade?: string;
    stringPatternJade?: string;
    integerJade?: number;
    integerRequiredJade?: number;
    integerMinJade?: number;
    integerMaxJade?: number;
    longJade?: number;
    longRequiredJade?: number;
    longMinJade?: number;
    longMaxJade?: number;
    floatJade?: number;
    floatRequiredJade?: number;
    floatMinJade?: number;
    floatMaxJade?: number;
    doubleRequiredJade?: number;
    doubleMinJade?: number;
    doubleMaxJade?: number;
    bigDecimalRequiredJade?: number;
    bigDecimalMinJade?: number;
    bigDecimalMaxJade?: number;
    localDateJade?: Moment;
    localDateRequiredJade?: Moment;
    instantJade?: Moment;
    instanteRequiredJade?: Moment;
    zonedDateTimeJade?: Moment;
    zonedDateTimeRequiredJade?: Moment;
    booleanJade?: boolean;
    booleanRequiredJade?: boolean;
    enumJade?: EnumFieldClass;
    enumRequiredJade?: EnumRequiredFieldClass;
    byteImageJadeContentType?: string;
    byteImageJade?: any;
    byteImageRequiredJadeContentType?: string;
    byteImageRequiredJade?: any;
    byteImageMinbytesJadeContentType?: string;
    byteImageMinbytesJade?: any;
    byteImageMaxbytesJadeContentType?: string;
    byteImageMaxbytesJade?: any;
    byteAnyJadeContentType?: string;
    byteAnyJade?: any;
    byteAnyRequiredJadeContentType?: string;
    byteAnyRequiredJade?: any;
    byteAnyMinbytesJadeContentType?: string;
    byteAnyMinbytesJade?: any;
    byteAnyMaxbytesJadeContentType?: string;
    byteAnyMaxbytesJade?: any;
    byteTextJade?: any;
    byteTextRequiredJade?: any;
    byteTextMinbytesJade?: any;
    byteTextMaxbytesJade?: any;
}

export class FieldTestPagerEntity implements IFieldTestPagerEntity {
    constructor(
        public id?: number,
        public stringJade?: string,
        public stringRequiredJade?: string,
        public stringMinlengthJade?: string,
        public stringMaxlengthJade?: string,
        public stringPatternJade?: string,
        public integerJade?: number,
        public integerRequiredJade?: number,
        public integerMinJade?: number,
        public integerMaxJade?: number,
        public longJade?: number,
        public longRequiredJade?: number,
        public longMinJade?: number,
        public longMaxJade?: number,
        public floatJade?: number,
        public floatRequiredJade?: number,
        public floatMinJade?: number,
        public floatMaxJade?: number,
        public doubleRequiredJade?: number,
        public doubleMinJade?: number,
        public doubleMaxJade?: number,
        public bigDecimalRequiredJade?: number,
        public bigDecimalMinJade?: number,
        public bigDecimalMaxJade?: number,
        public localDateJade?: Moment,
        public localDateRequiredJade?: Moment,
        public instantJade?: Moment,
        public instanteRequiredJade?: Moment,
        public zonedDateTimeJade?: Moment,
        public zonedDateTimeRequiredJade?: Moment,
        public booleanJade?: boolean,
        public booleanRequiredJade?: boolean,
        public enumJade?: EnumFieldClass,
        public enumRequiredJade?: EnumRequiredFieldClass,
        public byteImageJadeContentType?: string,
        public byteImageJade?: any,
        public byteImageRequiredJadeContentType?: string,
        public byteImageRequiredJade?: any,
        public byteImageMinbytesJadeContentType?: string,
        public byteImageMinbytesJade?: any,
        public byteImageMaxbytesJadeContentType?: string,
        public byteImageMaxbytesJade?: any,
        public byteAnyJadeContentType?: string,
        public byteAnyJade?: any,
        public byteAnyRequiredJadeContentType?: string,
        public byteAnyRequiredJade?: any,
        public byteAnyMinbytesJadeContentType?: string,
        public byteAnyMinbytesJade?: any,
        public byteAnyMaxbytesJadeContentType?: string,
        public byteAnyMaxbytesJade?: any,
        public byteTextJade?: any,
        public byteTextRequiredJade?: any,
        public byteTextMinbytesJade?: any,
        public byteTextMaxbytesJade?: any
    ) {
        this.booleanJade = this.booleanJade || false;
        this.booleanRequiredJade = this.booleanRequiredJade || false;
    }
}
