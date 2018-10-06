import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { Principal } from 'app/core';
import { TestOneToOneMySuffixService } from './test-one-to-one-my-suffix.service';

@Component({
    selector: 'jhi-test-one-to-one-my-suffix',
    templateUrl: './test-one-to-one-my-suffix.component.html'
})
export class TestOneToOneMySuffixComponent implements OnInit, OnDestroy {
    testOneToOnes: ITestOneToOneMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private testOneToOneService: TestOneToOneMySuffixService,
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
            this.testOneToOneService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITestOneToOneMySuffix[]>) => (this.testOneToOnes = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.testOneToOneService.query().subscribe(
            (res: HttpResponse<ITestOneToOneMySuffix[]>) => {
                this.testOneToOnes = res.body;
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
        this.registerChangeInTestOneToOnes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestOneToOneMySuffix) {
        return item.id;
    }

    registerChangeInTestOneToOnes() {
        this.eventSubscriber = this.eventManager.subscribe('testOneToOneListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
