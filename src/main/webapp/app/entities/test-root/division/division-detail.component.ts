import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDivision } from 'app/shared/model/test-root/division.model';

@Component({
    selector: 'jhi-division-detail',
    templateUrl: './division-detail.component.html'
})
export class DivisionDetailComponent implements OnInit {
    division: IDivision;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ division }) => {
            this.division = division;
        });
    }

    previousState() {
        window.history.back();
    }
}
