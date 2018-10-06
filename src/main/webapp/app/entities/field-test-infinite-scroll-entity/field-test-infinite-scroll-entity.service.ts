import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';

type EntityResponseType = HttpResponse<IFieldTestInfiniteScrollEntity>;
type EntityArrayResponseType = HttpResponse<IFieldTestInfiniteScrollEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestInfiniteScrollEntityService {
    private resourceUrl = SERVER_API_URL + 'api/field-test-infinite-scroll-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/field-test-infinite-scroll-entities';

    constructor(private http: HttpClient) {}

    create(fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestInfiniteScrollEntity);
        return this.http
            .post<IFieldTestInfiniteScrollEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldTestInfiniteScrollEntity);
        return this.http
            .put<IFieldTestInfiniteScrollEntity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFieldTestInfiniteScrollEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestInfiniteScrollEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldTestInfiniteScrollEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity): IFieldTestInfiniteScrollEntity {
        const copy: IFieldTestInfiniteScrollEntity = Object.assign({}, fieldTestInfiniteScrollEntity, {
            localDateHugo:
                fieldTestInfiniteScrollEntity.localDateHugo != null && fieldTestInfiniteScrollEntity.localDateHugo.isValid()
                    ? fieldTestInfiniteScrollEntity.localDateHugo.format(DATE_FORMAT)
                    : null,
            localDateRequiredHugo:
                fieldTestInfiniteScrollEntity.localDateRequiredHugo != null && fieldTestInfiniteScrollEntity.localDateRequiredHugo.isValid()
                    ? fieldTestInfiniteScrollEntity.localDateRequiredHugo.format(DATE_FORMAT)
                    : null,
            instantHugo:
                fieldTestInfiniteScrollEntity.instantHugo != null && fieldTestInfiniteScrollEntity.instantHugo.isValid()
                    ? fieldTestInfiniteScrollEntity.instantHugo.toJSON()
                    : null,
            instanteRequiredHugo:
                fieldTestInfiniteScrollEntity.instanteRequiredHugo != null && fieldTestInfiniteScrollEntity.instanteRequiredHugo.isValid()
                    ? fieldTestInfiniteScrollEntity.instanteRequiredHugo.toJSON()
                    : null,
            zonedDateTimeHugo:
                fieldTestInfiniteScrollEntity.zonedDateTimeHugo != null && fieldTestInfiniteScrollEntity.zonedDateTimeHugo.isValid()
                    ? fieldTestInfiniteScrollEntity.zonedDateTimeHugo.toJSON()
                    : null,
            zonedDateTimeRequiredHugo:
                fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo != null &&
                fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo.isValid()
                    ? fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.localDateHugo = res.body.localDateHugo != null ? moment(res.body.localDateHugo) : null;
        res.body.localDateRequiredHugo = res.body.localDateRequiredHugo != null ? moment(res.body.localDateRequiredHugo) : null;
        res.body.instantHugo = res.body.instantHugo != null ? moment(res.body.instantHugo) : null;
        res.body.instanteRequiredHugo = res.body.instanteRequiredHugo != null ? moment(res.body.instanteRequiredHugo) : null;
        res.body.zonedDateTimeHugo = res.body.zonedDateTimeHugo != null ? moment(res.body.zonedDateTimeHugo) : null;
        res.body.zonedDateTimeRequiredHugo = res.body.zonedDateTimeRequiredHugo != null ? moment(res.body.zonedDateTimeRequiredHugo) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity) => {
            fieldTestInfiniteScrollEntity.localDateHugo =
                fieldTestInfiniteScrollEntity.localDateHugo != null ? moment(fieldTestInfiniteScrollEntity.localDateHugo) : null;
            fieldTestInfiniteScrollEntity.localDateRequiredHugo =
                fieldTestInfiniteScrollEntity.localDateRequiredHugo != null
                    ? moment(fieldTestInfiniteScrollEntity.localDateRequiredHugo)
                    : null;
            fieldTestInfiniteScrollEntity.instantHugo =
                fieldTestInfiniteScrollEntity.instantHugo != null ? moment(fieldTestInfiniteScrollEntity.instantHugo) : null;
            fieldTestInfiniteScrollEntity.instanteRequiredHugo =
                fieldTestInfiniteScrollEntity.instanteRequiredHugo != null
                    ? moment(fieldTestInfiniteScrollEntity.instanteRequiredHugo)
                    : null;
            fieldTestInfiniteScrollEntity.zonedDateTimeHugo =
                fieldTestInfiniteScrollEntity.zonedDateTimeHugo != null ? moment(fieldTestInfiniteScrollEntity.zonedDateTimeHugo) : null;
            fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo =
                fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo != null
                    ? moment(fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo)
                    : null;
        });
        return res;
    }
}
