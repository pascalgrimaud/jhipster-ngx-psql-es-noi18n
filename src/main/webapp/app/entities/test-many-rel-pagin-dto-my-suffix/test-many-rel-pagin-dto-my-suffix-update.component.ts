import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITestManyRelPaginDTOMySuffix } from 'app/shared/model/test-many-rel-pagin-dto-my-suffix.model';
import { TestManyRelPaginDTOMySuffixService } from './test-many-rel-pagin-dto-my-suffix.service';
import { ITestMapstruct } from 'app/shared/model/test-mapstruct.model';
import { TestMapstructService } from 'app/entities/test-mapstruct';

@Component({
    selector: 'jhi-test-many-rel-pagin-dto-my-suffix-update',
    templateUrl: './test-many-rel-pagin-dto-my-suffix-update.component.html'
})
export class TestManyRelPaginDTOMySuffixUpdateComponent implements OnInit {
    private _testManyRelPaginDTO: ITestManyRelPaginDTOMySuffix;
    isSaving: boolean;

    testmapstructs: ITestMapstruct[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private testManyRelPaginDTOService: TestManyRelPaginDTOMySuffixService,
        private testMapstructService: TestMapstructService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ testManyRelPaginDTO }) => {
            this.testManyRelPaginDTO = testManyRelPaginDTO;
        });
        this.testMapstructService.query().subscribe(
            (res: HttpResponse<ITestMapstruct[]>) => {
                this.testmapstructs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.testManyRelPaginDTO.id !== undefined) {
            this.subscribeToSaveResponse(this.testManyRelPaginDTOService.update(this.testManyRelPaginDTO));
        } else {
            this.subscribeToSaveResponse(this.testManyRelPaginDTOService.create(this.testManyRelPaginDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITestManyRelPaginDTOMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ITestManyRelPaginDTOMySuffix>) => this.onSaveSuccess(),
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

    trackTestMapstructById(index: number, item: ITestMapstruct) {
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
    get testManyRelPaginDTO() {
        return this._testManyRelPaginDTO;
    }

    set testManyRelPaginDTO(testManyRelPaginDTO: ITestManyRelPaginDTOMySuffix) {
        this._testManyRelPaginDTO = testManyRelPaginDTO;
    }
}
