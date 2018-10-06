import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';
import { EntityWithServiceImplService } from './entity-with-service-impl.service';

@Component({
    selector: 'jhi-entity-with-service-impl-update',
    templateUrl: './entity-with-service-impl-update.component.html'
})
export class EntityWithServiceImplUpdateComponent implements OnInit {
    private _entityWithServiceImpl: IEntityWithServiceImpl;
    isSaving: boolean;

    constructor(private entityWithServiceImplService: EntityWithServiceImplService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entityWithServiceImpl }) => {
            this.entityWithServiceImpl = entityWithServiceImpl;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entityWithServiceImpl.id !== undefined) {
            this.subscribeToSaveResponse(this.entityWithServiceImplService.update(this.entityWithServiceImpl));
        } else {
            this.subscribeToSaveResponse(this.entityWithServiceImplService.create(this.entityWithServiceImpl));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceImpl>>) {
        result.subscribe(
            (res: HttpResponse<IEntityWithServiceImpl>) => this.onSaveSuccess(),
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
    get entityWithServiceImpl() {
        return this._entityWithServiceImpl;
    }

    set entityWithServiceImpl(entityWithServiceImpl: IEntityWithServiceImpl) {
        this._entityWithServiceImpl = entityWithServiceImpl;
    }
}
