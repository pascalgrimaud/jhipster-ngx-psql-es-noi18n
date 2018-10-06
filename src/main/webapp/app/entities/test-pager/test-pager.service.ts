import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestPager } from 'app/shared/model/test-pager.model';

type EntityResponseType = HttpResponse<ITestPager>;
type EntityArrayResponseType = HttpResponse<ITestPager[]>;

@Injectable({ providedIn: 'root' })
export class TestPagerService {
    private resourceUrl = SERVER_API_URL + 'api/test-pagers';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-pagers';

    constructor(private http: HttpClient) {}

    create(testPager: ITestPager): Observable<EntityResponseType> {
        return this.http.post<ITestPager>(this.resourceUrl, testPager, { observe: 'response' });
    }

    update(testPager: ITestPager): Observable<EntityResponseType> {
        return this.http.put<ITestPager>(this.resourceUrl, testPager, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestPager>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestPager[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestPager[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
