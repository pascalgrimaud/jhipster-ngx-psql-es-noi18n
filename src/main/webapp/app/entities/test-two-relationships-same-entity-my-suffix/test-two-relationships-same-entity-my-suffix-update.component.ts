import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestTwoRelationshipsSameEntityMySuffix } from 'app/shared/model/test-two-relationships-same-entity-my-suffix.model';
import { TestTwoRelationshipsSameEntityMySuffixService } from './test-two-relationships-same-entity-my-suffix.service';
import { ITestEntityMySuffixAlt } from 'app/shared/model/test-entity-my-suffix-alt.model';
import { TestEntityMySuffixAltService } from 'app/entities/test-entity-my-suffix-alt';
import { IUser, UserService } from 'app/core';
import { IDivision } from 'app/shared/model/test-root/division.model';
import { DivisionService } from 'app/entities/test-root/division';

@Component({
    selector: 'jhi-test-two-relationships-same-entity-my-suffix-update',
    templateUrl: './test-two-relationships-same-entity-my-suffix-update.component.html'
})
export class TestTwoRelationshipsSameEntityMySuffixUpdateComponent implements OnInit {
    private _testTwoRelationshipsSameEntity: ITestTwoRelationshipsSameEntityMySuffix;
    isSaving: boolean;

    testentities: ITestEntityMySuffixAlt[];

    users: IUser[];

    divisions: IDivision[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private testTwoRelationshipsSameEntityService: TestTwoRelationshipsSameEntityMySuffixService,
        private testEntityService: TestEntityMySuffixAltService,
        private userService: UserService,
        private divisionService: DivisionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testTwoRelationshipsSameEntity }) => {
            this.testTwoRelationshipsSameEntity = testTwoRelationshipsSameEntity;
        });
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
        this.divisionService.query().subscribe(
            (res: HttpResponse<IDivision[]>) => {
                this.divisions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.testTwoRelationshipsSameEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.testTwoRelationshipsSameEntityService.update(this.testTwoRelationshipsSameEntity));
        } else {
            this.subscribeToSaveResponse(this.testTwoRelationshipsSameEntityService.create(this.testTwoRelationshipsSameEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestTwoRelationshipsSameEntityMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ITestTwoRelationshipsSameEntityMySuffix>) => this.onSaveSuccess(),
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackDivisionById(index: number, item: IDivision) {
        return item.id;
    }
    get testTwoRelationshipsSameEntity() {
        return this._testTwoRelationshipsSameEntity;
    }

    set testTwoRelationshipsSameEntity(testTwoRelationshipsSameEntity: ITestTwoRelationshipsSameEntityMySuffix) {
        this._testTwoRelationshipsSameEntity = testTwoRelationshipsSameEntity;
    }
}
