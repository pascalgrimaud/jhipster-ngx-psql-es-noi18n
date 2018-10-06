import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankAccountMySuffix } from 'app/shared/model/test-root/bank-account-my-suffix.model';
import { BankAccountMySuffixService } from './bank-account-my-suffix.service';
import { BankAccountMySuffixComponent } from './bank-account-my-suffix.component';
import { BankAccountMySuffixDetailComponent } from './bank-account-my-suffix-detail.component';
import { BankAccountMySuffixUpdateComponent } from './bank-account-my-suffix-update.component';
import { BankAccountMySuffixDeletePopupComponent } from './bank-account-my-suffix-delete-dialog.component';
import { IBankAccountMySuffix } from 'app/shared/model/test-root/bank-account-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class BankAccountMySuffixResolve implements Resolve<IBankAccountMySuffix> {
    constructor(private service: BankAccountMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bankAccount: HttpResponse<BankAccountMySuffix>) => bankAccount.body));
        }
        return of(new BankAccountMySuffix());
    }
}

export const bankAccountRoute: Routes = [
    {
        path: 'bank-account-my-suffix',
        component: BankAccountMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-account-my-suffix/:id/view',
        component: BankAccountMySuffixDetailComponent,
        resolve: {
            bankAccount: BankAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-account-my-suffix/new',
        component: BankAccountMySuffixUpdateComponent,
        resolve: {
            bankAccount: BankAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-account-my-suffix/:id/edit',
        component: BankAccountMySuffixUpdateComponent,
        resolve: {
            bankAccount: BankAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankAccountPopupRoute: Routes = [
    {
        path: 'bank-account-my-suffix/:id/delete',
        component: BankAccountMySuffixDeletePopupComponent,
        resolve: {
            bankAccount: BankAccountMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
