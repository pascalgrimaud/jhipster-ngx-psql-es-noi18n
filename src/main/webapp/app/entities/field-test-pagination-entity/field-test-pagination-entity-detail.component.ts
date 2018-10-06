import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestPaginationEntity } from 'app/shared/model/field-test-pagination-entity.model';

@Component({
    selector: 'jhi-field-test-pagination-entity-detail',
    templateUrl: './field-test-pagination-entity-detail.component.html'
})
export class FieldTestPaginationEntityDetailComponent implements OnInit {
    fieldTestPaginationEntity: IFieldTestPaginationEntity;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
