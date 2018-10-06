import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithDTO } from 'app/shared/model/entity-with-dto.model';

type EntityResponseType = HttpResponse<IEntityWithDTO>;
type EntityArrayResponseType = HttpResponse<IEntityWithDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithDTOService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-dtos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-dtos';

    constructor(private http: HttpClient) {}

    create(entityWithDTO: IEntityWithDTO): Observable<EntityResponseType> {
        return this.http.post<IEntityWithDTO>(this.resourceUrl, entityWithDTO, { observe: 'response' });
    }

    update(entityWithDTO: IEntityWithDTO): Observable<EntityResponseType> {
        return this.http.put<IEntityWithDTO>(this.resourceUrl, entityWithDTO, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithDTO[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
