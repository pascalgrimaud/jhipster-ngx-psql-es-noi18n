import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithServiceClassAndPagination } from 'app/shared/model/entity-with-service-class-and-pagination.model';

type EntityResponseType = HttpResponse<IEntityWithServiceClassAndPagination>;
type EntityArrayResponseType = HttpResponse<IEntityWithServiceClassAndPagination[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassAndPaginationService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-class-and-paginations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-service-class-and-paginations';

    constructor(private http: HttpClient) {}

    create(entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination): Observable<EntityResponseType> {
        return this.http.post<IEntityWithServiceClassAndPagination>(this.resourceUrl, entityWithServiceClassAndPagination, {
            observe: 'response'
        });
    }

    update(entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination): Observable<EntityResponseType> {
        return this.http.put<IEntityWithServiceClassAndPagination>(this.resourceUrl, entityWithServiceClassAndPagination, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithServiceClassAndPagination>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClassAndPagination[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClassAndPagination[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
