import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';

@Component({
    selector: 'jhi-test-one-to-one-my-suffix-detail',
    templateUrl: './test-one-to-one-my-suffix-detail.component.html'
})
export class TestOneToOneMySuffixDetailComponent implements OnInit {
    testOneToOne: ITestOneToOneMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testOneToOne }) => {
            this.testOneToOne = testOneToOne;
        });
    }

    previousState() {
        window.history.back();
    }
}
