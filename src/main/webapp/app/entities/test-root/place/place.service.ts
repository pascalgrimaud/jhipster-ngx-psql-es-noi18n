import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlace } from 'app/shared/model/test-root/place.model';

type EntityResponseType = HttpResponse<IPlace>;
type EntityArrayResponseType = HttpResponse<IPlace[]>;

@Injectable({ providedIn: 'root' })
export class PlaceService {
    private resourceUrl = SERVER_API_URL + 'api/places';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/places';

    constructor(private http: HttpClient) {}

    create(place: IPlace): Observable<EntityResponseType> {
        return this.http.post<IPlace>(this.resourceUrl, place, { observe: 'response' });
    }

    update(place: IPlace): Observable<EntityResponseType> {
        return this.http.put<IPlace>(this.resourceUrl, place, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPlace>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlace[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlace[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
