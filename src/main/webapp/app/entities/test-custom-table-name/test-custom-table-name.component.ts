import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';
import { Principal } from 'app/core';
import { TestCustomTableNameService } from './test-custom-table-name.service';

@Component({
    selector: 'jhi-test-custom-table-name',
    templateUrl: './test-custom-table-name.component.html'
})
export class TestCustomTableNameComponent implements OnInit, OnDestroy {
    testCustomTableNames: ITestCustomTableName[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private testCustomTableNameService: TestCustomTableNameService,
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
            this.testCustomTableNameService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITestCustomTableName[]>) => (this.testCustomTableNames = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.testCustomTableNameService.query().subscribe(
            (res: HttpResponse<ITestCustomTableName[]>) => {
                this.testCustomTableNames = res.body;
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
        this.registerChangeInTestCustomTableNames();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestCustomTableName) {
        return item.id;
    }

    registerChangeInTestCustomTableNames() {
        this.eventSubscriber = this.eventManager.subscribe('testCustomTableNameListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
