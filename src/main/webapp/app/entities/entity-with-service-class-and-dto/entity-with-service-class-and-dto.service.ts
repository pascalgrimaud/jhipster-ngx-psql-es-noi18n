import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';

type EntityResponseType = HttpResponse<IEntityWithServiceClassAndDTO>;
type EntityArrayResponseType = HttpResponse<IEntityWithServiceClassAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassAndDTOService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-class-and-dtos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-service-class-and-dtos';

    constructor(private http: HttpClient) {}

    create(entityWithServiceClassAndDTO: IEntityWithServiceClassAndDTO): Observable<EntityResponseType> {
        return this.http.post<IEntityWithServiceClassAndDTO>(this.resourceUrl, entityWithServiceClassAndDTO, { observe: 'response' });
    }

    update(entityWithServiceClassAndDTO: IEntityWithServiceClassAndDTO): Observable<EntityResponseType> {
        return this.http.put<IEntityWithServiceClassAndDTO>(this.resourceUrl, entityWithServiceClassAndDTO, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithServiceClassAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClassAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClassAndDTO[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
