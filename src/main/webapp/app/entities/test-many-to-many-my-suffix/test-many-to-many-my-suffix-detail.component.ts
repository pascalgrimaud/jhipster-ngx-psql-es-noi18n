import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';

@Component({
    selector: 'jhi-test-many-to-many-my-suffix-detail',
    templateUrl: './test-many-to-many-my-suffix-detail.component.html'
})
export class TestManyToManyMySuffixDetailComponent implements OnInit {
    testManyToMany: ITestManyToManyMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testManyToMany }) => {
            this.testManyToMany = testManyToMany;
        });
    }

    previousState() {
        window.history.back();
    }
}
