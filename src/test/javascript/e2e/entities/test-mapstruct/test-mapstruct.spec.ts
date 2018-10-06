/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestMapstructComponentsPage, TestMapstructDeleteDialog, TestMapstructUpdatePage } from './test-mapstruct.page-object';

const expect = chai.expect;

describe('TestMapstruct e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testMapstructUpdatePage: TestMapstructUpdatePage;
    let testMapstructComponentsPage: TestMapstructComponentsPage;
    let testMapstructDeleteDialog: TestMapstructDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestMapstructs', async () => {
        await navBarPage.goToEntity('test-mapstruct');
        testMapstructComponentsPage = new TestMapstructComponentsPage();
        expect(await testMapstructComponentsPage.getTitle()).to.eq('Test Mapstructs');
    });

    it('should load create TestMapstruct page', async () => {
        await testMapstructComponentsPage.clickOnCreateButton();
        testMapstructUpdatePage = new TestMapstructUpdatePage();
        expect(await testMapstructUpdatePage.getPageTitle()).to.eq('Create or edit a Test Mapstruct');
        await testMapstructUpdatePage.cancel();
    });

    it('should create and save TestMapstructs', async () => {
        const nbButtonsBeforeCreate = await testMapstructComponentsPage.countDeleteButtons();

        await testMapstructComponentsPage.clickOnCreateButton();
        await testMapstructUpdatePage.userOneToManySelectLastOption();
        // testMapstructUpdatePage.userManyToManySelectLastOption();
        await testMapstructUpdatePage.userOneToOneSelectLastOption();
        await testMapstructUpdatePage.save();
        expect(await testMapstructUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testMapstructComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestMapstruct', async () => {
        const nbButtonsBeforeDelete = await testMapstructComponentsPage.countDeleteButtons();
        await testMapstructComponentsPage.clickOnLastDeleteButton();

        testMapstructDeleteDialog = new TestMapstructDeleteDialog();
        expect(await testMapstructDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Mapstruct?');
        await testMapstructDeleteDialog.clickOnConfirmButton();

        expect(await testMapstructComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
