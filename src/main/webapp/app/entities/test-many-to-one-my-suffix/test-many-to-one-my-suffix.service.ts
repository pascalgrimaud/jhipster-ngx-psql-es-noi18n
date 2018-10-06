import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';

type EntityResponseType = HttpResponse<ITestManyToOneMySuffix>;
type EntityArrayResponseType = HttpResponse<ITestManyToOneMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TestManyToOneMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/test-many-to-ones';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-many-to-ones';

    constructor(private http: HttpClient) {}

    create(testManyToOne: ITestManyToOneMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITestManyToOneMySuffix>(this.resourceUrl, testManyToOne, { observe: 'response' });
    }

    update(testManyToOne: ITestManyToOneMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITestManyToOneMySuffix>(this.resourceUrl, testManyToOne, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestManyToOneMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestManyToOneMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestManyToOneMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
