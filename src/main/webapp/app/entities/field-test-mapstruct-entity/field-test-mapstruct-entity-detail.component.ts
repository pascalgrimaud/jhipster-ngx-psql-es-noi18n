import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';

@Component({
    selector: 'jhi-field-test-mapstruct-entity-detail',
    templateUrl: './field-test-mapstruct-entity-detail.component.html'
})
export class FieldTestMapstructEntityDetailComponent implements OnInit {
    fieldTestMapstructEntity: IFieldTestMapstructEntity;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
