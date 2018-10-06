import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';

type EntityResponseType = HttpResponse<IFieldTestPagerEntity>;
type EntityArrayResponseType = HttpResponse<IFieldTestPagerEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestPagerEntityService {
    private resourceUrl = SERVER_API_URL + 'api/field-test-pager-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/field-test-pager-entities';

    constructor(private http: HttpClient) {}

    create(fieldTestPagerEntity: IFieldTestPagerEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestPagerEntity);
        return this.http
            .post<IFieldTestPagerEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fieldTestPagerEntity: IFieldTestPagerEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestPagerEntity);
        return this.http
            .put<IFieldTestPagerEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFieldTestPagerEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestPagerEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestPagerEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fieldTestPagerEntity: IFieldTestPagerEntity): IFieldTestPagerEntity {
        const copy: IFieldTestPagerEntity = Object.assign({}, fieldTestPagerEntity, {
            localDateJade:
                fieldTestPagerEntity.localDateJade != null && fieldTestPagerEntity.localDateJade.isValid()
                    ? fieldTestPagerEntity.localDateJade.format(DATE_FORMAT)
                    : null,
            localDateRequiredJade:
                fieldTestPagerEntity.localDateRequiredJade != null && fieldTestPagerEntity.localDateRequiredJade.isValid()
                    ? fieldTestPagerEntity.localDateRequiredJade.format(DATE_FORMAT)
                    : null,
            instantJade:
                fieldTestPagerEntity.instantJade != null && fieldTestPagerEntity.instantJade.isValid()
                    ? fieldTestPagerEntity.instantJade.toJSON()
                    : null,
            instanteRequiredJade:
                fieldTestPagerEntity.instanteRequiredJade != null && fieldTestPagerEntity.instanteRequiredJade.isValid()
                    ? fieldTestPagerEntity.instanteRequiredJade.toJSON()
                    : null,
            zonedDateTimeJade:
                fieldTestPagerEntity.zonedDateTimeJade != null && fieldTestPagerEntity.zonedDateTimeJade.isValid()
                    ? fieldTestPagerEntity.zonedDateTimeJade.toJSON()
                    : null,
            zonedDateTimeRequiredJade:
                fieldTestPagerEntity.zonedDateTimeRequiredJade != null && fieldTestPagerEntity.zonedDateTimeRequiredJade.isValid()
                    ? fieldTestPagerEntity.zonedDateTimeRequiredJade.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.localDateJade = res.body.localDateJade != null ? moment(res.body.localDateJade) : null;
        res.body.localDateRequiredJade = res.body.localDateRequiredJade != null ? moment(res.body.localDateRequiredJade) : null;
        res.body.instantJade = res.body.instantJade != null ? moment(res.body.instantJade) : null;
        res.body.instanteRequiredJade = res.body.instanteRequiredJade != null ? moment(res.body.instanteRequiredJade) : null;
        res.body.zonedDateTimeJade = res.body.zonedDateTimeJade != null ? moment(res.body.zonedDateTimeJade) : null;
        res.body.zonedDateTimeRequiredJade = res.body.zonedDateTimeRequiredJade != null ? moment(res.body.zonedDateTimeRequiredJade) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fieldTestPagerEntity: IFieldTestPagerEntity) => {
            fieldTestPagerEntity.localDateJade =
                fieldTestPagerEntity.localDateJade != null ? moment(fieldTestPagerEntity.localDateJade) : null;
            fieldTestPagerEntity.localDateRequiredJade =
                fieldTestPagerEntity.localDateRequiredJade != null ? moment(fieldTestPagerEntity.localDateRequiredJade) : null;
            fieldTestPagerEntity.instantJade = fieldTestPagerEntity.instantJade != null ? moment(fieldTestPagerEntity.instantJade) : null;
            fieldTestPagerEntity.instanteRequiredJade =
                fieldTestPagerEntity.instanteRequiredJade != null ? moment(fieldTestPagerEntity.instanteRequiredJade) : null;
            fieldTestPagerEntity.zonedDateTimeJade =
                fieldTestPagerEntity.zonedDateTimeJade != null ? moment(fieldTestPagerEntity.zonedDateTimeJade) : null;
            fieldTestPagerEntity.zonedDateTimeRequiredJade =
                fieldTestPagerEntity.zonedDateTimeRequiredJade != null ? moment(fieldTestPagerEntity.zonedDateTimeRequiredJade) : null;
        });
        return res;
    }
}
