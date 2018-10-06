import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBankAccountMySuffix } from 'app/shared/model/test-root/bank-account-my-suffix.model';

type EntityResponseType = HttpResponse<IBankAccountMySuffix>;
type EntityArrayResponseType = HttpResponse<IBankAccountMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class BankAccountMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/bank-accounts';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/bank-accounts';

    constructor(private http: HttpClient) {}

    create(bankAccount: IBankAccountMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bankAccount);
        return this.http
            .post<IBankAccountMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(bankAccount: IBankAccountMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bankAccount);
        return this.http
            .put<IBankAccountMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBankAccountMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBankAccountMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBankAccountMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(bankAccount: IBankAccountMySuffix): IBankAccountMySuffix {
        const copy: IBankAccountMySuffix = Object.assign({}, bankAccount, {
            openingDay:
                bankAccount.openingDay != null && bankAccount.openingDay.isValid() ? bankAccount.openingDay.format(DATE_FORMAT) : null,
            lastOperationDate:
                bankAccount.lastOperationDate != null && bankAccount.lastOperationDate.isValid()
                    ? bankAccount.lastOperationDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.openingDay = res.body.openingDay != null ? moment(res.body.openingDay) : null;
        res.body.lastOperationDate = res.body.lastOperationDate != null ? moment(res.body.lastOperationDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((bankAccount: IBankAccountMySuffix) => {
            bankAccount.openingDay = bankAccount.openingDay != null ? moment(bankAccount.openingDay) : null;
            bankAccount.lastOperationDate = bankAccount.lastOperationDate != null ? moment(bankAccount.lastOperationDate) : null;
        });
        return res;
    }
}
