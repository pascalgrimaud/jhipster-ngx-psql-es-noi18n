import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithPaginationAndDTO } from 'app/shared/model/entity-with-pagination-and-dto.model';
import { EntityWithPaginationAndDTOService } from './entity-with-pagination-and-dto.service';

@Component({
    selector: 'jhi-entity-with-pagination-and-dto-update',
    templateUrl: './entity-with-pagination-and-dto-update.component.html'
})
export class EntityWithPaginationAndDTOUpdateComponent implements OnInit {
    private _entityWithPaginationAndDTO: IEntityWithPaginationAndDTO;
    isSaving: boolean;

    constructor(private entityWithPaginationAndDTOService: EntityWithPaginationAndDTOService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithPaginationAndDTO }) => {
            this.entityWithPaginationAndDTO = entityWithPaginationAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithPaginationAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(this.entityWithPaginationAndDTOService.update(this.entityWithPaginationAndDTO));
        } else {
            this.subscribeToSaveResponse(this.entityWithPaginationAndDTOService.create(this.entityWithPaginationAndDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithPaginationAndDTO>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithPaginationAndDTO>) => this.onSaveSuccess(),
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
    get entityWithPaginationAndDTO() {
        return this._entityWithPaginationAndDTO;
    }

    set entityWithPaginationAndDTO(entityWithPaginationAndDTO: IEntityWithPaginationAndDTO) {
        this._entityWithPaginationAndDTO = entityWithPaginationAndDTO;
    }
}
