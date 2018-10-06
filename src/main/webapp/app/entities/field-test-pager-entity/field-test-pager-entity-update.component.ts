import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';
import { FieldTestPagerEntityService } from './field-test-pager-entity.service';

@Component({
    selector: 'jhi-field-test-pager-entity-update',
    templateUrl: './field-test-pager-entity-update.component.html'
})
export class FieldTestPagerEntityUpdateComponent implements OnInit {
    private _fieldTestPagerEntity: IFieldTestPagerEntity;
    isSaving: boolean;
    localDateJadeDp: any;
    localDateRequiredJadeDp: any;
    instantJade: string;
    instanteRequiredJade: string;
    zonedDateTimeJade: string;
    zonedDateTimeRequiredJade: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private fieldTestPagerEntityService: FieldTestPagerEntityService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldTestPagerEntity }) => {
            this.fieldTestPagerEntity = fieldTestPagerEntity;
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
        this.dataUtils.clearInputImage(this.fieldTestPagerEntity, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fieldTestPagerEntity.instantJade = moment(this.instantJade, DATE_TIME_FORMAT);
        this.fieldTestPagerEntity.instanteRequiredJade = moment(this.instanteRequiredJade, DATE_TIME_FORMAT);
        this.fieldTestPagerEntity.zonedDateTimeJade = moment(this.zonedDateTimeJade, DATE_TIME_FORMAT);
        this.fieldTestPagerEntity.zonedDateTimeRequiredJade = moment(this.zonedDateTimeRequiredJade, DATE_TIME_FORMAT);
        if (this.fieldTestPagerEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldTestPagerEntityService.update(this.fieldTestPagerEntity));
        } else {
            this.subscribeToSaveResponse(this.fieldTestPagerEntityService.create(this.fieldTestPagerEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestPagerEntity>>) {
        result.subscribe(
            (res: HttpResponse<IFieldTestPagerEntity>) => this.onSaveSuccess(),
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
    get fieldTestPagerEntity() {
        return this._fieldTestPagerEntity;
    }

    set fieldTestPagerEntity(fieldTestPagerEntity: IFieldTestPagerEntity) {
        this._fieldTestPagerEntity = fieldTestPagerEntity;
        this.instantJade = moment(fieldTestPagerEntity.instantJade).format(DATE_TIME_FORMAT);
        this.instanteRequiredJade = moment(fieldTestPagerEntity.instanteRequiredJade).format(DATE_TIME_FORMAT);
        this.zonedDateTimeJade = moment(fieldTestPagerEntity.zonedDateTimeJade).format(DATE_TIME_FORMAT);
        this.zonedDateTimeRequiredJade = moment(fieldTestPagerEntity.zonedDateTimeRequiredJade).format(DATE_TIME_FORMAT);
    }
}
