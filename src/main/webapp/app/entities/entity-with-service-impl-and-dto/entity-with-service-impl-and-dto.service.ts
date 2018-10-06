import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';

type EntityResponseType = HttpResponse<IEntityWithServiceImplAndDTO>;
type EntityArrayResponseType = HttpResponse<IEntityWithServiceImplAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndDTOService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-impl-and-dtos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-service-impl-and-dtos';

    constructor(private http: HttpClient) {}

    create(entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO): Observable<EntityResponseType> {
        return this.http.post<IEntityWithServiceImplAndDTO>(this.resourceUrl, entityWithServiceImplAndDTO, { observe: 'response' });
    }

    update(entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO): Observable<EntityResponseType> {
        return this.http.put<IEntityWithServiceImplAndDTO>(this.resourceUrl, entityWithServiceImplAndDTO, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithServiceImplAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceImplAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceImplAndDTO[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
