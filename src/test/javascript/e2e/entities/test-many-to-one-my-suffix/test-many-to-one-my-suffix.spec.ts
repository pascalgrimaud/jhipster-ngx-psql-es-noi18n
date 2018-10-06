/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestManyToOneComponentsPage, TestManyToOneDeleteDialog, TestManyToOneUpdatePage } from './test-many-to-one-my-suffix.page-object';

const expect = chai.expect;

describe('TestManyToOne e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testManyToOneUpdatePage: TestManyToOneUpdatePage;
    let testManyToOneComponentsPage: TestManyToOneComponentsPage;
    let testManyToOneDeleteDialog: TestManyToOneDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestManyToOnes', async () => {
        await navBarPage.goToEntity('test-many-to-one-my-suffix');
        testManyToOneComponentsPage = new TestManyToOneComponentsPage();
        expect(await testManyToOneComponentsPage.getTitle()).to.eq('Test Many To Ones');
    });

    it('should load create TestManyToOne page', async () => {
        await testManyToOneComponentsPage.clickOnCreateButton();
        testManyToOneUpdatePage = new TestManyToOneUpdatePage();
        expect(await testManyToOneUpdatePage.getPageTitle()).to.eq('Create or edit a Test Many To One');
        await testManyToOneUpdatePage.cancel();
    });

    it('should create and save TestManyToOnes', async () => {
        const nbButtonsBeforeCreate = await testManyToOneComponentsPage.countDeleteButtons();

        await testManyToOneComponentsPage.clickOnCreateButton();
        await testManyToOneUpdatePage.testEntitySelectLastOption();
        await testManyToOneUpdatePage.testMapstructSelectLastOption();
        await testManyToOneUpdatePage.testServiceClassSelectLastOption();
        await testManyToOneUpdatePage.testServiceImplSelectLastOption();
        await testManyToOneUpdatePage.testInfiniteScrollSelectLastOption();
        await testManyToOneUpdatePage.testPagerSelectLastOption();
        await testManyToOneUpdatePage.testPaginationSelectLastOption();
        await testManyToOneUpdatePage.testCustomTableNameSelectLastOption();
        await testManyToOneUpdatePage.save();
        expect(await testManyToOneUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testManyToOneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestManyToOne', async () => {
        const nbButtonsBeforeDelete = await testManyToOneComponentsPage.countDeleteButtons();
        await testManyToOneComponentsPage.clickOnLastDeleteButton();

        testManyToOneDeleteDialog = new TestManyToOneDeleteDialog();
        expect(await testManyToOneDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Many To One?');
        await testManyToOneDeleteDialog.clickOnConfirmButton();

        expect(await testManyToOneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
