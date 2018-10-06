import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEntityWithServiceClass } from 'app/shared/model/entity-with-service-class.model';
import { Principal } from 'app/core';
import { EntityWithServiceClassService } from './entity-with-service-class.service';

@Component({
    selector: 'jhi-entity-with-service-class',
    templateUrl: './entity-with-service-class.component.html'
})
export class EntityWithServiceClassComponent implements OnInit, OnDestroy {
    entityWithServiceClasses: IEntityWithServiceClass[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private entityWithServiceClassService: EntityWithServiceClassService,
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
            this.entityWithServiceClassService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IEntityWithServiceClass[]>) => (this.entityWithServiceClasses = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.entityWithServiceClassService.query().subscribe(
            (res: HttpResponse<IEntityWithServiceClass[]>) => {
                this.entityWithServiceClasses = res.body;
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
        this.registerChangeInEntityWithServiceClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntityWithServiceClass) {
        return item.id;
    }

    registerChangeInEntityWithServiceClasses() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceClassListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
