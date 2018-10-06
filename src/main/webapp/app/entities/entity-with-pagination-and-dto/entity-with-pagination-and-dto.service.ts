import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithPaginationAndDTO } from 'app/shared/model/entity-with-pagination-and-dto.model';

type EntityResponseType = HttpResponse<IEntityWithPaginationAndDTO>;
type EntityArrayResponseType = HttpResponse<IEntityWithPaginationAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithPaginationAndDTOService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-pagination-and-dtos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-pagination-and-dtos';

    constructor(private http: HttpClient) {}

    create(entityWithPaginationAndDTO: IEntityWithPaginationAndDTO): Observable<EntityResponseType> {
        return this.http.post<IEntityWithPaginationAndDTO>(this.resourceUrl, entityWithPaginationAndDTO, { observe: 'response' });
    }

    update(entityWithPaginationAndDTO: IEntityWithPaginationAndDTO): Observable<EntityResponseType> {
        return this.http.put<IEntityWithPaginationAndDTO>(this.resourceUrl, entityWithPaginationAndDTO, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithPaginationAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithPaginationAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithPaginationAndDTO[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
