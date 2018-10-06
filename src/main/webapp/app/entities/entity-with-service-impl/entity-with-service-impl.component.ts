import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEntityWithServiceImpl } from 'app/shared/model/entity-with-service-impl.model';
import { Principal } from 'app/core';
import { EntityWithServiceImplService } from './entity-with-service-impl.service';

@Component({
    selector: 'jhi-entity-with-service-impl',
    templateUrl: './entity-with-service-impl.component.html'
})
export class EntityWithServiceImplComponent implements OnInit, OnDestroy {
    entityWithServiceImpls: IEntityWithServiceImpl[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private entityWithServiceImplService: EntityWithServiceImplService,
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
            this.entityWithServiceImplService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IEntityWithServiceImpl[]>) => (this.entityWithServiceImpls = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.entityWithServiceImplService.query().subscribe(
            (res: HttpResponse<IEntityWithServiceImpl[]>) => {
                this.entityWithServiceImpls = res.body;
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
        this.registerChangeInEntityWithServiceImpls();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntityWithServiceImpl) {
        return item.id;
    }

    registerChangeInEntityWithServiceImpls() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceImplListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
