package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.BankAccountType;
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

/**
 * Criteria class for the BankAccount entity. This class is used in BankAccountResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /bank-accounts?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class BankAccountCriteria implements Serializable {
    /**
     * Class for filtering BankAccountType
     */
    public static class BankAccountTypeFilter extends Filter<BankAccountType> {
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private IntegerFilter bankNumber;

    private LongFilter agencyNumber;

    private FloatFilter lastOperationDuration;

    private DoubleFilter meanOperationDuration;

    private BigDecimalFilter balance;

    private LocalDateFilter openingDay;

    private InstantFilter lastOperationDate;

    private BooleanFilter active;

    private BankAccountTypeFilter accountType;

    private LongFilter userId;

    private LongFilter operationId;

    public BankAccountCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IntegerFilter getBankNumber() {
        return bankNumber;
    }

    public void setBankNumber(IntegerFilter bankNumber) {
        this.bankNumber = bankNumber;
    }

    public LongFilter getAgencyNumber() {
        return agencyNumber;
    }

    public void setAgencyNumber(LongFilter agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    public FloatFilter getLastOperationDuration() {
        return lastOperationDuration;
    }

    public void setLastOperationDuration(FloatFilter lastOperationDuration) {
        this.lastOperationDuration = lastOperationDuration;
    }

    public DoubleFilter getMeanOperationDuration() {
        return meanOperationDuration;
    }

    public void setMeanOperationDuration(DoubleFilter meanOperationDuration) {
        this.meanOperationDuration = meanOperationDuration;
    }

    public BigDecimalFilter getBalance() {
        return balance;
    }

    public void setBalance(BigDecimalFilter balance) {
        this.balance = balance;
    }

    public LocalDateFilter getOpeningDay() {
        return openingDay;
    }

    public void setOpeningDay(LocalDateFilter openingDay) {
        this.openingDay = openingDay;
    }

    public InstantFilter getLastOperationDate() {
        return lastOperationDate;
    }

    public void setLastOperationDate(InstantFilter lastOperationDate) {
        this.lastOperationDate = lastOperationDate;
    }

    public BooleanFilter getActive() {
        return active;
    }

    public void setActive(BooleanFilter active) {
        this.active = active;
    }

    public BankAccountTypeFilter getAccountType() {
        return accountType;
    }

    public void setAccountType(BankAccountTypeFilter accountType) {
        this.accountType = accountType;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getOperationId() {
        return operationId;
    }

    public void setOperationId(LongFilter operationId) {
        this.operationId = operationId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final BankAccountCriteria that = (BankAccountCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(bankNumber, that.bankNumber) &&
            Objects.equals(agencyNumber, that.agencyNumber) &&
            Objects.equals(lastOperationDuration, that.lastOperationDuration) &&
            Objects.equals(meanOperationDuration, that.meanOperationDuration) &&
            Objects.equals(balance, that.balance) &&
            Objects.equals(openingDay, that.openingDay) &&
            Objects.equals(lastOperationDate, that.lastOperationDate) &&
            Objects.equals(active, that.active) &&
            Objects.equals(accountType, that.accountType) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(operationId, that.operationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        name,
        bankNumber,
        agencyNumber,
        lastOperationDuration,
        meanOperationDuration,
        balance,
        openingDay,
        lastOperationDate,
        active,
        accountType,
        userId,
        operationId
        );
    }

    @Override
    public String toString() {
        return "BankAccountCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (bankNumber != null ? "bankNumber=" + bankNumber + ", " : "") +
                (agencyNumber != null ? "agencyNumber=" + agencyNumber + ", " : "") +
                (lastOperationDuration != null ? "lastOperationDuration=" + lastOperationDuration + ", " : "") +
                (meanOperationDuration != null ? "meanOperationDuration=" + meanOperationDuration + ", " : "") +
                (balance != null ? "balance=" + balance + ", " : "") +
                (openingDay != null ? "openingDay=" + openingDay + ", " : "") +
                (lastOperationDate != null ? "lastOperationDate=" + lastOperationDate + ", " : "") +
                (active != null ? "active=" + active + ", " : "") +
                (accountType != null ? "accountType=" + accountType + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
                (operationId != null ? "operationId=" + operationId + ", " : "") +
            "}";
    }

}
