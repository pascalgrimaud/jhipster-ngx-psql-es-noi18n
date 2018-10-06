/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestPaginationComponentsPage, TestPaginationDeleteDialog, TestPaginationUpdatePage } from './test-pagination.page-object';

const expect = chai.expect;

describe('TestPagination e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testPaginationUpdatePage: TestPaginationUpdatePage;
    let testPaginationComponentsPage: TestPaginationComponentsPage;
    let testPaginationDeleteDialog: TestPaginationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestPaginations', async () => {
        await navBarPage.goToEntity('test-pagination');
        testPaginationComponentsPage = new TestPaginationComponentsPage();
        expect(await testPaginationComponentsPage.getTitle()).to.eq('Test Paginations');
    });

    it('should load create TestPagination page', async () => {
        await testPaginationComponentsPage.clickOnCreateButton();
        testPaginationUpdatePage = new TestPaginationUpdatePage();
        expect(await testPaginationUpdatePage.getPageTitle()).to.eq('Create or edit a Test Pagination');
        await testPaginationUpdatePage.cancel();
    });

    it('should create and save TestPaginations', async () => {
        const nbButtonsBeforeCreate = await testPaginationComponentsPage.countDeleteButtons();

        await testPaginationComponentsPage.clickOnCreateButton();
        await testPaginationUpdatePage.userOneToManySelectLastOption();
        // testPaginationUpdatePage.userManyToManySelectLastOption();
        await testPaginationUpdatePage.userOneToOneSelectLastOption();
        await testPaginationUpdatePage.save();
        expect(await testPaginationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testPaginationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestPagination', async () => {
        const nbButtonsBeforeDelete = await testPaginationComponentsPage.countDeleteButtons();
        await testPaginationComponentsPage.clickOnLastDeleteButton();

        testPaginationDeleteDialog = new TestPaginationDeleteDialog();
        expect(await testPaginationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Pagination?');
        await testPaginationDeleteDialog.clickOnConfirmButton();

        expect(await testPaginationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
