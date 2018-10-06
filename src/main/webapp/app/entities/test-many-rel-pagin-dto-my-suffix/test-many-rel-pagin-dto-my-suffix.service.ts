import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';

type EntityResponseType = HttpResponse<ITestManyRelPaginDTOMySuffix>;
type EntityArrayResponseType = HttpResponse<ITestManyRelPaginDTOMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TestManyRelPaginDTOMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/test-many-rel-pagin-dtos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/test-many-rel-pagin-dtos';

    constructor(private http: HttpClient) {}

    create(testManyRelPaginDTO: ITestManyRelPaginDTOMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITestManyRelPaginDTOMySuffix>(this.resourceUrl, testManyRelPaginDTO, { observe: 'response' });
    }

    update(testManyRelPaginDTO: ITestManyRelPaginDTOMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITestManyRelPaginDTOMySuffix>(this.resourceUrl, testManyRelPaginDTO, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITestManyRelPaginDTOMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestManyRelPaginDTOMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITestManyRelPaginDTOMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
