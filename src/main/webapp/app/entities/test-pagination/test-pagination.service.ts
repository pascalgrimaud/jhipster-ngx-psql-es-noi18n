import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestPagination } from 'app/shared/model/test-pagination.model';

type EntityResponseType = HttpResponse<ITestPagination>;
type EntityArrayResponseType = HttpResponse<ITestPagination[]>;

@Injectable({ providedIn: 'root' })
export class TestPaginationService {
    private resourceUrl = SERVER_API_URL + 'api/test-paginations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-paginations';

    constructor(private http: HttpClient) {}

    create(testPagination: ITestPagination): Observable<EntityResponseType> {
        return this.http.post<ITestPagination>(this.resourceUrl, testPagination, { observe: 'response' });
    }

    update(testPagination: ITestPagination): Observable<EntityResponseType> {
        return this.http.put<ITestPagination>(this.resourceUrl, testPagination, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestPagination>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestPagination[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestPagination[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
