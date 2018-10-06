import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestServiceClass } from 'app/shared/model/test-service-class.model';

type EntityResponseType = HttpResponse<ITestServiceClass>;
type EntityArrayResponseType = HttpResponse<ITestServiceClass[]>;

@Injectable({ providedIn: 'root' })
export class TestServiceClassService {
    private resourceUrl = SERVER_API_URL + 'api/test-service-classes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-service-classes';

    constructor(private http: HttpClient) {}

    create(testServiceClass: ITestServiceClass): Observable<EntityResponseType> {
        return this.http.post<ITestServiceClass>(this.resourceUrl, testServiceClass, { observe: 'response' });
    }

    update(testServiceClass: ITestServiceClass): Observable<EntityResponseType> {
        return this.http.put<ITestServiceClass>(this.resourceUrl, testServiceClass, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestServiceClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestServiceClass[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestServiceClass[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
