import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';

@Component({
    selector: 'jhi-entity-with-service-class-and-dto-detail',
    templateUrl: './entity-with-service-class-and-dto-detail.component.html'
})
export class EntityWithServiceClassAndDTODetailComponent implements OnInit {
    entityWithServiceClassAndDTO: IEntityWithServiceClassAndDTO;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithServiceClassAndDTO }) => {
            this.entityWithServiceClassAndDTO = entityWithServiceClassAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }
}
