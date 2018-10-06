import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';

@Component({
    selector: 'jhi-test-entity-my-suffix-alt-detail',
    templateUrl: './test-entity-my-suffix-alt-detail.component.html'
})
export class TestEntityMySuffixAltDetailComponent implements OnInit {
    testEntity: ITestEntityMySuffixAlt;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testEntity }) => {
            this.testEntity = testEntity;
        });
    }

    previousState() {
        window.history.back();
    }
}
