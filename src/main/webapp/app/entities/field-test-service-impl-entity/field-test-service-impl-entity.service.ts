import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';

type EntityResponseType = HttpResponse<IFieldTestServiceImplEntity>;
type EntityArrayResponseType = HttpResponse<IFieldTestServiceImplEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestServiceImplEntityService {
    private resourceUrl = SERVER_API_URL + 'api/field-test-service-impl-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/field-test-service-impl-entities';

    constructor(private http: HttpClient) {}

    create(fieldTestServiceImplEntity: IFieldTestServiceImplEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestServiceImplEntity);
        return this.http
            .post<IFieldTestServiceImplEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fieldTestServiceImplEntity: IFieldTestServiceImplEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestServiceImplEntity);
        return this.http
            .put<IFieldTestServiceImplEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFieldTestServiceImplEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestServiceImplEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestServiceImplEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fieldTestServiceImplEntity: IFieldTestServiceImplEntity): IFieldTestServiceImplEntity {
        const copy: IFieldTestServiceImplEntity = Object.assign({}, fieldTestServiceImplEntity, {
            localDateMika:
                fieldTestServiceImplEntity.localDateMika != null && fieldTestServiceImplEntity.localDateMika.isValid()
                    ? fieldTestServiceImplEntity.localDateMika.format(DATE_FORMAT)
                    : null,
            localDateRequiredMika:
                fieldTestServiceImplEntity.localDateRequiredMika != null && fieldTestServiceImplEntity.localDateRequiredMika.isValid()
                    ? fieldTestServiceImplEntity.localDateRequiredMika.format(DATE_FORMAT)
                    : null,
            instantMika:
                fieldTestServiceImplEntity.instantMika != null && fieldTestServiceImplEntity.instantMika.isValid()
                    ? fieldTestServiceImplEntity.instantMika.toJSON()
                    : null,
            instanteRequiredMika:
                fieldTestServiceImplEntity.instanteRequiredMika != null && fieldTestServiceImplEntity.instanteRequiredMika.isValid()
                    ? fieldTestServiceImplEntity.instanteRequiredMika.toJSON()
                    : null,
            zonedDateTimeMika:
                fieldTestServiceImplEntity.zonedDateTimeMika != null && fieldTestServiceImplEntity.zonedDateTimeMika.isValid()
                    ? fieldTestServiceImplEntity.zonedDateTimeMika.toJSON()
                    : null,
            zonedDateTimeRequiredMika:
                fieldTestServiceImplEntity.zonedDateTimeRequiredMika != null &&
                fieldTestServiceImplEntity.zonedDateTimeRequiredMika.isValid()
                    ? fieldTestServiceImplEntity.zonedDateTimeRequiredMika.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.localDateMika = res.body.localDateMika != null ? moment(res.body.localDateMika) : null;
        res.body.localDateRequiredMika = res.body.localDateRequiredMika != null ? moment(res.body.localDateRequiredMika) : null;
        res.body.instantMika = res.body.instantMika != null ? moment(res.body.instantMika) : null;
        res.body.instanteRequiredMika = res.body.instanteRequiredMika != null ? moment(res.body.instanteRequiredMika) : null;
        res.body.zonedDateTimeMika = res.body.zonedDateTimeMika != null ? moment(res.body.zonedDateTimeMika) : null;
        res.body.zonedDateTimeRequiredMika = res.body.zonedDateTimeRequiredMika != null ? moment(res.body.zonedDateTimeRequiredMika) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fieldTestServiceImplEntity: IFieldTestServiceImplEntity) => {
            fieldTestServiceImplEntity.localDateMika =
                fieldTestServiceImplEntity.localDateMika != null ? moment(fieldTestServiceImplEntity.localDateMika) : null;
            fieldTestServiceImplEntity.localDateRequiredMika =
                fieldTestServiceImplEntity.localDateRequiredMika != null ? moment(fieldTestServiceImplEntity.localDateRequiredMika) : null;
            fieldTestServiceImplEntity.instantMika =
                fieldTestServiceImplEntity.instantMika != null ? moment(fieldTestServiceImplEntity.instantMika) : null;
            fieldTestServiceImplEntity.instanteRequiredMika =
                fieldTestServiceImplEntity.instanteRequiredMika != null ? moment(fieldTestServiceImplEntity.instanteRequiredMika) : null;
            fieldTestServiceImplEntity.zonedDateTimeMika =
                fieldTestServiceImplEntity.zonedDateTimeMika != null ? moment(fieldTestServiceImplEntity.zonedDateTimeMika) : null;
            fieldTestServiceImplEntity.zonedDateTimeRequiredMika =
                fieldTestServiceImplEntity.zonedDateTimeRequiredMika != null
                    ? moment(fieldTestServiceImplEntity.zonedDateTimeRequiredMika)
                    : null;
        });
        return res;
    }
}
