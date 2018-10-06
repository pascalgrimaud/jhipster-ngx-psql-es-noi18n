import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestPager } from 'app/shared/model/test-pager.model';

@Component({
    selector: 'jhi-test-pager-detail',
    templateUrl: './test-pager-detail.component.html'
})
export class TestPagerDetailComponent implements OnInit {
    testPager: ITestPager;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testPager }) => {
            this.testPager = testPager;
        });
    }

    previousState() {
        window.history.back();
    }
}
