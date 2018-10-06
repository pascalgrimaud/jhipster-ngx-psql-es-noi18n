import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';

type EntityResponseType = HttpResponse<ITestMapstruct>;
type EntityArrayResponseType = HttpResponse<ITestMapstruct[]>;

@Injectable({ providedIn: 'root' })
export class TestMapstructService {
    private resourceUrl = SERVER_API_URL + 'api/test-mapstructs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-mapstructs';

    constructor(private http: HttpClient) {}

    create(testMapstruct: ITestMapstruct): Observable<EntityResponseType> {
        return this.http.post<ITestMapstruct>(this.resourceUrl, testMapstruct, { observe: 'response' });
    }

    update(testMapstruct: ITestMapstruct): Observable<EntityResponseType> {
        return this.http.put<ITestMapstruct>(this.resourceUrl, testMapstruct, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestMapstruct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestMapstruct[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestMapstruct[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
