import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';
import { FieldTestInfiniteScrollEntityService } from './field-test-infinite-scroll-entity.service';

@Component({
    selector: 'jhi-field-test-infinite-scroll-entity-update',
    templateUrl: './field-test-infinite-scroll-entity-update.component.html'
})
export class FieldTestInfiniteScrollEntityUpdateComponent implements OnInit {
    private _fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity;
    isSaving: boolean;
    localDateHugoDp: any;
    localDateRequiredHugoDp: any;
    instantHugo: string;
    instanteRequiredHugo: string;
    zonedDateTimeHugo: string;
    zonedDateTimeRequiredHugo: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private fieldTestInfiniteScrollEntityService: FieldTestInfiniteScrollEntityService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldTestInfiniteScrollEntity }) => {
            this.fieldTestInfiniteScrollEntity = fieldTestInfiniteScrollEntity;
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
        this.dataUtils.clearInputImage(this.fieldTestInfiniteScrollEntity, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fieldTestInfiniteScrollEntity.instantHugo = moment(this.instantHugo, DATE_TIME_FORMAT);
        this.fieldTestInfiniteScrollEntity.instanteRequiredHugo = moment(this.instanteRequiredHugo, DATE_TIME_FORMAT);
        this.fieldTestInfiniteScrollEntity.zonedDateTimeHugo = moment(this.zonedDateTimeHugo, DATE_TIME_FORMAT);
        this.fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo = moment(this.zonedDateTimeRequiredHugo, DATE_TIME_FORMAT);
        if (this.fieldTestInfiniteScrollEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldTestInfiniteScrollEntityService.update(this.fieldTestInfiniteScrollEntity));
        } else {
            this.subscribeToSaveResponse(this.fieldTestInfiniteScrollEntityService.create(this.fieldTestInfiniteScrollEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestInfiniteScrollEntity>>) {
        result.subscribe(
            (res: HttpResponse<IFieldTestInfiniteScrollEntity>) => this.onSaveSuccess(),
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
    get fieldTestInfiniteScrollEntity() {
        return this._fieldTestInfiniteScrollEntity;
    }

    set fieldTestInfiniteScrollEntity(fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity) {
        this._fieldTestInfiniteScrollEntity = fieldTestInfiniteScrollEntity;
        this.instantHugo = moment(fieldTestInfiniteScrollEntity.instantHugo).format(DATE_TIME_FORMAT);
        this.instanteRequiredHugo = moment(fieldTestInfiniteScrollEntity.instanteRequiredHugo).format(DATE_TIME_FORMAT);
        this.zonedDateTimeHugo = moment(fieldTestInfiniteScrollEntity.zonedDateTimeHugo).format(DATE_TIME_FORMAT);
        this.zonedDateTimeRequiredHugo = moment(fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo).format(DATE_TIME_FORMAT);
    }
}
