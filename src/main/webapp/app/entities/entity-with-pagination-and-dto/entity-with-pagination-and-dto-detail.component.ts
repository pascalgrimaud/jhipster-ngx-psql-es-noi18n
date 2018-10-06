import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithPaginationAndDTO } from 'app/shared/model/entity-with-pagination-and-dto.model';

@Component({
    selector: 'jhi-entity-with-pagination-and-dto-detail',
    templateUrl: './entity-with-pagination-and-dto-detail.component.html'
})
export class EntityWithPaginationAndDTODetailComponent implements OnInit {
    entityWithPaginationAndDTO: IEntityWithPaginationAndDTO;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithPaginationAndDTO }) => {
            this.entityWithPaginationAndDTO = entityWithPaginationAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }
}
