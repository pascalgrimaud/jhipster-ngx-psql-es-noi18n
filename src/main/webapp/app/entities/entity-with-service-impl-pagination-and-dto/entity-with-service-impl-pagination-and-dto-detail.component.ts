import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceImplPaginationAndDTO } from 'app/shared/model/entity-with-service-impl-pagination-and-dto.model';

@Component({
    selector: 'jhi-entity-with-service-impl-pagination-and-dto-detail',
    templateUrl: './entity-with-service-impl-pagination-and-dto-detail.component.html'
})
export class EntityWithServiceImplPaginationAndDTODetailComponent implements OnInit {
    entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithServiceImplPaginationAndDTO }) => {
            this.entityWithServiceImplPaginationAndDTO = entityWithServiceImplPaginationAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }
}
