import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { Principal } from 'app/core';
import { TestEntityMySuffixAltService } from './test-entity-my-suffix-alt.service';

@Component({
    selector: 'jhi-test-entity-my-suffix-alt',
    templateUrl: './test-entity-my-suffix-alt.component.html'
})
export class TestEntityMySuffixAltComponent implements OnInit, OnDestroy {
    testEntities: ITestEntityMySuffixAlt[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private testEntityService: TestEntityMySuffixAltService,
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
            this.testEntityService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITestEntityMySuffixAlt[]>) => (this.testEntities = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.testEntityService.query().subscribe(
            (res: HttpResponse<ITestEntityMySuffixAlt[]>) => {
                this.testEntities = res.body;
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
        this.registerChangeInTestEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestEntityMySuffixAlt) {
        return item.id;
    }

    registerChangeInTestEntities() {
        this.eventSubscriber = this.eventManager.subscribe('testEntityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
