import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

type EntityResponseType = HttpResponse<ITestCustomTableName>;
type EntityArrayResponseType = HttpResponse<ITestCustomTableName[]>;

@Injectable({ providedIn: 'root' })
export class TestCustomTableNameService {
    private resourceUrl = SERVER_API_URL + 'api/test-custom-table-names';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-custom-table-names';

    constructor(private http: HttpClient) {}

    create(testCustomTableName: ITestCustomTableName): Observable<EntityResponseType> {
        return this.http.post<ITestCustomTableName>(this.resourceUrl, testCustomTableName, { observe: 'response' });
    }

    update(testCustomTableName: ITestCustomTableName): Observable<EntityResponseType> {
        return this.http.put<ITestCustomTableName>(this.resourceUrl, testCustomTableName, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestCustomTableName>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestCustomTableName[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestCustomTableName[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
