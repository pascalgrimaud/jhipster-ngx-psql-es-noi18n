import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from './field-test-service-impl-entity.service';

@Component({
    selector: 'jhi-field-test-service-impl-entity-update',
    templateUrl: './field-test-service-impl-entity-update.component.html'
})
export class FieldTestServiceImplEntityUpdateComponent implements OnInit {
    private _fieldTestServiceImplEntity: IFieldTestServiceImplEntity;
    isSaving: boolean;
    localDateMikaDp: any;
    localDateRequiredMikaDp: any;
    instantMika: string;
    instanteRequiredMika: string;
    zonedDateTimeMika: string;
    zonedDateTimeRequiredMika: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private fieldTestServiceImplEntityService: FieldTestServiceImplEntityService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldTestServiceImplEntity }) => {
            this.fieldTestServiceImplEntity = fieldTestServiceImplEntity;
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
        this.dataUtils.clearInputImage(this.fieldTestServiceImplEntity, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fieldTestServiceImplEntity.instantMika = moment(this.instantMika, DATE_TIME_FORMAT);
        this.fieldTestServiceImplEntity.instanteRequiredMika = moment(this.instanteRequiredMika, DATE_TIME_FORMAT);
        this.fieldTestServiceImplEntity.zonedDateTimeMika = moment(this.zonedDateTimeMika, DATE_TIME_FORMAT);
        this.fieldTestServiceImplEntity.zonedDateTimeRequiredMika = moment(this.zonedDateTimeRequiredMika, DATE_TIME_FORMAT);
        if (this.fieldTestServiceImplEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldTestServiceImplEntityService.update(this.fieldTestServiceImplEntity));
        } else {
            this.subscribeToSaveResponse(this.fieldTestServiceImplEntityService.create(this.fieldTestServiceImplEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestServiceImplEntity>>) {
        result.subscribe(
            (res: HttpResponse<IFieldTestServiceImplEntity>) => this.onSaveSuccess(),
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
    get fieldTestServiceImplEntity() {
        return this._fieldTestServiceImplEntity;
    }

    set fieldTestServiceImplEntity(fieldTestServiceImplEntity: IFieldTestServiceImplEntity) {
        this._fieldTestServiceImplEntity = fieldTestServiceImplEntity;
        this.instantMika = moment(fieldTestServiceImplEntity.instantMika).format(DATE_TIME_FORMAT);
        this.instanteRequiredMika = moment(fieldTestServiceImplEntity.instanteRequiredMika).format(DATE_TIME_FORMAT);
        this.zonedDateTimeMika = moment(fieldTestServiceImplEntity.zonedDateTimeMika).format(DATE_TIME_FORMAT);
        this.zonedDateTimeRequiredMika = moment(fieldTestServiceImplEntity.zonedDateTimeRequiredMika).format(DATE_TIME_FORMAT);
    }
}
