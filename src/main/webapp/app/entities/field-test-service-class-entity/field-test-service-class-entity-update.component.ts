import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestServiceClassEntity } from 'app/shared/model/field-test-service-class-entity.model';
import { FieldTestServiceClassEntityService } from './field-test-service-class-entity.service';

@Component({
    selector: 'jhi-field-test-service-class-entity-update',
    templateUrl: './field-test-service-class-entity-update.component.html'
})
export class FieldTestServiceClassEntityUpdateComponent implements OnInit {
    private _fieldTestServiceClassEntity: IFieldTestServiceClassEntity;
    isSaving: boolean;
    localDateBobDp: any;
    localDateRequiredBobDp: any;
    instantBob: string;
    instanteRequiredBob: string;
    zonedDateTimeBob: string;
    zonedDateTimeRequiredBob: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private fieldTestServiceClassEntityService: FieldTestServiceClassEntityService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldTestServiceClassEntity }) => {
            this.fieldTestServiceClassEntity = fieldTestServiceClassEntity;
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
        this.dataUtils.clearInputImage(this.fieldTestServiceClassEntity, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fieldTestServiceClassEntity.instantBob = moment(this.instantBob, DATE_TIME_FORMAT);
        this.fieldTestServiceClassEntity.instanteRequiredBob = moment(this.instanteRequiredBob, DATE_TIME_FORMAT);
        this.fieldTestServiceClassEntity.zonedDateTimeBob = moment(this.zonedDateTimeBob, DATE_TIME_FORMAT);
        this.fieldTestServiceClassEntity.zonedDateTimeRequiredBob = moment(this.zonedDateTimeRequiredBob, DATE_TIME_FORMAT);
        if (this.fieldTestServiceClassEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldTestServiceClassEntityService.update(this.fieldTestServiceClassEntity));
        } else {
            this.subscribeToSaveResponse(this.fieldTestServiceClassEntityService.create(this.fieldTestServiceClassEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestServiceClassEntity>>) {
        result.subscribe(
            (res: HttpResponse<IFieldTestServiceClassEntity>) => this.onSaveSuccess(),
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
    get fieldTestServiceClassEntity() {
        return this._fieldTestServiceClassEntity;
    }

    set fieldTestServiceClassEntity(fieldTestServiceClassEntity: IFieldTestServiceClassEntity) {
        this._fieldTestServiceClassEntity = fieldTestServiceClassEntity;
        this.instantBob = moment(fieldTestServiceClassEntity.instantBob).format(DATE_TIME_FORMAT);
        this.instanteRequiredBob = moment(fieldTestServiceClassEntity.instanteRequiredBob).format(DATE_TIME_FORMAT);
        this.zonedDateTimeBob = moment(fieldTestServiceClassEntity.zonedDateTimeBob).format(DATE_TIME_FORMAT);
        this.zonedDateTimeRequiredBob = moment(fieldTestServiceClassEntity.zonedDateTimeRequiredBob).format(DATE_TIME_FORMAT);
    }
}
