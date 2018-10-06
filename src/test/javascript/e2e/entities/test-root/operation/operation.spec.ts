/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { OperationComponentsPage, OperationDeleteDialog, OperationUpdatePage } from './operation.page-object';

const expect = chai.expect;

describe('Operation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let operationUpdatePage: OperationUpdatePage;
    let operationComponentsPage: OperationComponentsPage;
    let operationDeleteDialog: OperationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Operations', async () => {
        await navBarPage.goToEntity('operation');
        operationComponentsPage = new OperationComponentsPage();
        expect(await operationComponentsPage.getTitle()).to.eq('Operations');
    });

    it('should load create Operation page', async () => {
        await operationComponentsPage.clickOnCreateButton();
        operationUpdatePage = new OperationUpdatePage();
        expect(await operationUpdatePage.getPageTitle()).to.eq('Create or edit a Operation');
        await operationUpdatePage.cancel();
    });

    it('should create and save Operations', async () => {
        const nbButtonsBeforeCreate = await operationComponentsPage.countDeleteButtons();

        await operationComponentsPage.clickOnCreateButton();
        await operationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await operationUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        await operationUpdatePage.setDescriptionInput('description');
        expect(await operationUpdatePage.getDescriptionInput()).to.eq('description');
        await operationUpdatePage.setAmountInput('5');
        expect(await operationUpdatePage.getAmountInput()).to.eq('5');
        await operationUpdatePage.bankAccountSelectLastOption();
        // operationUpdatePage.labelSelectLastOption();
        await operationUpdatePage.save();
        expect(await operationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Operation', async () => {
        const nbButtonsBeforeDelete = await operationComponentsPage.countDeleteButtons();
        await operationComponentsPage.clickOnLastDeleteButton();

        operationDeleteDialog = new OperationDeleteDialog();
        expect(await operationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Operation?');
        await operationDeleteDialog.clickOnConfirmButton();

        expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
