import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestEntity } from 'app/shared/model/field-test-entity.model';

@Component({
    selector: 'jhi-field-test-entity-detail',
    templateUrl: './field-test-entity-detail.component.html'
})
export class FieldTestEntityDetailComponent implements OnInit {
    fieldTestEntity: IFieldTestEntity;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldTestEntity }) => {
            this.fieldTestEntity = fieldTestEntity;
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
