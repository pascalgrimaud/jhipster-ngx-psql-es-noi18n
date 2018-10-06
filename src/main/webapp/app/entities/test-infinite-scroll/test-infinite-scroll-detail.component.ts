import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';

@Component({
    selector: 'jhi-test-infinite-scroll-detail',
    templateUrl: './test-infinite-scroll-detail.component.html'
})
export class TestInfiniteScrollDetailComponent implements OnInit {
    testInfiniteScroll: ITestInfiniteScroll;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testInfiniteScroll }) => {
            this.testInfiniteScroll = testInfiniteScroll;
        });
    }

    previousState() {
        window.history.back();
    }
}
