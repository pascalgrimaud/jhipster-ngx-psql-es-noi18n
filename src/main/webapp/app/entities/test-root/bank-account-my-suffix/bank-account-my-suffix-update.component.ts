import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBankAccountMySuffix } from 'app/shared/model/test-root/bank-account-my-suffix.model';
import { BankAccountMySuffixService } from './bank-account-my-suffix.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-bank-account-my-suffix-update',
    templateUrl: './bank-account-my-suffix-update.component.html'
})
export class BankAccountMySuffixUpdateComponent implements OnInit {
    private _bankAccount: IBankAccountMySuffix;
    isSaving: boolean;

    users: IUser[];
    openingDayDp: any;
    lastOperationDate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private bankAccountService: BankAccountMySuffixService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bankAccount }) => {
            this.bankAccount = bankAccount;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.bankAccount.lastOperationDate = moment(this.lastOperationDate, DATE_TIME_FORMAT);
        if (this.bankAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.bankAccountService.update(this.bankAccount));
        } else {
            this.subscribeToSaveResponse(this.bankAccountService.create(this.bankAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBankAccountMySuffix>>) {
        result.subscribe((res: HttpResponse<IBankAccountMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get bankAccount() {
        return this._bankAccount;
    }

    set bankAccount(bankAccount: IBankAccountMySuffix) {
        this._bankAccount = bankAccount;
        this.lastOperationDate = moment(bankAccount.lastOperationDate).format(DATE_TIME_FORMAT);
    }
}
