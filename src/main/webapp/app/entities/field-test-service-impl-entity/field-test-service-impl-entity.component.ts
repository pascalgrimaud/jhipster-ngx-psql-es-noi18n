import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';
import { Principal } from 'app/core';
import { FieldTestServiceImplEntityService } from './field-test-service-impl-entity.service';

@Component({
    selector: 'jhi-field-test-service-impl-entity',
    templateUrl: './field-test-service-impl-entity.component.html'
})
export class FieldTestServiceImplEntityComponent implements OnInit, OnDestroy {
    fieldTestServiceImplEntities: IFieldTestServiceImplEntity[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private fieldTestServiceImplEntityService: FieldTestServiceImplEntityService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
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
            this.fieldTestServiceImplEntityService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IFieldTestServiceImplEntity[]>) => (this.fieldTestServiceImplEntities = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.fieldTestServiceImplEntityService.query().subscribe(
            (res: HttpResponse<IFieldTestServiceImplEntity[]>) => {
                this.fieldTestServiceImplEntities = res.body;
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
        this.registerChangeInFieldTestServiceImplEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFieldTestServiceImplEntity) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInFieldTestServiceImplEntities() {
        this.eventSubscriber = this.eventManager.subscribe('fieldTestServiceImplEntityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
