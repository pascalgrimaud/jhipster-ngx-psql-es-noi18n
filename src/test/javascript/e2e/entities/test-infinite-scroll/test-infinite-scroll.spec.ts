/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    TestInfiniteScrollComponentsPage,
    TestInfiniteScrollDeleteDialog,
    TestInfiniteScrollUpdatePage
} from './test-infinite-scroll.page-object';

const expect = chai.expect;

describe('TestInfiniteScroll e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testInfiniteScrollUpdatePage: TestInfiniteScrollUpdatePage;
    let testInfiniteScrollComponentsPage: TestInfiniteScrollComponentsPage;
    let testInfiniteScrollDeleteDialog: TestInfiniteScrollDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestInfiniteScrolls', async () => {
        await navBarPage.goToEntity('test-infinite-scroll');
        testInfiniteScrollComponentsPage = new TestInfiniteScrollComponentsPage();
        expect(await testInfiniteScrollComponentsPage.getTitle()).to.eq('Test Infinite Scrolls');
    });

    it('should load create TestInfiniteScroll page', async () => {
        await testInfiniteScrollComponentsPage.clickOnCreateButton();
        testInfiniteScrollUpdatePage = new TestInfiniteScrollUpdatePage();
        expect(await testInfiniteScrollUpdatePage.getPageTitle()).to.eq('Create or edit a Test Infinite Scroll');
        await testInfiniteScrollUpdatePage.cancel();
    });

    it('should create and save TestInfiniteScrolls', async () => {
        const nbButtonsBeforeCreate = await testInfiniteScrollComponentsPage.countDeleteButtons();

        await testInfiniteScrollComponentsPage.clickOnCreateButton();
        await testInfiniteScrollUpdatePage.userOneToManySelectLastOption();
        // testInfiniteScrollUpdatePage.userManyToManySelectLastOption();
        await testInfiniteScrollUpdatePage.userOneToOneSelectLastOption();
        await testInfiniteScrollUpdatePage.save();
        expect(await testInfiniteScrollUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testInfiniteScrollComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestInfiniteScroll', async () => {
        const nbButtonsBeforeDelete = await testInfiniteScrollComponentsPage.countDeleteButtons();
        await testInfiniteScrollComponentsPage.clickOnLastDeleteButton();

        testInfiniteScrollDeleteDialog = new TestInfiniteScrollDeleteDialog();
        expect(await testInfiniteScrollDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Infinite Scroll?');
        await testInfiniteScrollDeleteDialog.clickOnConfirmButton();

        expect(await testInfiniteScrollComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
