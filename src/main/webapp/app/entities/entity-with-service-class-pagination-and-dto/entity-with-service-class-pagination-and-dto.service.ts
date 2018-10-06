import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithServiceClassPaginationAndDTO } from 'app/shared/model/entity-with-service-class-pagination-and-dto.model';

type EntityResponseType = HttpResponse<IEntityWithServiceClassPaginationAndDTO>;
type EntityArrayResponseType = HttpResponse<IEntityWithServiceClassPaginationAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassPaginationAndDTOService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-class-pagination-and-dtos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-service-class-pagination-and-dtos';

    constructor(private http: HttpClient) {}

    create(entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO): Observable<EntityResponseType> {
        return this.http.post<IEntityWithServiceClassPaginationAndDTO>(this.resourceUrl, entityWithServiceClassPaginationAndDTO, {
            observe: 'response'
        });
    }

    update(entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO): Observable<EntityResponseType> {
        return this.http.put<IEntityWithServiceClassPaginationAndDTO>(this.resourceUrl, entityWithServiceClassPaginationAndDTO, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithServiceClassPaginationAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClassPaginationAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClassPaginationAndDTO[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
