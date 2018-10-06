import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithServiceImplPaginationAndDTO } from 'app/shared/model/entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOService } from './entity-with-service-impl-pagination-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-impl-pagination-and-dto-update',
    templateUrl: './entity-with-service-impl-pagination-and-dto-update.component.html'
})
export class EntityWithServiceImplPaginationAndDTOUpdateComponent implements OnInit {
    private _entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO;
    isSaving: boolean;

    constructor(
        private entityWithServiceImplPaginationAndDTOService: EntityWithServiceImplPaginationAndDTOService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithServiceImplPaginationAndDTO }) => {
            this.entityWithServiceImplPaginationAndDTO = entityWithServiceImplPaginationAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithServiceImplPaginationAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplPaginationAndDTOService.update(this.entityWithServiceImplPaginationAndDTO)
            );
        } else {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplPaginationAndDTOService.create(this.entityWithServiceImplPaginationAndDTO)
            );
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceImplPaginationAndDTO>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithServiceImplPaginationAndDTO>) => this.onSaveSuccess(),
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
    get entityWithServiceImplPaginationAndDTO() {
        return this._entityWithServiceImplPaginationAndDTO;
    }

    set entityWithServiceImplPaginationAndDTO(entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO) {
        this._entityWithServiceImplPaginationAndDTO = entityWithServiceImplPaginationAndDTO;
    }
}
