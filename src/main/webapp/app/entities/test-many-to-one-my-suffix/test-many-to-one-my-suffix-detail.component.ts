import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestManyToOneMySuffix } from 'app/shared/model/test-many-to-one-my-suffix.model';

@Component({
    selector: 'jhi-test-many-to-one-my-suffix-detail',
    templateUrl: './test-many-to-one-my-suffix-detail.component.html'
})
export class TestManyToOneMySuffixDetailComponent implements OnInit {
    testManyToOne: ITestManyToOneMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testManyToOne }) => {
            this.testManyToOne = testManyToOne;
        });
    }

    previousState() {
        window.history.back();
    }
}
