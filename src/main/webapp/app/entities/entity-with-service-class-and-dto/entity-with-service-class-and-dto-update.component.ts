import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';
import { EntityWithServiceClassAndDTOService } from './entity-with-service-class-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-class-and-dto-update',
    templateUrl: './entity-with-service-class-and-dto-update.component.html'
})
export class EntityWithServiceClassAndDTOUpdateComponent implements OnInit {
    private _entityWithServiceClassAndDTO: IEntityWithServiceClassAndDTO;
    isSaving: boolean;

    constructor(private entityWithServiceClassAndDTOService: EntityWithServiceClassAndDTOService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithServiceClassAndDTO }) => {
            this.entityWithServiceClassAndDTO = entityWithServiceClassAndDTO;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithServiceClassAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(this.entityWithServiceClassAndDTOService.update(this.entityWithServiceClassAndDTO));
        } else {
            this.subscribeToSaveResponse(this.entityWithServiceClassAndDTOService.create(this.entityWithServiceClassAndDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceClassAndDTO>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithServiceClassAndDTO>) => this.onSaveSuccess(),
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
    get entityWithServiceClassAndDTO() {
        return this._entityWithServiceClassAndDTO;
    }

    set entityWithServiceClassAndDTO(entityWithServiceClassAndDTO: IEntityWithServiceClassAndDTO) {
        this._entityWithServiceClassAndDTO = entityWithServiceClassAndDTO;
    }
}
