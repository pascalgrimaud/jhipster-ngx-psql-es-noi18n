import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDivision } from 'app/shared/model/test-root/division.model';
import { DivisionService } from './division.service';
import { IPlace } from 'app/shared/model/test-root/place.model';
import { PlaceService } from 'app/entities/test-root/place';

@Component({
    selector: 'jhi-division-update',
    templateUrl: './division-update.component.html'
})
export class DivisionUpdateComponent implements OnInit {
    private _division: IDivision;
    isSaving: boolean;

    places: IPlace[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private divisionService: DivisionService,
        private placeService: PlaceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ division }) => {
            this.division = division;
        });
        this.placeService.query().subscribe(
            (res: HttpResponse<IPlace[]>) => {
                this.places = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.division.id !== undefined) {
            this.subscribeToSaveResponse(this.divisionService.update(this.division));
        } else {
            this.subscribeToSaveResponse(this.divisionService.create(this.division));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDivision>>) {
        result.subscribe((res: HttpResponse<IDivision>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPlaceById(index: number, item: IPlace) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get division() {
        return this._division;
    }

    set division(division: IDivision) {
        this._division = division;
    }
}
