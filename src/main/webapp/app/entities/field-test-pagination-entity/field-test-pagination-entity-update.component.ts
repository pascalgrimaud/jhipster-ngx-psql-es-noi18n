import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestPaginationEntity } from 'app/shared/model/field-test-pagination-entity.model';
import { FieldTestPaginationEntityService } from './field-test-pagination-entity.service';

@Component({
    selector: 'jhi-field-test-pagination-entity-update',
    templateUrl: './field-test-pagination-entity-update.component.html'
})
export class FieldTestPaginationEntityUpdateComponent implements OnInit {
    private _fieldTestPaginationEntity: IFieldTestPaginationEntity;
    isSaving: boolean;
    localDateAliceDp: any;
    localDateRequiredAliceDp: any;
    instantAlice: string;
    instanteRequiredAlice: string;
    zonedDateTimeAlice: string;
    zonedDateTimeRequiredAlice: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private fieldTestPaginationEntityService: FieldTestPaginationEntityService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldTestPaginationEntity }) => {
            this.fieldTestPaginationEntity = fieldTestPaginationEntity;
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
        this.dataUtils.clearInputImage(this.fieldTestPaginationEntity, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fieldTestPaginationEntity.instantAlice = moment(this.instantAlice, DATE_TIME_FORMAT);
        this.fieldTestPaginationEntity.instanteRequiredAlice = moment(this.instanteRequiredAlice, DATE_TIME_FORMAT);
        this.fieldTestPaginationEntity.zonedDateTimeAlice = moment(this.zonedDateTimeAlice, DATE_TIME_FORMAT);
        this.fieldTestPaginationEntity.zonedDateTimeRequiredAlice = moment(this.zonedDateTimeRequiredAlice, DATE_TIME_FORMAT);
        if (this.fieldTestPaginationEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldTestPaginationEntityService.update(this.fieldTestPaginationEntity));
        } else {
            this.subscribeToSaveResponse(this.fieldTestPaginationEntityService.create(this.fieldTestPaginationEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestPaginationEntity>>) {
        result.subscribe(
            (res: HttpResponse<IFieldTestPaginationEntity>) => this.onSaveSuccess(),
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
    get fieldTestPaginationEntity() {
        return this._fieldTestPaginationEntity;
    }

    set fieldTestPaginationEntity(fieldTestPaginationEntity: IFieldTestPaginationEntity) {
        this._fieldTestPaginationEntity = fieldTestPaginationEntity;
        this.instantAlice = moment(fieldTestPaginationEntity.instantAlice).format(DATE_TIME_FORMAT);
        this.instanteRequiredAlice = moment(fieldTestPaginationEntity.instanteRequiredAlice).format(DATE_TIME_FORMAT);
        this.zonedDateTimeAlice = moment(fieldTestPaginationEntity.zonedDateTimeAlice).format(DATE_TIME_FORMAT);
        this.zonedDateTimeRequiredAlice = moment(fieldTestPaginationEntity.zonedDateTimeRequiredAlice).format(DATE_TIME_FORMAT);
    }
}
