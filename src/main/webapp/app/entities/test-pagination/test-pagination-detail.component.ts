import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestPagination } from 'app/shared/model/test-pagination.model';

@Component({
    selector: 'jhi-test-pagination-detail',
    templateUrl: './test-pagination-detail.component.html'
})
export class TestPaginationDetailComponent implements OnInit {
    testPagination: ITestPagination;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testPagination }) => {
            this.testPagination = testPagination;
        });
    }

    previousState() {
        window.history.back();
    }
}
