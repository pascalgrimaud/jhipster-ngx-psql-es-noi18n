import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';

type EntityResponseType = HttpResponse<ITestInfiniteScroll>;
type EntityArrayResponseType = HttpResponse<ITestInfiniteScroll[]>;

@Injectable({ providedIn: 'root' })
export class TestInfiniteScrollService {
    private resourceUrl = SERVER_API_URL + 'api/test-infinite-scrolls';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-infinite-scrolls';

    constructor(private http: HttpClient) {}

    create(testInfiniteScroll: ITestInfiniteScroll): Observable<EntityResponseType> {
        return this.http.post<ITestInfiniteScroll>(this.resourceUrl, testInfiniteScroll, { observe: 'response' });
    }

    update(testInfiniteScroll: ITestInfiniteScroll): Observable<EntityResponseType> {
        return this.http.put<ITestInfiniteScroll>(this.resourceUrl, testInfiniteScroll, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestInfiniteScroll>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestInfiniteScroll[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestInfiniteScroll[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
