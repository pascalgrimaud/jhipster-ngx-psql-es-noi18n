import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';

type EntityResponseType = HttpResponse<ITestTwoRelationshipsSameEntityMySuffix>;
type EntityArrayResponseType = HttpResponse<ITestTwoRelationshipsSameEntityMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TestTwoRelationshipsSameEntityMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/test-two-relationships-same-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-two-relationships-same-entities';

    constructor(private http: HttpClient) {}

    create(testTwoRelationshipsSameEntity: ITestTwoRelationshipsSameEntityMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITestTwoRelationshipsSameEntityMySuffix>(this.resourceUrl, testTwoRelationshipsSameEntity, {
            observe: 'response'
        });
    }

    update(testTwoRelationshipsSameEntity: ITestTwoRelationshipsSameEntityMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITestTwoRelationshipsSameEntityMySuffix>(this.resourceUrl, testTwoRelationshipsSameEntity, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestTwoRelationshipsSameEntityMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestTwoRelationshipsSameEntityMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestTwoRelationshipsSameEntityMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
