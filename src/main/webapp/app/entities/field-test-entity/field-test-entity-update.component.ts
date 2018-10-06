import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestEntity } from 'app/shared/model/field-test-entity.model';
import { FieldTestEntityService } from './field-test-entity.service';

@Component({
    selector: 'jhi-field-test-entity-update',
    templateUrl: './field-test-entity-update.component.html'
})
export class FieldTestEntityUpdateComponent implements OnInit {
    private _fieldTestEntity: IFieldTestEntity;
    isSaving: boolean;
    localDateTomDp: any;
    localDateRequiredTomDp: any;
    instantTom: string;
    instantRequiredTom: string;
    zonedDateTimeTom: string;
    zonedDateTimeRequiredTom: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private fieldTestEntityService: FieldTestEntityService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldTestEntity }) => {
            this.fieldTestEntity = fieldTestEntity;
        });
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

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.fieldTestEntity, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fieldTestEntity.instantTom = moment(this.instantTom, DATE_TIME_FORMAT);
        this.fieldTestEntity.instantRequiredTom = moment(this.instantRequiredTom, DATE_TIME_FORMAT);
        this.fieldTestEntity.zonedDateTimeTom = moment(this.zonedDateTimeTom, DATE_TIME_FORMAT);
        this.fieldTestEntity.zonedDateTimeRequiredTom = moment(this.zonedDateTimeRequiredTom, DATE_TIME_FORMAT);
        if (this.fieldTestEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldTestEntityService.update(this.fieldTestEntity));
        } else {
            this.subscribeToSaveResponse(this.fieldTestEntityService.create(this.fieldTestEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestEntity>>) {
        result.subscribe((res: HttpResponse<IFieldTestEntity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get fieldTestEntity() {
        return this._fieldTestEntity;
    }

    set fieldTestEntity(fieldTestEntity: IFieldTestEntity) {
        this._fieldTestEntity = fieldTestEntity;
        this.instantTom = moment(fieldTestEntity.instantTom).format(DATE_TIME_FORMAT);
        this.instantRequiredTom = moment(fieldTestEntity.instantRequiredTom).format(DATE_TIME_FORMAT);
        this.zonedDateTimeTom = moment(fieldTestEntity.zonedDateTimeTom).format(DATE_TIME_FORMAT);
        this.zonedDateTimeRequiredTom = moment(fieldTestEntity.zonedDateTimeRequiredTom).format(DATE_TIME_FORMAT);
    }
}
