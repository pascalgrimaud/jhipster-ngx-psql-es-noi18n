import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';

type EntityResponseType = HttpResponse<IFieldTestMapstructEntity>;
type EntityArrayResponseType = HttpResponse<IFieldTestMapstructEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestMapstructEntityService {
    private resourceUrl = SERVER_API_URL + 'api/field-test-mapstruct-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/field-test-mapstruct-entities';

    constructor(private http: HttpClient) {}

    create(fieldTestMapstructEntity: IFieldTestMapstructEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestMapstructEntity);
        return this.http
            .post<IFieldTestMapstructEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fieldTestMapstructEntity: IFieldTestMapstructEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestMapstructEntity);
        return this.http
            .put<IFieldTestMapstructEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFieldTestMapstructEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestMapstructEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestMapstructEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fieldTestMapstructEntity: IFieldTestMapstructEntity): IFieldTestMapstructEntity {
        const copy: IFieldTestMapstructEntity = Object.assign({}, fieldTestMapstructEntity, {
            localDateEva:
                fieldTestMapstructEntity.localDateEva != null && fieldTestMapstructEntity.localDateEva.isValid()
                    ? fieldTestMapstructEntity.localDateEva.format(DATE_FORMAT)
                    : null,
            localDateRequiredEva:
                fieldTestMapstructEntity.localDateRequiredEva != null && fieldTestMapstructEntity.localDateRequiredEva.isValid()
                    ? fieldTestMapstructEntity.localDateRequiredEva.format(DATE_FORMAT)
                    : null,
            instantEva:
                fieldTestMapstructEntity.instantEva != null && fieldTestMapstructEntity.instantEva.isValid()
                    ? fieldTestMapstructEntity.instantEva.toJSON()
                    : null,
            instanteRequiredEva:
                fieldTestMapstructEntity.instanteRequiredEva != null && fieldTestMapstructEntity.instanteRequiredEva.isValid()
                    ? fieldTestMapstructEntity.instanteRequiredEva.toJSON()
                    : null,
            zonedDateTimeEva:
                fieldTestMapstructEntity.zonedDateTimeEva != null && fieldTestMapstructEntity.zonedDateTimeEva.isValid()
                    ? fieldTestMapstructEntity.zonedDateTimeEva.toJSON()
                    : null,
            zonedDateTimeRequiredEva:
                fieldTestMapstructEntity.zonedDateTimeRequiredEva != null && fieldTestMapstructEntity.zonedDateTimeRequiredEva.isValid()
                    ? fieldTestMapstructEntity.zonedDateTimeRequiredEva.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.localDateEva = res.body.localDateEva != null ? moment(res.body.localDateEva) : null;
        res.body.localDateRequiredEva = res.body.localDateRequiredEva != null ? moment(res.body.localDateRequiredEva) : null;
        res.body.instantEva = res.body.instantEva != null ? moment(res.body.instantEva) : null;
        res.body.instanteRequiredEva = res.body.instanteRequiredEva != null ? moment(res.body.instanteRequiredEva) : null;
        res.body.zonedDateTimeEva = res.body.zonedDateTimeEva != null ? moment(res.body.zonedDateTimeEva) : null;
        res.body.zonedDateTimeRequiredEva = res.body.zonedDateTimeRequiredEva != null ? moment(res.body.zonedDateTimeRequiredEva) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fieldTestMapstructEntity: IFieldTestMapstructEntity) => {
            fieldTestMapstructEntity.localDateEva =
                fieldTestMapstructEntity.localDateEva != null ? moment(fieldTestMapstructEntity.localDateEva) : null;
            fieldTestMapstructEntity.localDateRequiredEva =
                fieldTestMapstructEntity.localDateRequiredEva != null ? moment(fieldTestMapstructEntity.localDateRequiredEva) : null;
            fieldTestMapstructEntity.instantEva =
                fieldTestMapstructEntity.instantEva != null ? moment(fieldTestMapstructEntity.instantEva) : null;
            fieldTestMapstructEntity.instanteRequiredEva =
                fieldTestMapstructEntity.instanteRequiredEva != null ? moment(fieldTestMapstructEntity.instanteRequiredEva) : null;
            fieldTestMapstructEntity.zonedDateTimeEva =
                fieldTestMapstructEntity.zonedDateTimeEva != null ? moment(fieldTestMapstructEntity.zonedDateTimeEva) : null;
            fieldTestMapstructEntity.zonedDateTimeRequiredEva =
                fieldTestMapstructEntity.zonedDateTimeRequiredEva != null
                    ? moment(fieldTestMapstructEntity.zonedDateTimeRequiredEva)
                    : null;
        });
        return res;
    }
}
