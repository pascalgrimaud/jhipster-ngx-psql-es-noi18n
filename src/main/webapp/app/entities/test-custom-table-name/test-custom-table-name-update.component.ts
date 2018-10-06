import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestCustomTableName } from 'app/shared/model/test-custom-table-name.model';
import { TestCustomTableNameService } from './test-custom-table-name.service';
import { ITestManyToManyMySuffix } from 'app/shared/model/test-many-to-many-my-suffix.model';
import { TestManyToManyMySuffixService } from 'app/entities/test-many-to-many-my-suffix';
import { ITestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';
import { TestOneToOneMySuffixService } from 'app/entities/test-one-to-one-my-suffix';
import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { TestEntityMySuffixAltService } from 'app/entities/test-entity-my-suffix-alt';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-test-custom-table-name-update',
    templateUrl: './test-custom-table-name-update.component.html'
})
export class TestCustomTableNameUpdateComponent implements OnInit {
    private _testCustomTableName: ITestCustomTableName;
    isSaving: boolean;

    testmanytomanies: ITestManyToManyMySuffix[];

    testonetoones: ITestOneToOneMySuffix[];

    testentities: ITestEntityMySuffixAlt[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private testCustomTableNameService: TestCustomTableNameService,
        private testManyToManyService: TestManyToManyMySuffixService,
        private testOneToOneService: TestOneToOneMySuffixService,
        private testEntityService: TestEntityMySuffixAltService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testCustomTableName }) => {
            this.testCustomTableName = testCustomTableName;
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
        this.testEntityService.query().subscribe(
            (res: HttpResponse<ITestEntityMySuffixAlt[]>) => {
                this.testentities = res.body;
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
        if (this.testCustomTableName.id !== undefined) {
            this.subscribeToSaveResponse(this.testCustomTableNameService.update(this.testCustomTableName));
        } else {
            this.subscribeToSaveResponse(this.testCustomTableNameService.create(this.testCustomTableName));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestCustomTableName>>) {
        result.subscribe((res: HttpResponse<ITestCustomTableName>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTestEntityById(index: number, item: ITestEntityMySuffixAlt) {
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
    get testCustomTableName() {
        return this._testCustomTableName;
    }

    set testCustomTableName(testCustomTableName: ITestCustomTableName) {
        this._testCustomTableName = testCustomTableName;
    }
}
