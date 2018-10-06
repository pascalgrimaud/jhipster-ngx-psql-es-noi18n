import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestServiceClass } from 'app/shared/model/test-service-class.model';

@Component({
    selector: 'jhi-test-service-class-detail',
    templateUrl: './test-service-class-detail.component.html'
})
export class TestServiceClassDetailComponent implements OnInit {
    testServiceClass: ITestServiceClass;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testServiceClass }) => {
            this.testServiceClass = testServiceClass;
        });
    }

    previousState() {
        window.history.back();
    }
}
