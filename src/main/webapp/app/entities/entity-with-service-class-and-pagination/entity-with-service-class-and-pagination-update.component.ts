import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithServiceClassAndPagination } from 'app/shared/model/entity-with-service-class-and-pagination.model';
import { EntityWithServiceClassAndPaginationService } from './entity-with-service-class-and-pagination.service';

@Component({
    selector: 'jhi-entity-with-service-class-and-pagination-update',
    templateUrl: './entity-with-service-class-and-pagination-update.component.html'
})
export class EntityWithServiceClassAndPaginationUpdateComponent implements OnInit {
    private _entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination;
    isSaving: boolean;

    constructor(
        private entityWithServiceClassAndPaginationService: EntityWithServiceClassAndPaginationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithServiceClassAndPagination }) => {
            this.entityWithServiceClassAndPagination = entityWithServiceClassAndPagination;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithServiceClassAndPagination.id !== undefined) {
            this.subscribeToSaveResponse(this.entityWithServiceClassAndPaginationService.update(this.entityWithServiceClassAndPagination));
        } else {
            this.subscribeToSaveResponse(this.entityWithServiceClassAndPaginationService.create(this.entityWithServiceClassAndPagination));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceClassAndPagination>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithServiceClassAndPagination>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get entityWithServiceClassAndPagination() {
        return this._entityWithServiceClassAndPagination;
    }

    set entityWithServiceClassAndPagination(entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination) {
        this._entityWithServiceClassAndPagination = entityWithServiceClassAndPagination;
    }
}
