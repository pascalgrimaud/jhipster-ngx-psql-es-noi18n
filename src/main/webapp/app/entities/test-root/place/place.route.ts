import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Place } from 'app/shared/model/test-root/place.model';
import { PlaceService } from './place.service';
import { PlaceComponent } from './place.component';
import { PlaceDetailComponent } from './place-detail.component';
import { PlaceUpdateComponent } from './place-update.component';
import { PlaceDeletePopupComponent } from './place-delete-dialog.component';
import { IPlace } from 'app/shared/model/test-root/place.model';

@Injectable({ providedIn: 'root' })
export class PlaceResolve implements Resolve<IPlace> {
    constructor(private service: PlaceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((place: HttpResponse<Place>) => place.body));
        }
        return of(new Place());
    }
}

export const placeRoute: Routes = [
    {
        path: 'place',
        component: PlaceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'place/:id/view',
        component: PlaceDetailComponent,
        resolve: {
            place: PlaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'place/new',
        component: PlaceUpdateComponent,
        resolve: {
            place: PlaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'place/:id/edit',
        component: PlaceUpdateComponent,
        resolve: {
            place: PlaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const placePopupRoute: Routes = [
    {
        path: 'place/:id/delete',
        component: PlaceDeletePopupComponent,
        resolve: {
            place: PlaceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
