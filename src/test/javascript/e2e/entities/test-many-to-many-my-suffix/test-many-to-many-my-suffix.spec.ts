/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    TestManyToManyComponentsPage,
    TestManyToManyDeleteDialog,
    TestManyToManyUpdatePage
} from './test-many-to-many-my-suffix.page-object';

const expect = chai.expect;

describe('TestManyToMany e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testManyToManyUpdatePage: TestManyToManyUpdatePage;
    let testManyToManyComponentsPage: TestManyToManyComponentsPage;
    let testManyToManyDeleteDialog: TestManyToManyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestManyToManies', async () => {
        await navBarPage.goToEntity('test-many-to-many-my-suffix');
        testManyToManyComponentsPage = new TestManyToManyComponentsPage();
        expect(await testManyToManyComponentsPage.getTitle()).to.eq('Test Many To Manies');
    });

    it('should load create TestManyToMany page', async () => {
        await testManyToManyComponentsPage.clickOnCreateButton();
        testManyToManyUpdatePage = new TestManyToManyUpdatePage();
        expect(await testManyToManyUpdatePage.getPageTitle()).to.eq('Create or edit a Test Many To Many');
        await testManyToManyUpdatePage.cancel();
    });

    it('should create and save TestManyToManies', async () => {
        const nbButtonsBeforeCreate = await testManyToManyComponentsPage.countDeleteButtons();

        await testManyToManyComponentsPage.clickOnCreateButton();
        // testManyToManyUpdatePage.testEntitySelectLastOption();
        // testManyToManyUpdatePage.testMapstructSelectLastOption();
        // testManyToManyUpdatePage.testServiceClassSelectLastOption();
        // testManyToManyUpdatePage.testServiceImplSelectLastOption();
        // testManyToManyUpdatePage.testInfiniteScrollSelectLastOption();
        // testManyToManyUpdatePage.testPagerSelectLastOption();
        // testManyToManyUpdatePage.testPaginationSelectLastOption();
        // testManyToManyUpdatePage.testCustomTableNameSelectLastOption();
        await testManyToManyUpdatePage.save();
        expect(await testManyToManyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testManyToManyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestManyToMany', async () => {
        const nbButtonsBeforeDelete = await testManyToManyComponentsPage.countDeleteButtons();
        await testManyToManyComponentsPage.clickOnLastDeleteButton();

        testManyToManyDeleteDialog = new TestManyToManyDeleteDialog();
        expect(await testManyToManyDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Many To Many?');
        await testManyToManyDeleteDialog.clickOnConfirmButton();

        expect(await testManyToManyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
