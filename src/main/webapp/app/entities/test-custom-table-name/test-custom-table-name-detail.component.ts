import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';

@Component({
    selector: 'jhi-test-custom-table-name-detail',
    templateUrl: './test-custom-table-name-detail.component.html'
})
export class TestCustomTableNameDetailComponent implements OnInit {
    testCustomTableName: ITestCustomTableName;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ testCustomTableName }) => {
            this.testCustomTableName = testCustomTableName;
        });
    }

    previousState() {
        window.history.back();
    }
}
