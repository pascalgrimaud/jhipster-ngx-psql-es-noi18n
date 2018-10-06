import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';

type EntityResponseType = HttpResponse<ITestOneToOneMySuffix>;
type EntityArrayResponseType = HttpResponse<ITestOneToOneMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TestOneToOneMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/test-one-to-ones';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-one-to-ones';

    constructor(private http: HttpClient) {}

    create(testOneToOne: ITestOneToOneMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITestOneToOneMySuffix>(this.resourceUrl, testOneToOne, { observe: 'response' });
    }

    update(testOneToOne: ITestOneToOneMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITestOneToOneMySuffix>(this.resourceUrl, testOneToOne, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestOneToOneMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestOneToOneMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestOneToOneMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
