import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';

@Component({
    selector: 'jhi-test-mapstruct-detail',
    templateUrl: './test-mapstruct-detail.component.html'
})
export class TestMapstructDetailComponent implements OnInit {
    testMapstruct: ITestMapstruct;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testMapstruct }) => {
            this.testMapstruct = testMapstruct;
        });
    }

    previousState() {
        window.history.back();
    }
}
