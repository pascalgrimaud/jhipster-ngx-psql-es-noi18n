import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';

@Component({
    selector: 'jhi-entity-with-service-impl-and-dto-detail',
    templateUrl: './entity-with-service-impl-and-dto-detail.component.html'
})
export class EntityWithServiceImplAndDTODetailComponent implements OnInit {
    entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithServiceImplAndDTO }) => {
            this.entityWithServiceImplAndDTO = entityWithServiceImplAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }
}
