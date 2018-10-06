import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';
import { EntityWithServiceImplAndDTOService } from './entity-with-service-impl-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-impl-and-dto-update',
    templateUrl: './entity-with-service-impl-and-dto-update.component.html'
})
export class EntityWithServiceImplAndDTOUpdateComponent implements OnInit {
    private _entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO;
    isSaving: boolean;

    constructor(private entityWithServiceImplAndDTOService: EntityWithServiceImplAndDTOService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithServiceImplAndDTO }) => {
            this.entityWithServiceImplAndDTO = entityWithServiceImplAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithServiceImplAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(this.entityWithServiceImplAndDTOService.update(this.entityWithServiceImplAndDTO));
        } else {
            this.subscribeToSaveResponse(this.entityWithServiceImplAndDTOService.create(this.entityWithServiceImplAndDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceImplAndDTO>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithServiceImplAndDTO>) => this.onSaveSuccess(),
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
    get entityWithServiceImplAndDTO() {
        return this._entityWithServiceImplAndDTO;
    }

    set entityWithServiceImplAndDTO(entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO) {
        this._entityWithServiceImplAndDTO = entityWithServiceImplAndDTO;
    }
}
