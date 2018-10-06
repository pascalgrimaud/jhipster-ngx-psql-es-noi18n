import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldTestServiceClassEntity } from 'app/shared/model/field-test-service-class-entity.model';

type EntityResponseType = HttpResponse<IFieldTestServiceClassEntity>;
type EntityArrayResponseType = HttpResponse<IFieldTestServiceClassEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestServiceClassEntityService {
    private resourceUrl = SERVER_API_URL + 'api/field-test-service-class-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/field-test-service-class-entities';

    constructor(private http: HttpClient) {}

    create(fieldTestServiceClassEntity: IFieldTestServiceClassEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestServiceClassEntity);
        return this.http
            .post<IFieldTestServiceClassEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fieldTestServiceClassEntity: IFieldTestServiceClassEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestServiceClassEntity);
        return this.http
            .put<IFieldTestServiceClassEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFieldTestServiceClassEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestServiceClassEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestServiceClassEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fieldTestServiceClassEntity: IFieldTestServiceClassEntity): IFieldTestServiceClassEntity {
        const copy: IFieldTestServiceClassEntity = Object.assign({}, fieldTestServiceClassEntity, {
            localDateBob:
                fieldTestServiceClassEntity.localDateBob != null && fieldTestServiceClassEntity.localDateBob.isValid()
                    ? fieldTestServiceClassEntity.localDateBob.format(DATE_FORMAT)
                    : null,
            localDateRequiredBob:
                fieldTestServiceClassEntity.localDateRequiredBob != null && fieldTestServiceClassEntity.localDateRequiredBob.isValid()
                    ? fieldTestServiceClassEntity.localDateRequiredBob.format(DATE_FORMAT)
                    : null,
            instantBob:
                fieldTestServiceClassEntity.instantBob != null && fieldTestServiceClassEntity.instantBob.isValid()
                    ? fieldTestServiceClassEntity.instantBob.toJSON()
                    : null,
            instanteRequiredBob:
                fieldTestServiceClassEntity.instanteRequiredBob != null && fieldTestServiceClassEntity.instanteRequiredBob.isValid()
                    ? fieldTestServiceClassEntity.instanteRequiredBob.toJSON()
                    : null,
            zonedDateTimeBob:
                fieldTestServiceClassEntity.zonedDateTimeBob != null && fieldTestServiceClassEntity.zonedDateTimeBob.isValid()
                    ? fieldTestServiceClassEntity.zonedDateTimeBob.toJSON()
                    : null,
            zonedDateTimeRequiredBob:
                fieldTestServiceClassEntity.zonedDateTimeRequiredBob != null &&
                fieldTestServiceClassEntity.zonedDateTimeRequiredBob.isValid()
                    ? fieldTestServiceClassEntity.zonedDateTimeRequiredBob.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.localDateBob = res.body.localDateBob != null ? moment(res.body.localDateBob) : null;
        res.body.localDateRequiredBob = res.body.localDateRequiredBob != null ? moment(res.body.localDateRequiredBob) : null;
        res.body.instantBob = res.body.instantBob != null ? moment(res.body.instantBob) : null;
        res.body.instanteRequiredBob = res.body.instanteRequiredBob != null ? moment(res.body.instanteRequiredBob) : null;
        res.body.zonedDateTimeBob = res.body.zonedDateTimeBob != null ? moment(res.body.zonedDateTimeBob) : null;
        res.body.zonedDateTimeRequiredBob = res.body.zonedDateTimeRequiredBob != null ? moment(res.body.zonedDateTimeRequiredBob) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fieldTestServiceClassEntity: IFieldTestServiceClassEntity) => {
            fieldTestServiceClassEntity.localDateBob =
                fieldTestServiceClassEntity.localDateBob != null ? moment(fieldTestServiceClassEntity.localDateBob) : null;
            fieldTestServiceClassEntity.localDateRequiredBob =
                fieldTestServiceClassEntity.localDateRequiredBob != null ? moment(fieldTestServiceClassEntity.localDateRequiredBob) : null;
            fieldTestServiceClassEntity.instantBob =
                fieldTestServiceClassEntity.instantBob != null ? moment(fieldTestServiceClassEntity.instantBob) : null;
            fieldTestServiceClassEntity.instanteRequiredBob =
                fieldTestServiceClassEntity.instanteRequiredBob != null ? moment(fieldTestServiceClassEntity.instanteRequiredBob) : null;
            fieldTestServiceClassEntity.zonedDateTimeBob =
                fieldTestServiceClassEntity.zonedDateTimeBob != null ? moment(fieldTestServiceClassEntity.zonedDateTimeBob) : null;
            fieldTestServiceClassEntity.zonedDateTimeRequiredBob =
                fieldTestServiceClassEntity.zonedDateTimeRequiredBob != null
                    ? moment(fieldTestServiceClassEntity.zonedDateTimeRequiredBob)
                    : null;
        });
        return res;
    }
}
