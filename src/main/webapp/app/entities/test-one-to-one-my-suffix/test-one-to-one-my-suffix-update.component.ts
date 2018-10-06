import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { TestOneToOneMySuffixService } from './test-one-to-one-my-suffix.service';
import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { TestEntityMySuffixAltService } from 'app/entities/test-entity-my-suffix-alt';
import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';
import { TestMapstructService } from 'app/entities/test-mapstruct';
import { ITestServiceClass } from 'app/shared/model/test-service-class.model';
import { TestServiceClassService } from 'app/entities/test-service-class';
import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';
import { TestServiceImplService } from 'app/entities/test-service-impl';
import { ITestInfiniteScroll } from 'app/shared/model/test-infinite-scroll.model';
import { TestInfiniteScrollService } from 'app/entities/test-infinite-scroll';
import { ITestPager } from 'app/shared/model/test-pager.model';
import { TestPagerService } from 'app/entities/test-pager';
import { ITestPagination } from 'app/shared/model/test-pagination.model';
import { TestPaginationService } from 'app/entities/test-pagination';
import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';
import { TestCustomTableNameService } from 'app/entities/test-custom-table-name';

@Component({
    selector: 'jhi-test-one-to-one-my-suffix-update',
    templateUrl: './test-one-to-one-my-suffix-update.component.html'
})
export class TestOneToOneMySuffixUpdateComponent implements OnInit {
    private _testOneToOne: ITestOneToOneMySuffix;
    isSaving: boolean;

    testentities: ITestEntityMySuffixAlt[];

    testmapstructs: ITestMapstruct[];

    testserviceclasses: ITestServiceClass[];

    testserviceimpls: ITestServiceImpl[];

    testinfinitescrolls: ITestInfiniteScroll[];

    testpagers: ITestPager[];

    testpaginations: ITestPagination[];

    testcustomtablenames: ITestCustomTableName[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private testOneToOneService: TestOneToOneMySuffixService,
        private testEntityService: TestEntityMySuffixAltService,
        private testMapstructService: TestMapstructService,
        private testServiceClassService: TestServiceClassService,
        private testServiceImplService: TestServiceImplService,
        private testInfiniteScrollService: TestInfiniteScrollService,
        private testPagerService: TestPagerService,
        private testPaginationService: TestPaginationService,
        private testCustomTableNameService: TestCustomTableNameService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testOneToOne }) => {
            this.testOneToOne = testOneToOne;
        });
        this.testEntityService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestEntityMySuffixAlt[]>) => {
                if (!this.testOneToOne.testEntity || !this.testOneToOne.testEntity.id) {
                    this.testentities = res.body;
                } else {
                    this.testEntityService.find(this.testOneToOne.testEntity.id).subscribe(
                        (subRes: HttpResponse<ITestEntityMySuffixAlt>) => {
                            this.testentities = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testMapstructService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestMapstruct[]>) => {
                if (!this.testOneToOne.testMapstruct || !this.testOneToOne.testMapstruct.id) {
                    this.testmapstructs = res.body;
                } else {
                    this.testMapstructService.find(this.testOneToOne.testMapstruct.id).subscribe(
                        (subRes: HttpResponse<ITestMapstruct>) => {
                            this.testmapstructs = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testServiceClassService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestServiceClass[]>) => {
                if (!this.testOneToOne.testServiceClass || !this.testOneToOne.testServiceClass.id) {
                    this.testserviceclasses = res.body;
                } else {
                    this.testServiceClassService.find(this.testOneToOne.testServiceClass.id).subscribe(
                        (subRes: HttpResponse<ITestServiceClass>) => {
                            this.testserviceclasses = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testServiceImplService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestServiceImpl[]>) => {
                if (!this.testOneToOne.testServiceImpl || !this.testOneToOne.testServiceImpl.id) {
                    this.testserviceimpls = res.body;
                } else {
                    this.testServiceImplService.find(this.testOneToOne.testServiceImpl.id).subscribe(
                        (subRes: HttpResponse<ITestServiceImpl>) => {
                            this.testserviceimpls = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testInfiniteScrollService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestInfiniteScroll[]>) => {
                if (!this.testOneToOne.testInfiniteScroll || !this.testOneToOne.testInfiniteScroll.id) {
                    this.testinfinitescrolls = res.body;
                } else {
                    this.testInfiniteScrollService.find(this.testOneToOne.testInfiniteScroll.id).subscribe(
                        (subRes: HttpResponse<ITestInfiniteScroll>) => {
                            this.testinfinitescrolls = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testPagerService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestPager[]>) => {
                if (!this.testOneToOne.testPager || !this.testOneToOne.testPager.id) {
                    this.testpagers = res.body;
                } else {
                    this.testPagerService.find(this.testOneToOne.testPager.id).subscribe(
                        (subRes: HttpResponse<ITestPager>) => {
                            this.testpagers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testPaginationService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestPagination[]>) => {
                if (!this.testOneToOne.testPagination || !this.testOneToOne.testPagination.id) {
                    this.testpaginations = res.body;
                } else {
                    this.testPaginationService.find(this.testOneToOne.testPagination.id).subscribe(
                        (subRes: HttpResponse<ITestPagination>) => {
                            this.testpaginations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testCustomTableNameService.query({ filter: 'testonetoone-is-null' }).subscribe(
            (res: HttpResponse<ITestCustomTableName[]>) => {
                if (!this.testOneToOne.testCustomTableName || !this.testOneToOne.testCustomTableName.id) {
                    this.testcustomtablenames = res.body;
                } else {
                    this.testCustomTableNameService.find(this.testOneToOne.testCustomTableName.id).subscribe(
                        (subRes: HttpResponse<ITestCustomTableName>) => {
                            this.testcustomtablenames = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.testOneToOne.id !== undefined) {
            this.subscribeToSaveResponse(this.testOneToOneService.update(this.testOneToOne));
        } else {
            this.subscribeToSaveResponse(this.testOneToOneService.create(this.testOneToOne));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestOneToOneMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ITestOneToOneMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTestEntityById(index: number, item: ITestEntityMySuffixAlt) {
        return item.id;
    }

    trackTestMapstructById(index: number, item: ITestMapstruct) {
        return item.id;
    }

    trackTestServiceClassById(index: number, item: ITestServiceClass) {
        return item.id;
    }

    trackTestServiceImplById(index: number, item: ITestServiceImpl) {
        return item.id;
    }

    trackTestInfiniteScrollById(index: number, item: ITestInfiniteScroll) {
        return item.id;
    }

    trackTestPagerById(index: number, item: ITestPager) {
        return item.id;
    }

    trackTestPaginationById(index: number, item: ITestPagination) {
        return item.id;
    }

    trackTestCustomTableNameById(index: number, item: ITestCustomTableName) {
        return item.id;
    }
    get testOneToOne() {
        return this._testOneToOne;
    }

    set testOneToOne(testOneToOne: ITestOneToOneMySuffix) {
        this._testOneToOne = testOneToOne;
    }
}
