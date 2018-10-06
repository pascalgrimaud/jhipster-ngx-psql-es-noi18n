import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';

@Component({
    selector: 'jhi-field-test-infinite-scroll-entity-detail',
    templateUrl: './field-test-infinite-scroll-entity-detail.component.html'
})
export class FieldTestInfiniteScrollEntityDetailComponent implements OnInit {
    fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
