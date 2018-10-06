import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithServiceImplPaginationAndDTO } from 'app/shared/model/entity-with-service-impl-pagination-and-dto.model';

type EntityResponseType = HttpResponse<IEntityWithServiceImplPaginationAndDTO>;
type EntityArrayResponseType = HttpResponse<IEntityWithServiceImplPaginationAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplPaginationAndDTOService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-impl-pagination-and-dtos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-service-impl-pagination-and-dtos';

    constructor(private http: HttpClient) {}

    create(entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO): Observable<EntityResponseType> {
        return this.http.post<IEntityWithServiceImplPaginationAndDTO>(this.resourceUrl, entityWithServiceImplPaginationAndDTO, {
            observe: 'response'
        });
    }

    update(entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO): Observable<EntityResponseType> {
        return this.http.put<IEntityWithServiceImplPaginationAndDTO>(this.resourceUrl, entityWithServiceImplPaginationAndDTO, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithServiceImplPaginationAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceImplPaginationAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceImplPaginationAndDTO[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
