import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithPagination } from 'app/shared/model/entity-with-pagination.model';

type EntityResponseType = HttpResponse<IEntityWithPagination>;
type EntityArrayResponseType = HttpResponse<IEntityWithPagination[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithPaginationService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-paginations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-paginations';

    constructor(private http: HttpClient) {}

    create(entityWithPagination: IEntityWithPagination): Observable<EntityResponseType> {
        return this.http.post<IEntityWithPagination>(this.resourceUrl, entityWithPagination, { observe: 'response' });
    }

    update(entityWithPagination: IEntityWithPagination): Observable<EntityResponseType> {
        return this.http.put<IEntityWithPagination>(this.resourceUrl, entityWithPagination, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithPagination>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithPagination[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithPagination[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
