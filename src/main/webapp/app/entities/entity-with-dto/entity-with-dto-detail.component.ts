import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithDTO } from 'app/shared/model/entity-with-dto.model';

@Component({
    selector: 'jhi-entity-with-dto-detail',
    templateUrl: './entity-with-dto-detail.component.html'
})
export class EntityWithDTODetailComponent implements OnInit {
    entityWithDTO: IEntityWithDTO;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithDTO }) => {
            this.entityWithDTO = entityWithDTO;
        });
    }

    previousState() {
        window.history.back();
    }
}
