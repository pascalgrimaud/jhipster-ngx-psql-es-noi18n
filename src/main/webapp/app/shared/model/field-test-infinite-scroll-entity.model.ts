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

export interface IFieldTestInfiniteScrollEntity {
    id?: number;
    stringHugo?: string;
    stringRequiredHugo?: string;
    stringMinlengthHugo?: string;
    stringMaxlengthHugo?: string;
    stringPatternHugo?: string;
    integerHugo?: number;
    integerRequiredHugo?: number;
    integerMinHugo?: number;
    integerMaxHugo?: number;
    longHugo?: number;
    longRequiredHugo?: number;
    longMinHugo?: number;
    longMaxHugo?: number;
    floatHugo?: number;
    floatRequiredHugo?: number;
    floatMinHugo?: number;
    floatMaxHugo?: number;
    doubleRequiredHugo?: number;
    doubleMinHugo?: number;
    doubleMaxHugo?: number;
    bigDecimalRequiredHugo?: number;
    bigDecimalMinHugo?: number;
    bigDecimalMaxHugo?: number;
    localDateHugo?: Moment;
    localDateRequiredHugo?: Moment;
    instantHugo?: Moment;
    instanteRequiredHugo?: Moment;
    zonedDateTimeHugo?: Moment;
    zonedDateTimeRequiredHugo?: Moment;
    booleanHugo?: boolean;
    booleanRequiredHugo?: boolean;
    enumHugo?: EnumFieldClass;
    enumRequiredHugo?: EnumRequiredFieldClass;
    byteImageHugoContentType?: string;
    byteImageHugo?: any;
    byteImageRequiredHugoContentType?: string;
    byteImageRequiredHugo?: any;
    byteImageMinbytesHugoContentType?: string;
    byteImageMinbytesHugo?: any;
    byteImageMaxbytesHugoContentType?: string;
    byteImageMaxbytesHugo?: any;
    byteAnyHugoContentType?: string;
    byteAnyHugo?: any;
    byteAnyRequiredHugoContentType?: string;
    byteAnyRequiredHugo?: any;
    byteAnyMinbytesHugoContentType?: string;
    byteAnyMinbytesHugo?: any;
    byteAnyMaxbytesHugoContentType?: string;
    byteAnyMaxbytesHugo?: any;
    byteTextHugo?: any;
    byteTextRequiredHugo?: any;
    byteTextMinbytesHugo?: any;
    byteTextMaxbytesHugo?: any;
}

export class FieldTestInfiniteScrollEntity implements IFieldTestInfiniteScrollEntity {
    constructor(
        public id?: number,
        public stringHugo?: string,
        public stringRequiredHugo?: string,
        public stringMinlengthHugo?: string,
        public stringMaxlengthHugo?: string,
        public stringPatternHugo?: string,
        public integerHugo?: number,
        public integerRequiredHugo?: number,
        public integerMinHugo?: number,
        public integerMaxHugo?: number,
        public longHugo?: number,
        public longRequiredHugo?: number,
        public longMinHugo?: number,
        public longMaxHugo?: number,
        public floatHugo?: number,
        public floatRequiredHugo?: number,
        public floatMinHugo?: number,
        public floatMaxHugo?: number,
        public doubleRequiredHugo?: number,
        public doubleMinHugo?: number,
        public doubleMaxHugo?: number,
        public bigDecimalRequiredHugo?: number,
        public bigDecimalMinHugo?: number,
        public bigDecimalMaxHugo?: number,
        public localDateHugo?: Moment,
        public localDateRequiredHugo?: Moment,
        public instantHugo?: Moment,
        public instanteRequiredHugo?: Moment,
        public zonedDateTimeHugo?: Moment,
        public zonedDateTimeRequiredHugo?: Moment,
        public booleanHugo?: boolean,
        public booleanRequiredHugo?: boolean,
        public enumHugo?: EnumFieldClass,
        public enumRequiredHugo?: EnumRequiredFieldClass,
        public byteImageHugoContentType?: string,
        public byteImageHugo?: any,
        public byteImageRequiredHugoContentType?: string,
        public byteImageRequiredHugo?: any,
        public byteImageMinbytesHugoContentType?: string,
        public byteImageMinbytesHugo?: any,
        public byteImageMaxbytesHugoContentType?: string,
        public byteImageMaxbytesHugo?: any,
        public byteAnyHugoContentType?: string,
        public byteAnyHugo?: any,
        public byteAnyRequiredHugoContentType?: string,
        public byteAnyRequiredHugo?: any,
        public byteAnyMinbytesHugoContentType?: string,
        public byteAnyMinbytesHugo?: any,
        public byteAnyMaxbytesHugoContentType?: string,
        public byteAnyMaxbytesHugo?: any,
        public byteTextHugo?: any,
        public byteTextRequiredHugo?: any,
        public byteTextMinbytesHugo?: any,
        public byteTextMaxbytesHugo?: any
    ) {
        this.booleanHugo = this.booleanHugo || false;
        this.booleanRequiredHugo = this.booleanRequiredHugo || false;
    }
}
