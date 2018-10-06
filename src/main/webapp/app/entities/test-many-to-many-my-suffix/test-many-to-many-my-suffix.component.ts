import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { Principal } from 'app/core';
import { TestManyToManyMySuffixService } from './test-many-to-many-my-suffix.service';

@Component({
    selector: 'jhi-test-many-to-many-my-suffix',
    templateUrl: './test-many-to-many-my-suffix.component.html'
})
export class TestManyToManyMySuffixComponent implements OnInit, OnDestroy {
    testManyToManies: ITestManyToManyMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private testManyToManyService: TestManyToManyMySuffixService,
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
            this.testManyToManyService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITestManyToManyMySuffix[]>) => (this.testManyToManies = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.testManyToManyService.query().subscribe(
            (res: HttpResponse<ITestManyToManyMySuffix[]>) => {
                this.testManyToManies = res.body;
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
        this.registerChangeInTestManyToManies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestManyToManyMySuffix) {
        return item.id;
    }

    registerChangeInTestManyToManies() {
        this.eventSubscriber = this.eventManager.subscribe('testManyToManyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
