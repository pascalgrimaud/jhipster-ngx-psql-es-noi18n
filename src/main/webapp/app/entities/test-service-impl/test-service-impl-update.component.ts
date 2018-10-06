import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestServiceImpl } from 'app/shared/model/test-service-impl.model';
import { TestServiceImplService } from './test-service-impl.service';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { TestManyToManyMySuffixService } from 'app/entities/test-many-to-many-my-suffix';
import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { TestOneToOneMySuffixService } from 'app/entities/test-one-to-one-my-suffix';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-test-service-impl-update',
    templateUrl: './test-service-impl-update.component.html'
})
export class TestServiceImplUpdateComponent implements OnInit {
    private _testServiceImpl: ITestServiceImpl;
    isSaving: boolean;

    testmanytomanies: ITestManyToManyMySuffix[];

    testonetoones: ITestOneToOneMySuffix[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private testServiceImplService: TestServiceImplService,
        private testManyToManyService: TestManyToManyMySuffixService,
        private testOneToOneService: TestOneToOneMySuffixService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testServiceImpl }) => {
            this.testServiceImpl = testServiceImpl;
        });
        this.testManyToManyService.query().subscribe(
            (res: HttpResponse<ITestManyToManyMySuffix[]>) => {
                this.testmanytomanies = res.body;
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
        if (this.testServiceImpl.id !== undefined) {
            this.subscribeToSaveResponse(this.testServiceImplService.update(this.testServiceImpl));
        } else {
            this.subscribeToSaveResponse(this.testServiceImplService.create(this.testServiceImpl));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestServiceImpl>>) {
        result.subscribe((res: HttpResponse<ITestServiceImpl>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get testServiceImpl() {
        return this._testServiceImpl;
    }

    set testServiceImpl(testServiceImpl: ITestServiceImpl) {
        this._testServiceImpl = testServiceImpl;
    }
}
