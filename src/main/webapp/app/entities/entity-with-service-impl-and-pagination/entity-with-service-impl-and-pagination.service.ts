import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithServiceImplAndPagination } from 'app/shared/model/entity-with-service-impl-and-pagination.model';

type EntityResponseType = HttpResponse<IEntityWithServiceImplAndPagination>;
type EntityArrayResponseType = HttpResponse<IEntityWithServiceImplAndPagination[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndPaginationService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-impl-and-paginations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-service-impl-and-paginations';

    constructor(private http: HttpClient) {}

    create(entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination): Observable<EntityResponseType> {
        return this.http.post<IEntityWithServiceImplAndPagination>(this.resourceUrl, entityWithServiceImplAndPagination, {
            observe: 'response'
        });
    }

    update(entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination): Observable<EntityResponseType> {
        return this.http.put<IEntityWithServiceImplAndPagination>(this.resourceUrl, entityWithServiceImplAndPagination, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithServiceImplAndPagination>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceImplAndPagination[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceImplAndPagination[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
