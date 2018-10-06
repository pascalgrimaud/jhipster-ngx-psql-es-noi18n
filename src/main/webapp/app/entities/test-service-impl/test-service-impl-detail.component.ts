import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';

@Component({
    selector: 'jhi-test-service-impl-detail',
    templateUrl: './test-service-impl-detail.component.html'
})
export class TestServiceImplDetailComponent implements OnInit {
    testServiceImpl: ITestServiceImpl;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testServiceImpl }) => {
            this.testServiceImpl = testServiceImpl;
        });
    }

    previousState() {
        window.history.back();
    }
}
