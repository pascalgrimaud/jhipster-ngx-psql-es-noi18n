import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';
import { Principal } from 'app/core';
import { EntityWithServiceClassAndDTOService } from './entity-with-service-class-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-class-and-dto',
    templateUrl: './entity-with-service-class-and-dto.component.html'
})
export class EntityWithServiceClassAndDTOComponent implements OnInit, OnDestroy {
    entityWithServiceClassAndDTOS: IEntityWithServiceClassAndDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private entityWithServiceClassAndDTOService: EntityWithServiceClassAndDTOService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.entityWithServiceClassAndDTOService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IEntityWithServiceClassAndDTO[]>) => (this.entityWithServiceClassAndDTOS = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.entityWithServiceClassAndDTOService.query().subscribe(
            (res: HttpResponse<IEntityWithServiceClassAndDTO[]>) => {
                this.entityWithServiceClassAndDTOS = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEntityWithServiceClassAndDTOS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntityWithServiceClassAndDTO) {
        return item.id;
    }

    registerChangeInEntityWithServiceClassAndDTOS() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceClassAndDTOListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
