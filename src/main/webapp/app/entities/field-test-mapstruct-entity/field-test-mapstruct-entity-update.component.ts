import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';
import { FieldTestMapstructEntityService } from './field-test-mapstruct-entity.service';

@Component({
    selector: 'jhi-field-test-mapstruct-entity-update',
    templateUrl: './field-test-mapstruct-entity-update.component.html'
})
export class FieldTestMapstructEntityUpdateComponent implements OnInit {
    private _fieldTestMapstructEntity: IFieldTestMapstructEntity;
    isSaving: boolean;
    localDateEvaDp: any;
    localDateRequiredEvaDp: any;
    instantEva: string;
    instanteRequiredEva: string;
    zonedDateTimeEva: string;
    zonedDateTimeRequiredEva: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private fieldTestMapstructEntityService: FieldTestMapstructEntityService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldTestMapstructEntity }) => {
            this.fieldTestMapstructEntity = fieldTestMapstructEntity;
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
        this.dataUtils.clearInputImage(this.fieldTestMapstructEntity, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fieldTestMapstructEntity.instantEva = moment(this.instantEva, DATE_TIME_FORMAT);
        this.fieldTestMapstructEntity.instanteRequiredEva = moment(this.instanteRequiredEva, DATE_TIME_FORMAT);
        this.fieldTestMapstructEntity.zonedDateTimeEva = moment(this.zonedDateTimeEva, DATE_TIME_FORMAT);
        this.fieldTestMapstructEntity.zonedDateTimeRequiredEva = moment(this.zonedDateTimeRequiredEva, DATE_TIME_FORMAT);
        if (this.fieldTestMapstructEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldTestMapstructEntityService.update(this.fieldTestMapstructEntity));
        } else {
            this.subscribeToSaveResponse(this.fieldTestMapstructEntityService.create(this.fieldTestMapstructEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestMapstructEntity>>) {
        result.subscribe(
            (res: HttpResponse<IFieldTestMapstructEntity>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get fieldTestMapstructEntity() {
        return this._fieldTestMapstructEntity;
    }

    set fieldTestMapstructEntity(fieldTestMapstructEntity: IFieldTestMapstructEntity) {
        this._fieldTestMapstructEntity = fieldTestMapstructEntity;
        this.instantEva = moment(fieldTestMapstructEntity.instantEva).format(DATE_TIME_FORMAT);
        this.instanteRequiredEva = moment(fieldTestMapstructEntity.instanteRequiredEva).format(DATE_TIME_FORMAT);
        this.zonedDateTimeEva = moment(fieldTestMapstructEntity.zonedDateTimeEva).format(DATE_TIME_FORMAT);
        this.zonedDateTimeRequiredEva = moment(fieldTestMapstructEntity.zonedDateTimeRequiredEva).format(DATE_TIME_FORMAT);
    }
}
