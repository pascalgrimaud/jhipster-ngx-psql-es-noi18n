import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithServiceClassPaginationAndDTO } from 'app/shared/model/entity-with-service-class-pagination-and-dto.model';
import { EntityWithServiceClassPaginationAndDTOService } from './entity-with-service-class-pagination-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-class-pagination-and-dto-update',
    templateUrl: './entity-with-service-class-pagination-and-dto-update.component.html'
})
export class EntityWithServiceClassPaginationAndDTOUpdateComponent implements OnInit {
    private _entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO;
    isSaving: boolean;

    constructor(
        private entityWithServiceClassPaginationAndDTOService: EntityWithServiceClassPaginationAndDTOService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithServiceClassPaginationAndDTO }) => {
            this.entityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithServiceClassPaginationAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithServiceClassPaginationAndDTOService.update(this.entityWithServiceClassPaginationAndDTO)
            );
        } else {
            this.subscribeToSaveResponse(
                this.entityWithServiceClassPaginationAndDTOService.create(this.entityWithServiceClassPaginationAndDTO)
            );
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceClassPaginationAndDTO>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithServiceClassPaginationAndDTO>) => this.onSaveSuccess(),
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
    get entityWithServiceClassPaginationAndDTO() {
        return this._entityWithServiceClassPaginationAndDTO;
    }

    set entityWithServiceClassPaginationAndDTO(entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO) {
        this._entityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTO;
    }
}
