import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';
import { Principal } from 'app/core';
import { FieldTestMapstructEntityService } from './field-test-mapstruct-entity.service';

@Component({
    selector: 'jhi-field-test-mapstruct-entity',
    templateUrl: './field-test-mapstruct-entity.component.html'
})
export class FieldTestMapstructEntityComponent implements OnInit, OnDestroy {
    fieldTestMapstructEntities: IFieldTestMapstructEntity[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private fieldTestMapstructEntityService: FieldTestMapstructEntityService,
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
            this.fieldTestMapstructEntityService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IFieldTestMapstructEntity[]>) => (this.fieldTestMapstructEntities = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.fieldTestMapstructEntityService.query().subscribe(
            (res: HttpResponse<IFieldTestMapstructEntity[]>) => {
                this.fieldTestMapstructEntities = res.body;
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
        this.registerChangeInFieldTestMapstructEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFieldTestMapstructEntity) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInFieldTestMapstructEntities() {
        this.eventSubscriber = this.eventManager.subscribe('fieldTestMapstructEntityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
