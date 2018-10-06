import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITestServiceClass } from 'app/shared/model/test-service-class.model';
import { Principal } from 'app/core';
import { TestServiceClassService } from './test-service-class.service';

@Component({
    selector: 'jhi-test-service-class',
    templateUrl: './test-service-class.component.html'
})
export class TestServiceClassComponent implements OnInit, OnDestroy {
    testServiceClasses: ITestServiceClass[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private testServiceClassService: TestServiceClassService,
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
            this.testServiceClassService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITestServiceClass[]>) => (this.testServiceClasses = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.testServiceClassService.query().subscribe(
            (res: HttpResponse<ITestServiceClass[]>) => {
                this.testServiceClasses = res.body;
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
        this.registerChangeInTestServiceClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITestServiceClass) {
        return item.id;
    }

    registerChangeInTestServiceClasses() {
        this.eventSubscriber = this.eventManager.subscribe('testServiceClassListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
