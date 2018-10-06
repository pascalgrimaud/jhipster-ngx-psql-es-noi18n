package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.EnumFieldClass;
import com.mycompany.myapp.domain.enumeration.EnumRequiredFieldClass;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.BigDecimalFilter;
import io.github.jhipster.service.filter.InstantFilter;
import io.github.jhipster.service.filter.LocalDateFilter;
import io.github.jhipster.service.filter.ZonedDateTimeFilter;

/**
 * Criteria class for the FieldTestServiceClassEntity entity. This class is used in FieldTestServiceClassEntityResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /field-test-service-class-entities?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class FieldTestServiceClassEntityCriteria implements Serializable {
    /**
     * Class for filtering EnumFieldClass
     */
    public static class EnumFieldClassFilter extends Filter<EnumFieldClass> {
    }
    /**
     * Class for filtering EnumRequiredFieldClass
     */
    public static class EnumRequiredFieldClassFilter extends Filter<EnumRequiredFieldClass> {
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter stringBob;

    private StringFilter stringRequiredBob;

    private StringFilter stringMinlengthBob;

    private StringFilter stringMaxlengthBob;

    private StringFilter stringPatternBob;

    private IntegerFilter integerBob;

    private IntegerFilter integerRequiredBob;

    private IntegerFilter integerMinBob;

    private IntegerFilter integerMaxBob;

    private LongFilter longBob;

    private LongFilter longRequiredBob;

    private LongFilter longMinBob;

    private LongFilter longMaxBob;

    private FloatFilter floatBob;

    private FloatFilter floatRequiredBob;

    private FloatFilter floatMinBob;

    private FloatFilter floatMaxBob;

    private DoubleFilter doubleRequiredBob;

    private DoubleFilter doubleMinBob;

    private DoubleFilter doubleMaxBob;

    private BigDecimalFilter bigDecimalRequiredBob;

    private BigDecimalFilter bigDecimalMinBob;

    private BigDecimalFilter bigDecimalMaxBob;

    private LocalDateFilter localDateBob;

    private LocalDateFilter localDateRequiredBob;

    private InstantFilter instantBob;

    private InstantFilter instanteRequiredBob;

    private ZonedDateTimeFilter zonedDateTimeBob;

    private ZonedDateTimeFilter zonedDateTimeRequiredBob;

    private BooleanFilter booleanBob;

    private BooleanFilter booleanRequiredBob;

    private EnumFieldClassFilter enumBob;

    private EnumRequiredFieldClassFilter enumRequiredBob;

    public FieldTestServiceClassEntityCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getStringBob() {
        return stringBob;
    }

    public void setStringBob(StringFilter stringBob) {
        this.stringBob = stringBob;
    }

    public StringFilter getStringRequiredBob() {
        return stringRequiredBob;
    }

    public void setStringRequiredBob(StringFilter stringRequiredBob) {
        this.stringRequiredBob = stringRequiredBob;
    }

    public StringFilter getStringMinlengthBob() {
        return stringMinlengthBob;
    }

    public void setStringMinlengthBob(StringFilter stringMinlengthBob) {
        this.stringMinlengthBob = stringMinlengthBob;
    }

    public StringFilter getStringMaxlengthBob() {
        return stringMaxlengthBob;
    }

    public void setStringMaxlengthBob(StringFilter stringMaxlengthBob) {
        this.stringMaxlengthBob = stringMaxlengthBob;
    }

    public StringFilter getStringPatternBob() {
        return stringPatternBob;
    }

    public void setStringPatternBob(StringFilter stringPatternBob) {
        this.stringPatternBob = stringPatternBob;
    }

    public IntegerFilter getIntegerBob() {
        return integerBob;
    }

    public void setIntegerBob(IntegerFilter integerBob) {
        this.integerBob = integerBob;
    }

    public IntegerFilter getIntegerRequiredBob() {
        return integerRequiredBob;
    }

    public void setIntegerRequiredBob(IntegerFilter integerRequiredBob) {
        this.integerRequiredBob = integerRequiredBob;
    }

    public IntegerFilter getIntegerMinBob() {
        return integerMinBob;
    }

    public void setIntegerMinBob(IntegerFilter integerMinBob) {
        this.integerMinBob = integerMinBob;
    }

    public IntegerFilter getIntegerMaxBob() {
        return integerMaxBob;
    }

    public void setIntegerMaxBob(IntegerFilter integerMaxBob) {
        this.integerMaxBob = integerMaxBob;
    }

    public LongFilter getLongBob() {
        return longBob;
    }

    public void setLongBob(LongFilter longBob) {
        this.longBob = longBob;
    }

    public LongFilter getLongRequiredBob() {
        return longRequiredBob;
    }

    public void setLongRequiredBob(LongFilter longRequiredBob) {
        this.longRequiredBob = longRequiredBob;
    }

    public LongFilter getLongMinBob() {
        return longMinBob;
    }

    public void setLongMinBob(LongFilter longMinBob) {
        this.longMinBob = longMinBob;
    }

    public LongFilter getLongMaxBob() {
        return longMaxBob;
    }

    public void setLongMaxBob(LongFilter longMaxBob) {
        this.longMaxBob = longMaxBob;
    }

    public FloatFilter getFloatBob() {
        return floatBob;
    }

    public void setFloatBob(FloatFilter floatBob) {
        this.floatBob = floatBob;
    }

    public FloatFilter getFloatRequiredBob() {
        return floatRequiredBob;
    }

    public void setFloatRequiredBob(FloatFilter floatRequiredBob) {
        this.floatRequiredBob = floatRequiredBob;
    }

    public FloatFilter getFloatMinBob() {
        return floatMinBob;
    }

    public void setFloatMinBob(FloatFilter floatMinBob) {
        this.floatMinBob = floatMinBob;
    }

    public FloatFilter getFloatMaxBob() {
        return floatMaxBob;
    }

    public void setFloatMaxBob(FloatFilter floatMaxBob) {
        this.floatMaxBob = floatMaxBob;
    }

    public DoubleFilter getDoubleRequiredBob() {
        return doubleRequiredBob;
    }

    public void setDoubleRequiredBob(DoubleFilter doubleRequiredBob) {
        this.doubleRequiredBob = doubleRequiredBob;
    }

    public DoubleFilter getDoubleMinBob() {
        return doubleMinBob;
    }

    public void setDoubleMinBob(DoubleFilter doubleMinBob) {
        this.doubleMinBob = doubleMinBob;
    }

    public DoubleFilter getDoubleMaxBob() {
        return doubleMaxBob;
    }

    public void setDoubleMaxBob(DoubleFilter doubleMaxBob) {
        this.doubleMaxBob = doubleMaxBob;
    }

    public BigDecimalFilter getBigDecimalRequiredBob() {
        return bigDecimalRequiredBob;
    }

    public void setBigDecimalRequiredBob(BigDecimalFilter bigDecimalRequiredBob) {
        this.bigDecimalRequiredBob = bigDecimalRequiredBob;
    }

    public BigDecimalFilter getBigDecimalMinBob() {
        return bigDecimalMinBob;
    }

    public void setBigDecimalMinBob(BigDecimalFilter bigDecimalMinBob) {
        this.bigDecimalMinBob = bigDecimalMinBob;
    }

    public BigDecimalFilter getBigDecimalMaxBob() {
        return bigDecimalMaxBob;
    }

    public void setBigDecimalMaxBob(BigDecimalFilter bigDecimalMaxBob) {
        this.bigDecimalMaxBob = bigDecimalMaxBob;
    }

    public LocalDateFilter getLocalDateBob() {
        return localDateBob;
    }

    public void setLocalDateBob(LocalDateFilter localDateBob) {
        this.localDateBob = localDateBob;
    }

    public LocalDateFilter getLocalDateRequiredBob() {
        return localDateRequiredBob;
    }

    public void setLocalDateRequiredBob(LocalDateFilter localDateRequiredBob) {
        this.localDateRequiredBob = localDateRequiredBob;
    }

    public InstantFilter getInstantBob() {
        return instantBob;
    }

    public void setInstantBob(InstantFilter instantBob) {
        this.instantBob = instantBob;
    }

    public InstantFilter getInstanteRequiredBob() {
        return instanteRequiredBob;
    }

    public void setInstanteRequiredBob(InstantFilter instanteRequiredBob) {
        this.instanteRequiredBob = instanteRequiredBob;
    }

    public ZonedDateTimeFilter getZonedDateTimeBob() {
        return zonedDateTimeBob;
    }

    public void setZonedDateTimeBob(ZonedDateTimeFilter zonedDateTimeBob) {
        this.zonedDateTimeBob = zonedDateTimeBob;
    }

    public ZonedDateTimeFilter getZonedDateTimeRequiredBob() {
        return zonedDateTimeRequiredBob;
    }

    public void setZonedDateTimeRequiredBob(ZonedDateTimeFilter zonedDateTimeRequiredBob) {
        this.zonedDateTimeRequiredBob = zonedDateTimeRequiredBob;
    }

    public BooleanFilter getBooleanBob() {
        return booleanBob;
    }

    public void setBooleanBob(BooleanFilter booleanBob) {
        this.booleanBob = booleanBob;
    }

    public BooleanFilter getBooleanRequiredBob() {
        return booleanRequiredBob;
    }

    public void setBooleanRequiredBob(BooleanFilter booleanRequiredBob) {
        this.booleanRequiredBob = booleanRequiredBob;
    }

    public EnumFieldClassFilter getEnumBob() {
        return enumBob;
    }

    public void setEnumBob(EnumFieldClassFilter enumBob) {
        this.enumBob = enumBob;
    }

    public EnumRequiredFieldClassFilter getEnumRequiredBob() {
        return enumRequiredBob;
    }

    public void setEnumRequiredBob(EnumRequiredFieldClassFilter enumRequiredBob) {
        this.enumRequiredBob = enumRequiredBob;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final FieldTestServiceClassEntityCriteria that = (FieldTestServiceClassEntityCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(stringBob, that.stringBob) &&
            Objects.equals(stringRequiredBob, that.stringRequiredBob) &&
            Objects.equals(stringMinlengthBob, that.stringMinlengthBob) &&
            Objects.equals(stringMaxlengthBob, that.stringMaxlengthBob) &&
            Objects.equals(stringPatternBob, that.stringPatternBob) &&
            Objects.equals(integerBob, that.integerBob) &&
            Objects.equals(integerRequiredBob, that.integerRequiredBob) &&
            Objects.equals(integerMinBob, that.integerMinBob) &&
            Objects.equals(integerMaxBob, that.integerMaxBob) &&
            Objects.equals(longBob, that.longBob) &&
            Objects.equals(longRequiredBob, that.longRequiredBob) &&
            Objects.equals(longMinBob, that.longMinBob) &&
            Objects.equals(longMaxBob, that.longMaxBob) &&
            Objects.equals(floatBob, that.floatBob) &&
            Objects.equals(floatRequiredBob, that.floatRequiredBob) &&
            Objects.equals(floatMinBob, that.floatMinBob) &&
            Objects.equals(floatMaxBob, that.floatMaxBob) &&
            Objects.equals(doubleRequiredBob, that.doubleRequiredBob) &&
            Objects.equals(doubleMinBob, that.doubleMinBob) &&
            Objects.equals(doubleMaxBob, that.doubleMaxBob) &&
            Objects.equals(bigDecimalRequiredBob, that.bigDecimalRequiredBob) &&
            Objects.equals(bigDecimalMinBob, that.bigDecimalMinBob) &&
            Objects.equals(bigDecimalMaxBob, that.bigDecimalMaxBob) &&
            Objects.equals(localDateBob, that.localDateBob) &&
            Objects.equals(localDateRequiredBob, that.localDateRequiredBob) &&
            Objects.equals(instantBob, that.instantBob) &&
            Objects.equals(instanteRequiredBob, that.instanteRequiredBob) &&
            Objects.equals(zonedDateTimeBob, that.zonedDateTimeBob) &&
            Objects.equals(zonedDateTimeRequiredBob, that.zonedDateTimeRequiredBob) &&
            Objects.equals(booleanBob, that.booleanBob) &&
            Objects.equals(booleanRequiredBob, that.booleanRequiredBob) &&
            Objects.equals(enumBob, that.enumBob) &&
            Objects.equals(enumRequiredBob, that.enumRequiredBob);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        stringBob,
        stringRequiredBob,
        stringMinlengthBob,
        stringMaxlengthBob,
        stringPatternBob,
        integerBob,
        integerRequiredBob,
        integerMinBob,
        integerMaxBob,
        longBob,
        longRequiredBob,
        longMinBob,
        longMaxBob,
        floatBob,
        floatRequiredBob,
        floatMinBob,
        floatMaxBob,
        doubleRequiredBob,
        doubleMinBob,
        doubleMaxBob,
        bigDecimalRequiredBob,
        bigDecimalMinBob,
        bigDecimalMaxBob,
        localDateBob,
        localDateRequiredBob,
        instantBob,
        instanteRequiredBob,
        zonedDateTimeBob,
        zonedDateTimeRequiredBob,
        booleanBob,
        booleanRequiredBob,
        enumBob,
        enumRequiredBob
        );
    }

    @Override
    public String toString() {
        return "FieldTestServiceClassEntityCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (stringBob != null ? "stringBob=" + stringBob + ", " : "") +
                (stringRequiredBob != null ? "stringRequiredBob=" + stringRequiredBob + ", " : "") +
                (stringMinlengthBob != null ? "stringMinlengthBob=" + stringMinlengthBob + ", " : "") +
                (stringMaxlengthBob != null ? "stringMaxlengthBob=" + stringMaxlengthBob + ", " : "") +
                (stringPatternBob != null ? "stringPatternBob=" + stringPatternBob + ", " : "") +
                (integerBob != null ? "integerBob=" + integerBob + ", " : "") +
                (integerRequiredBob != null ? "integerRequiredBob=" + integerRequiredBob + ", " : "") +
                (integerMinBob != null ? "integerMinBob=" + integerMinBob + ", " : "") +
                (integerMaxBob != null ? "integerMaxBob=" + integerMaxBob + ", " : "") +
                (longBob != null ? "longBob=" + longBob + ", " : "") +
                (longRequiredBob != null ? "longRequiredBob=" + longRequiredBob + ", " : "") +
                (longMinBob != null ? "longMinBob=" + longMinBob + ", " : "") +
                (longMaxBob != null ? "longMaxBob=" + longMaxBob + ", " : "") +
                (floatBob != null ? "floatBob=" + floatBob + ", " : "") +
                (floatRequiredBob != null ? "floatRequiredBob=" + floatRequiredBob + ", " : "") +
                (floatMinBob != null ? "floatMinBob=" + floatMinBob + ", " : "") +
                (floatMaxBob != null ? "floatMaxBob=" + floatMaxBob + ", " : "") +
                (doubleRequiredBob != null ? "doubleRequiredBob=" + doubleRequiredBob + ", " : "") +
                (doubleMinBob != null ? "doubleMinBob=" + doubleMinBob + ", " : "") +
                (doubleMaxBob != null ? "doubleMaxBob=" + doubleMaxBob + ", " : "") +
                (bigDecimalRequiredBob != null ? "bigDecimalRequiredBob=" + bigDecimalRequiredBob + ", " : "") +
                (bigDecimalMinBob != null ? "bigDecimalMinBob=" + bigDecimalMinBob + ", " : "") +
                (bigDecimalMaxBob != null ? "bigDecimalMaxBob=" + bigDecimalMaxBob + ", " : "") +
                (localDateBob != null ? "localDateBob=" + localDateBob + ", " : "") +
                (localDateRequiredBob != null ? "localDateRequiredBob=" + localDateRequiredBob + ", " : "") +
                (instantBob != null ? "instantBob=" + instantBob + ", " : "") +
                (instanteRequiredBob != null ? "instanteRequiredBob=" + instanteRequiredBob + ", " : "") +
                (zonedDateTimeBob != null ? "zonedDateTimeBob=" + zonedDateTimeBob + ", " : "") +
                (zonedDateTimeRequiredBob != null ? "zonedDateTimeRequiredBob=" + zonedDateTimeRequiredBob + ", " : "") +
                (booleanBob != null ? "booleanBob=" + booleanBob + ", " : "") +
                (booleanRequiredBob != null ? "booleanRequiredBob=" + booleanRequiredBob + ", " : "") +
                (enumBob != null ? "enumBob=" + enumBob + ", " : "") +
                (enumRequiredBob != null ? "enumRequiredBob=" + enumRequiredBob + ", " : "") +
            "}";
    }

}
