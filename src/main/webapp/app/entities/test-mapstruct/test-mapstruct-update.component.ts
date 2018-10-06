import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';
import { TestMapstructService } from './test-mapstruct.service';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { TestManyToManyMySuffixService } from 'app/entities/test-many-to-many-my-suffix';
import { ITestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';
import { TestManyRelPaginDTOMySuffixService } from 'app/entities/test-many-rel-pagin-dto-my-suffix';
import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { TestOneToOneMySuffixService } from 'app/entities/test-one-to-one-my-suffix';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-test-mapstruct-update',
    templateUrl: './test-mapstruct-update.component.html'
})
export class TestMapstructUpdateComponent implements OnInit {
    private _testMapstruct: ITestMapstruct;
    isSaving: boolean;

    testmanytomanies: ITestManyToManyMySuffix[];

    testmanyrelpagindtos: ITestManyRelPaginDTOMySuffix[];

    testonetoones: ITestOneToOneMySuffix[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private testMapstructService: TestMapstructService,
        private testManyToManyService: TestManyToManyMySuffixService,
        private testManyRelPaginDTOService: TestManyRelPaginDTOMySuffixService,
        private testOneToOneService: TestOneToOneMySuffixService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testMapstruct }) => {
            this.testMapstruct = testMapstruct;
        });
        this.testManyToManyService.query().subscribe(
            (res: HttpResponse<ITestManyToManyMySuffix[]>) => {
                this.testmanytomanies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testManyRelPaginDTOService.query().subscribe(
            (res: HttpResponse<ITestManyRelPaginDTOMySuffix[]>) => {
                this.testmanyrelpagindtos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.testOneToOneService.query().subscribe(
            (res: HttpResponse<ITestOneToOneMySuffix[]>) => {
                this.testonetoones = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.testMapstruct.id !== undefined) {
            this.subscribeToSaveResponse(this.testMapstructService.update(this.testMapstruct));
        } else {
            this.subscribeToSaveResponse(this.testMapstructService.create(this.testMapstruct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestMapstruct>>) {
        result.subscribe((res: HttpResponse<ITestMapstruct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTestManyToManyById(index: number, item: ITestManyToManyMySuffix) {
        return item.id;
    }

    trackTestManyRelPaginDTOById(index: number, item: ITestManyRelPaginDTOMySuffix) {
        return item.id;
    }

    trackTestOneToOneById(index: number, item: ITestOneToOneMySuffix) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
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
    get testMapstruct() {
        return this._testMapstruct;
    }

    set testMapstruct(testMapstruct: ITestMapstruct) {
        this._testMapstruct = testMapstruct;
    }
}
