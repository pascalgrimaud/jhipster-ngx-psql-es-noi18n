/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestPagerComponentsPage, TestPagerDeleteDialog, TestPagerUpdatePage } from './test-pager.page-object';

const expect = chai.expect;

describe('TestPager e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testPagerUpdatePage: TestPagerUpdatePage;
    let testPagerComponentsPage: TestPagerComponentsPage;
    let testPagerDeleteDialog: TestPagerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestPagers', async () => {
        await navBarPage.goToEntity('test-pager');
        testPagerComponentsPage = new TestPagerComponentsPage();
        expect(await testPagerComponentsPage.getTitle()).to.eq('Test Pagers');
    });

    it('should load create TestPager page', async () => {
        await testPagerComponentsPage.clickOnCreateButton();
        testPagerUpdatePage = new TestPagerUpdatePage();
        expect(await testPagerUpdatePage.getPageTitle()).to.eq('Create or edit a Test Pager');
        await testPagerUpdatePage.cancel();
    });

    it('should create and save TestPagers', async () => {
        const nbButtonsBeforeCreate = await testPagerComponentsPage.countDeleteButtons();

        await testPagerComponentsPage.clickOnCreateButton();
        await testPagerUpdatePage.userOneToManySelectLastOption();
        // testPagerUpdatePage.userManyToManySelectLastOption();
        await testPagerUpdatePage.userOneToOneSelectLastOption();
        await testPagerUpdatePage.save();
        expect(await testPagerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testPagerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestPager', async () => {
        const nbButtonsBeforeDelete = await testPagerComponentsPage.countDeleteButtons();
        await testPagerComponentsPage.clickOnLastDeleteButton();

        testPagerDeleteDialog = new TestPagerDeleteDialog();
        expect(await testPagerDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Pager?');
        await testPagerDeleteDialog.clickOnConfirmButton();

        expect(await testPagerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
