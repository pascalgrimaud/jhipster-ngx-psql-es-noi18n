import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';

@Component({
    selector: 'jhi-field-test-pager-entity-detail',
    templateUrl: './field-test-pager-entity-detail.component.html'
})
export class FieldTestPagerEntityDetailComponent implements OnInit {
    fieldTestPagerEntity: IFieldTestPagerEntity;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
