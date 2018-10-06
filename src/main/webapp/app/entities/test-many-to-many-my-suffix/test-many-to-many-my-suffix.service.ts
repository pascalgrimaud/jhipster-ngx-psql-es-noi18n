import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';

type EntityResponseType = HttpResponse<ITestManyToManyMySuffix>;
type EntityArrayResponseType = HttpResponse<ITestManyToManyMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TestManyToManyMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/test-many-to-manies';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-many-to-manies';

    constructor(private http: HttpClient) {}

    create(testManyToMany: ITestManyToManyMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITestManyToManyMySuffix>(this.resourceUrl, testManyToMany, { observe: 'response' });
    }

    update(testManyToMany: ITestManyToManyMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITestManyToManyMySuffix>(this.resourceUrl, testManyToMany, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestManyToManyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestManyToManyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestManyToManyMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
