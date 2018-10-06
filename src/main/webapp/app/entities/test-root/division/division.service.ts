import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDivision } from 'app/shared/model/test-root/division.model';

type EntityResponseType = HttpResponse<IDivision>;
type EntityArrayResponseType = HttpResponse<IDivision[]>;

@Injectable({ providedIn: 'root' })
export class DivisionService {
    private resourceUrl = SERVER_API_URL + 'api/divisions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/divisions';

    constructor(private http: HttpClient) {}

    create(division: IDivision): Observable<EntityResponseType> {
        return this.http.post<IDivision>(this.resourceUrl, division, { observe: 'response' });
    }

    update(division: IDivision): Observable<EntityResponseType> {
        return this.http.put<IDivision>(this.resourceUrl, division, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDivision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDivision[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDivision[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
