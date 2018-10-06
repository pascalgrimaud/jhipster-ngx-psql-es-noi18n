import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { TestManyToManyMySuffixService } from './test-many-to-many-my-suffix.service';
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
    selector: 'jhi-test-many-to-many-my-suffix-update',
    templateUrl: './test-many-to-many-my-suffix-update.component.html'
})
export class TestManyToManyMySuffixUpdateComponent implements OnInit {
    private _testManyToMany: ITestManyToManyMySuffix;
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
        private testManyToManyService: TestManyToManyMySuffixService,
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
        this.activatedRoute.data.subscribe(({ testManyToMany }) => {
            this.testManyToMany = testManyToMany;
        });
        this.testEntityService.query().subscribe(
            (res: HttpResponse<ITestEntityMySuffixAlt[]>) => {
                this.testentities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testMapstructService.query().subscribe(
            (res: HttpResponse<ITestMapstruct[]>) => {
                this.testmapstructs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testServiceClassService.query().subscribe(
            (res: HttpResponse<ITestServiceClass[]>) => {
                this.testserviceclasses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testServiceImplService.query().subscribe(
            (res: HttpResponse<ITestServiceImpl[]>) => {
                this.testserviceimpls = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testInfiniteScrollService.query().subscribe(
            (res: HttpResponse<ITestInfiniteScroll[]>) => {
                this.testinfinitescrolls = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testPagerService.query().subscribe(
            (res: HttpResponse<ITestPager[]>) => {
                this.testpagers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testPaginationService.query().subscribe(
            (res: HttpResponse<ITestPagination[]>) => {
                this.testpaginations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testCustomTableNameService.query().subscribe(
            (res: HttpResponse<ITestCustomTableName[]>) => {
                this.testcustomtablenames = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.testManyToMany.id !== undefined) {
            this.subscribeToSaveResponse(this.testManyToManyService.update(this.testManyToMany));
        } else {
            this.subscribeToSaveResponse(this.testManyToManyService.create(this.testManyToMany));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestManyToManyMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ITestManyToManyMySuffix>) => this.onSaveSuccess(),
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get testManyToMany() {
        return this._testManyToMany;
    }

    set testManyToMany(testManyToMany: ITestManyToManyMySuffix) {
        this._testManyToMany = testManyToMany;
    }
}
