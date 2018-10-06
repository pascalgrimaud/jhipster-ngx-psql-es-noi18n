/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestServiceClassComponentsPage, TestServiceClassDeleteDialog, TestServiceClassUpdatePage } from './test-service-class.page-object';

const expect = chai.expect;

describe('TestServiceClass e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testServiceClassUpdatePage: TestServiceClassUpdatePage;
    let testServiceClassComponentsPage: TestServiceClassComponentsPage;
    let testServiceClassDeleteDialog: TestServiceClassDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestServiceClasses', async () => {
        await navBarPage.goToEntity('test-service-class');
        testServiceClassComponentsPage = new TestServiceClassComponentsPage();
        expect(await testServiceClassComponentsPage.getTitle()).to.eq('Test Service Classes');
    });

    it('should load create TestServiceClass page', async () => {
        await testServiceClassComponentsPage.clickOnCreateButton();
        testServiceClassUpdatePage = new TestServiceClassUpdatePage();
        expect(await testServiceClassUpdatePage.getPageTitle()).to.eq('Create or edit a Test Service Class');
        await testServiceClassUpdatePage.cancel();
    });

    it('should create and save TestServiceClasses', async () => {
        const nbButtonsBeforeCreate = await testServiceClassComponentsPage.countDeleteButtons();

        await testServiceClassComponentsPage.clickOnCreateButton();
        await testServiceClassUpdatePage.userOneToManySelectLastOption();
        // testServiceClassUpdatePage.userManyToManySelectLastOption();
        await testServiceClassUpdatePage.userOneToOneSelectLastOption();
        await testServiceClassUpdatePage.save();
        expect(await testServiceClassUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testServiceClassComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestServiceClass', async () => {
        const nbButtonsBeforeDelete = await testServiceClassComponentsPage.countDeleteButtons();
        await testServiceClassComponentsPage.clickOnLastDeleteButton();

        testServiceClassDeleteDialog = new TestServiceClassDeleteDialog();
        expect(await testServiceClassDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Service Class?');
        await testServiceClassDeleteDialog.clickOnConfirmButton();

        expect(await testServiceClassComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
