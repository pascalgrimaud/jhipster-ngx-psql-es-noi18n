import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';

type EntityResponseType = HttpResponse<ITestEntityMySuffixAlt>;
type EntityArrayResponseType = HttpResponse<ITestEntityMySuffixAlt[]>;

@Injectable({ providedIn: 'root' })
export class TestEntityMySuffixAltService {
    private resourceUrl = SERVER_API_URL + 'api/test-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-entities';

    constructor(private http: HttpClient) {}

    create(testEntity: ITestEntityMySuffixAlt): Observable<EntityResponseType> {
        return this.http.post<ITestEntityMySuffixAlt>(this.resourceUrl, testEntity, { observe: 'response' });
    }

    update(testEntity: ITestEntityMySuffixAlt): Observable<EntityResponseType> {
        return this.http.put<ITestEntityMySuffixAlt>(this.resourceUrl, testEntity, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestEntityMySuffixAlt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestEntityMySuffixAlt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestEntityMySuffixAlt[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
