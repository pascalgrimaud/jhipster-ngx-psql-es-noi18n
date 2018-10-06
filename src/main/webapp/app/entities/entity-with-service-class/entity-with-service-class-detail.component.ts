import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';

@Component({
    selector: 'jhi-entity-with-service-class-detail',
    templateUrl: './entity-with-service-class-detail.component.html'
})
export class EntityWithServiceClassDetailComponent implements OnInit {
    entityWithServiceClass: IEntityWithServiceClass;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entityWithServiceClass }) => {
            this.entityWithServiceClass = entityWithServiceClass;
        });
    }

    previousState() {
        window.history.back();
    }
}
