import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';

type EntityResponseType = HttpResponse<IEntityWithServiceClass>;
type EntityArrayResponseType = HttpResponse<IEntityWithServiceClass[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassService {
    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-classes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entity-with-service-classes';

    constructor(private http: HttpClient) {}

    create(entityWithServiceClass: IEntityWithServiceClass): Observable<EntityResponseType> {
        return this.http.post<IEntityWithServiceClass>(this.resourceUrl, entityWithServiceClass, { observe: 'response' });
    }

    update(entityWithServiceClass: IEntityWithServiceClass): Observable<EntityResponseType> {
        return this.http.put<IEntityWithServiceClass>(this.resourceUrl, entityWithServiceClass, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEntityWithServiceClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClass[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEntityWithServiceClass[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
