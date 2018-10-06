/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BankAccountComponentsPage, BankAccountDeleteDialog, BankAccountUpdatePage } from './bank-account-my-suffix.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('BankAccount e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let bankAccountUpdatePage: BankAccountUpdatePage;
    let bankAccountComponentsPage: BankAccountComponentsPage;
    let bankAccountDeleteDialog: BankAccountDeleteDialog;
    const fileToUpload = '../../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load BankAccounts', async () => {
        await navBarPage.goToEntity('bank-account-my-suffix');
        bankAccountComponentsPage = new BankAccountComponentsPage();
        expect(await bankAccountComponentsPage.getTitle()).to.eq('Bank Accounts');
    });

    it('should load create BankAccount page', async () => {
        await bankAccountComponentsPage.clickOnCreateButton();
        bankAccountUpdatePage = new BankAccountUpdatePage();
        expect(await bankAccountUpdatePage.getPageTitle()).to.eq('Create or edit a Bank Account');
        await bankAccountUpdatePage.cancel();
    });

    it('should create and save BankAccounts', async () => {
        const nbButtonsBeforeCreate = await bankAccountComponentsPage.countDeleteButtons();

        await bankAccountComponentsPage.clickOnCreateButton();
        await bankAccountUpdatePage.setNameInput('name');
        expect(await bankAccountUpdatePage.getNameInput()).to.eq('name');
        await bankAccountUpdatePage.setBankNumberInput('5');
        expect(await bankAccountUpdatePage.getBankNumberInput()).to.eq('5');
        await bankAccountUpdatePage.setAgencyNumberInput('5');
        expect(await bankAccountUpdatePage.getAgencyNumberInput()).to.eq('5');
        await bankAccountUpdatePage.setLastOperationDurationInput('5');
        expect(await bankAccountUpdatePage.getLastOperationDurationInput()).to.eq('5');
        await bankAccountUpdatePage.setMeanOperationDurationInput('5');
        expect(await bankAccountUpdatePage.getMeanOperationDurationInput()).to.eq('5');
        await bankAccountUpdatePage.setBalanceInput('5');
        expect(await bankAccountUpdatePage.getBalanceInput()).to.eq('5');
        await bankAccountUpdatePage.setOpeningDayInput('2000-12-31');
        expect(await bankAccountUpdatePage.getOpeningDayInput()).to.eq('2000-12-31');
        await bankAccountUpdatePage.setLastOperationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await bankAccountUpdatePage.getLastOperationDateInput()).to.contain('2001-01-01T02:30');
        const selectedActive = bankAccountUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await bankAccountUpdatePage.getActiveInput().click();
            expect(await bankAccountUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await bankAccountUpdatePage.getActiveInput().click();
            expect(await bankAccountUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        await bankAccountUpdatePage.accountTypeSelectLastOption();
        await bankAccountUpdatePage.setAttachmentInput(absolutePath);
        await bankAccountUpdatePage.setDescriptionInput('description');
        expect(await bankAccountUpdatePage.getDescriptionInput()).to.eq('description');
        await bankAccountUpdatePage.userSelectLastOption();
        await bankAccountUpdatePage.save();
        expect(await bankAccountUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last BankAccount', async () => {
        const nbButtonsBeforeDelete = await bankAccountComponentsPage.countDeleteButtons();
        await bankAccountComponentsPage.clickOnLastDeleteButton();

        bankAccountDeleteDialog = new BankAccountDeleteDialog();
        expect(await bankAccountDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Bank Account?');
        await bankAccountDeleteDialog.clickOnConfirmButton();

        expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
