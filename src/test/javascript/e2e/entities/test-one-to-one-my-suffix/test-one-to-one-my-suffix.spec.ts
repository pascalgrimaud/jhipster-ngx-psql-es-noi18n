/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestOneToOneComponentsPage, TestOneToOneDeleteDialog, TestOneToOneUpdatePage } from './test-one-to-one-my-suffix.page-object';

const expect = chai.expect;

describe('TestOneToOne e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testOneToOneUpdatePage: TestOneToOneUpdatePage;
    let testOneToOneComponentsPage: TestOneToOneComponentsPage;
    let testOneToOneDeleteDialog: TestOneToOneDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestOneToOnes', async () => {
        await navBarPage.goToEntity('test-one-to-one-my-suffix');
        testOneToOneComponentsPage = new TestOneToOneComponentsPage();
        expect(await testOneToOneComponentsPage.getTitle()).to.eq('Test One To Ones');
    });

    it('should load create TestOneToOne page', async () => {
        await testOneToOneComponentsPage.clickOnCreateButton();
        testOneToOneUpdatePage = new TestOneToOneUpdatePage();
        expect(await testOneToOneUpdatePage.getPageTitle()).to.eq('Create or edit a Test One To One');
        await testOneToOneUpdatePage.cancel();
    });

    it('should create and save TestOneToOnes', async () => {
        const nbButtonsBeforeCreate = await testOneToOneComponentsPage.countDeleteButtons();

        await testOneToOneComponentsPage.clickOnCreateButton();
        await testOneToOneUpdatePage.testEntitySelectLastOption();
        await testOneToOneUpdatePage.testMapstructSelectLastOption();
        await testOneToOneUpdatePage.testServiceClassSelectLastOption();
        await testOneToOneUpdatePage.testServiceImplSelectLastOption();
        await testOneToOneUpdatePage.testInfiniteScrollSelectLastOption();
        await testOneToOneUpdatePage.testPagerSelectLastOption();
        await testOneToOneUpdatePage.testPaginationSelectLastOption();
        await testOneToOneUpdatePage.testCustomTableNameSelectLastOption();
        await testOneToOneUpdatePage.save();
        expect(await testOneToOneUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testOneToOneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestOneToOne', async () => {
        const nbButtonsBeforeDelete = await testOneToOneComponentsPage.countDeleteButtons();
        await testOneToOneComponentsPage.clickOnLastDeleteButton();

        testOneToOneDeleteDialog = new TestOneToOneDeleteDialog();
        expect(await testOneToOneDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test One To One?');
        await testOneToOneDeleteDialog.clickOnConfirmButton();

        expect(await testOneToOneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
