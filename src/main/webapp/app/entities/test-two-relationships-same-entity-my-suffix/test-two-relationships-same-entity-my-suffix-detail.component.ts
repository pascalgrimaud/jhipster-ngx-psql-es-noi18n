import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';

@Component({
    selector: 'jhi-test-two-relationships-same-entity-my-suffix-detail',
    templateUrl: './test-two-relationships-same-entity-my-suffix-detail.component.html'
})
export class TestTwoRelationshipsSameEntityMySuffixDetailComponent implements OnInit {
    testTwoRelationshipsSameEntity: ITestTwoRelationshipsSameEntityMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testTwoRelationshipsSameEntity }) => {
            this.testTwoRelationshipsSameEntity = testTwoRelationshipsSameEntity;
        });
    }

    previousState() {
        window.history.back();
    }
}
