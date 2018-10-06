import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithPagination } from 'app/shared/model/entity-with-pagination.model';
import { EntityWithPaginationService } from './entity-with-pagination.service';

@Component({
    selector: 'jhi-entity-with-pagination-update',
    templateUrl: './entity-with-pagination-update.component.html'
})
export class EntityWithPaginationUpdateComponent implements OnInit {
    private _entityWithPagination: IEntityWithPagination;
    isSaving: boolean;

    constructor(private entityWithPaginationService: EntityWithPaginationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithPagination }) => {
            this.entityWithPagination = entityWithPagination;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithPagination.id !== undefined) {
            this.subscribeToSaveResponse(this.entityWithPaginationService.update(this.entityWithPagination));
        } else {
            this.subscribeToSaveResponse(this.entityWithPaginationService.create(this.entityWithPagination));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithPagination>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithPagination>) => this.onSaveSuccess(),
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
    get entityWithPagination() {
        return this._entityWithPagination;
    }

    set entityWithPagination(entityWithPagination: IEntityWithPagination) {
        this._entityWithPagination = entityWithPagination;
    }
}
