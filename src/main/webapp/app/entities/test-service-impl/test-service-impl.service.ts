import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';

type EntityResponseType = HttpResponse<ITestServiceImpl>;
type EntityArrayResponseType = HttpResponse<ITestServiceImpl[]>;

@Injectable({ providedIn: 'root' })
export class TestServiceImplService {
    private resourceUrl = SERVER_API_URL + 'api/test-service-impls';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-service-impls';

    constructor(private http: HttpClient) {}

    create(testServiceImpl: ITestServiceImpl): Observable<EntityResponseType> {
        return this.http.post<ITestServiceImpl>(this.resourceUrl, testServiceImpl, { observe: 'response' });
    }

    update(testServiceImpl: ITestServiceImpl): Observable<EntityResponseType> {
        return this.http.put<ITestServiceImpl>(this.resourceUrl, testServiceImpl, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestServiceImpl>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestServiceImpl[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestServiceImpl[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
