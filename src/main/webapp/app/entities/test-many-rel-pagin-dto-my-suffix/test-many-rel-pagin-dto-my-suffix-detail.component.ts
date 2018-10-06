import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';

@Component({
    selector: 'jhi-test-many-rel-pagin-dto-my-suffix-detail',
    templateUrl: './test-many-rel-pagin-dto-my-suffix-detail.component.html'
})
export class TestManyRelPaginDTOMySuffixDetailComponent implements OnInit {
    testManyRelPaginDTO: ITestManyRelPaginDTOMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testManyRelPaginDTO }) => {
            this.testManyRelPaginDTO = testManyRelPaginDTO;
        });
    }

    previousState() {
        window.history.back();
    }
}
