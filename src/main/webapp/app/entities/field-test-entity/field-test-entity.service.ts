import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldTestEntity } from 'app/shared/model/field-test-entity.model';

type EntityResponseType = HttpResponse<IFieldTestEntity>;
type EntityArrayResponseType = HttpResponse<IFieldTestEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestEntityService {
    private resourceUrl = SERVER_API_URL + 'api/field-test-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/field-test-entities';

    constructor(private http: HttpClient) {}

    create(fieldTestEntity: IFieldTestEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestEntity);
        return this.http
            .post<IFieldTestEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fieldTestEntity: IFieldTestEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestEntity);
        return this.http
            .put<IFieldTestEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFieldTestEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fieldTestEntity: IFieldTestEntity): IFieldTestEntity {
        const copy: IFieldTestEntity = Object.assign({}, fieldTestEntity, {
            localDateTom:
                fieldTestEntity.localDateTom != null && fieldTestEntity.localDateTom.isValid()
                    ? fieldTestEntity.localDateTom.format(DATE_FORMAT)
                    : null,
            localDateRequiredTom:
                fieldTestEntity.localDateRequiredTom != null && fieldTestEntity.localDateRequiredTom.isValid()
                    ? fieldTestEntity.localDateRequiredTom.format(DATE_FORMAT)
                    : null,
            instantTom:
                fieldTestEntity.instantTom != null && fieldTestEntity.instantTom.isValid() ? fieldTestEntity.instantTom.toJSON() : null,
            instantRequiredTom:
                fieldTestEntity.instantRequiredTom != null && fieldTestEntity.instantRequiredTom.isValid()
                    ? fieldTestEntity.instantRequiredTom.toJSON()
                    : null,
            zonedDateTimeTom:
                fieldTestEntity.zonedDateTimeTom != null && fieldTestEntity.zonedDateTimeTom.isValid()
                    ? fieldTestEntity.zonedDateTimeTom.toJSON()
                    : null,
            zonedDateTimeRequiredTom:
                fieldTestEntity.zonedDateTimeRequiredTom != null && fieldTestEntity.zonedDateTimeRequiredTom.isValid()
                    ? fieldTestEntity.zonedDateTimeRequiredTom.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.localDateTom = res.body.localDateTom != null ? moment(res.body.localDateTom) : null;
        res.body.localDateRequiredTom = res.body.localDateRequiredTom != null ? moment(res.body.localDateRequiredTom) : null;
        res.body.instantTom = res.body.instantTom != null ? moment(res.body.instantTom) : null;
        res.body.instantRequiredTom = res.body.instantRequiredTom != null ? moment(res.body.instantRequiredTom) : null;
        res.body.zonedDateTimeTom = res.body.zonedDateTimeTom != null ? moment(res.body.zonedDateTimeTom) : null;
        res.body.zonedDateTimeRequiredTom = res.body.zonedDateTimeRequiredTom != null ? moment(res.body.zonedDateTimeRequiredTom) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fieldTestEntity: IFieldTestEntity) => {
            fieldTestEntity.localDateTom = fieldTestEntity.localDateTom != null ? moment(fieldTestEntity.localDateTom) : null;
            fieldTestEntity.localDateRequiredTom =
                fieldTestEntity.localDateRequiredTom != null ? moment(fieldTestEntity.localDateRequiredTom) : null;
            fieldTestEntity.instantTom = fieldTestEntity.instantTom != null ? moment(fieldTestEntity.instantTom) : null;
            fieldTestEntity.instantRequiredTom =
                fieldTestEntity.instantRequiredTom != null ? moment(fieldTestEntity.instantRequiredTom) : null;
            fieldTestEntity.zonedDateTimeTom = fieldTestEntity.zonedDateTimeTom != null ? moment(fieldTestEntity.zonedDateTimeTom) : null;
            fieldTestEntity.zonedDateTimeRequiredTom =
                fieldTestEntity.zonedDateTimeRequiredTom != null ? moment(fieldTestEntity.zonedDateTimeRequiredTom) : null;
        });
        return res;
    }
}
