import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';

@Component({
    selector: 'jhi-field-test-service-impl-entity-detail',
    templateUrl: './field-test-service-impl-entity-detail.component.html'
})
export class FieldTestServiceImplEntityDetailComponent implements OnInit {
    fieldTestServiceImplEntity: IFieldTestServiceImplEntity;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
