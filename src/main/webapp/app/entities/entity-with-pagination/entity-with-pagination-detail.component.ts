import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithPagination } from 'app/shared/model/entity-with-pagination.model';

@Component({
    selector: 'jhi-entity-with-pagination-detail',
    templateUrl: './entity-with-pagination-detail.component.html'
})
export class EntityWithPaginationDetailComponent implements OnInit {
    entityWithPagination: IEntityWithPagination;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithPagination }) => {
            this.entityWithPagination = entityWithPagination;
        });
    }

    previousState() {
        window.history.back();
    }
}
