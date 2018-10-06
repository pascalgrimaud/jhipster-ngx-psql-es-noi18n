import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';
import { Principal } from 'app/core';
import { EntityWithServiceImplAndDTOService } from './entity-with-service-impl-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-impl-and-dto',
    templateUrl: './entity-with-service-impl-and-dto.component.html'
})
export class EntityWithServiceImplAndDTOComponent implements OnInit, OnDestroy {
    entityWithServiceImplAndDTOS: IEntityWithServiceImplAndDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private entityWithServiceImplAndDTOService: EntityWithServiceImplAndDTOService,
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
            this.entityWithServiceImplAndDTOService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IEntityWithServiceImplAndDTO[]>) => (this.entityWithServiceImplAndDTOS = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.entityWithServiceImplAndDTOService.query().subscribe(
            (res: HttpResponse<IEntityWithServiceImplAndDTO[]>) => {
                this.entityWithServiceImplAndDTOS = res.body;
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
        this.registerChangeInEntityWithServiceImplAndDTOS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntityWithServiceImplAndDTO) {
        return item.id;
    }

    registerChangeInEntityWithServiceImplAndDTOS() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceImplAndDTOListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
