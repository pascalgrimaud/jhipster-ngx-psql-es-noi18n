import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';
import { Principal } from 'app/core';
import { TestTwoRelationshipsSameEntityMySuffixService } from './test-two-relationships-same-entity-my-suffix.service';

@Component({
    selector: 'jhi-test-two-relationships-same-entity-my-suffix',
    templateUrl: './test-two-relationships-same-entity-my-suffix.component.html'
})
export class TestTwoRelationshipsSameEntityMySuffixComponent implements OnInit, OnDestroy {
    testTwoRelationshipsSameEntities: ITestTwoRelationshipsSameEntityMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private testTwoRelationshipsSameEntityService: TestTwoRelationshipsSameEntityMySuffixService,
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
            this.testTwoRelationshipsSameEntityService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITestTwoRelationshipsSameEntityMySuffix[]>) => (this.testTwoRelationshipsSameEntities = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.testTwoRelationshipsSameEntityService.query().subscribe(
            (res: HttpResponse<ITestTwoRelationshipsSameEntityMySuffix[]>) => {
                this.testTwoRelationshipsSameEntities = res.body;
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
        this.registerChangeInTestTwoRelationshipsSameEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestTwoRelationshipsSameEntityMySuffix) {
        return item.id;
    }

    registerChangeInTestTwoRelationshipsSameEntities() {
        this.eventSubscriber = this.eventManager.subscribe('testTwoRelationshipsSameEntityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
