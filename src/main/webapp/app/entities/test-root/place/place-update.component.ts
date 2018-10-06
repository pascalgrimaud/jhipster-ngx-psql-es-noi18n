import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPlace } from 'app/shared/model/test-root/place.model';
import { PlaceService } from './place.service';
import { IDivision } from 'app/shared/model/test-root/division.model';
import { DivisionService } from 'app/entities/test-root/division';

@Component({
    selector: 'jhi-place-update',
    templateUrl: './place-update.component.html'
})
export class PlaceUpdateComponent implements OnInit {
    private _place: IPlace;
    isSaving: boolean;

    divisions: IDivision[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private placeService: PlaceService,
        private divisionService: DivisionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ place }) => {
            this.place = place;
        });
        this.divisionService.query().subscribe(
            (res: HttpResponse<IDivision[]>) => {
                this.divisions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.place.id !== undefined) {
            this.subscribeToSaveResponse(this.placeService.update(this.place));
        } else {
            this.subscribeToSaveResponse(this.placeService.create(this.place));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlace>>) {
        result.subscribe((res: HttpResponse<IPlace>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDivisionById(index: number, item: IDivision) {
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
    get place() {
        return this._place;
    }

    set place(place: IPlace) {
        this._place = place;
    }
}
