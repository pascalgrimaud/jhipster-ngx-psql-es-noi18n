import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceClassPaginationAndDTO } from 'app/shared/model/entity-with-service-class-pagination-and-dto.model';

@Component({
    selector: 'jhi-entity-with-service-class-pagination-and-dto-detail',
    templateUrl: './entity-with-service-class-pagination-and-dto-detail.component.html'
})
export class EntityWithServiceClassPaginationAndDTODetailComponent implements OnInit {
    entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithServiceClassPaginationAndDTO }) => {
            this.entityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }
}
