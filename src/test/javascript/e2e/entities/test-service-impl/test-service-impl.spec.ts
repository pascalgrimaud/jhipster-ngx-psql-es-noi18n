/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestServiceImplComponentsPage, TestServiceImplDeleteDialog, TestServiceImplUpdatePage } from './test-service-impl.page-object';

const expect = chai.expect;

describe('TestServiceImpl e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testServiceImplUpdatePage: TestServiceImplUpdatePage;
    let testServiceImplComponentsPage: TestServiceImplComponentsPage;
    let testServiceImplDeleteDialog: TestServiceImplDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestServiceImpls', async () => {
        await navBarPage.goToEntity('test-service-impl');
        testServiceImplComponentsPage = new TestServiceImplComponentsPage();
        expect(await testServiceImplComponentsPage.getTitle()).to.eq('Test Service Impls');
    });

    it('should load create TestServiceImpl page', async () => {
        await testServiceImplComponentsPage.clickOnCreateButton();
        testServiceImplUpdatePage = new TestServiceImplUpdatePage();
        expect(await testServiceImplUpdatePage.getPageTitle()).to.eq('Create or edit a Test Service Impl');
        await testServiceImplUpdatePage.cancel();
    });

    it('should create and save TestServiceImpls', async () => {
        const nbButtonsBeforeCreate = await testServiceImplComponentsPage.countDeleteButtons();

        await testServiceImplComponentsPage.clickOnCreateButton();
        await testServiceImplUpdatePage.userOneToManySelectLastOption();
        // testServiceImplUpdatePage.userManyToManySelectLastOption();
        await testServiceImplUpdatePage.userOneToOneSelectLastOption();
        await testServiceImplUpdatePage.save();
        expect(await testServiceImplUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testServiceImplComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestServiceImpl', async () => {
        const nbButtonsBeforeDelete = await testServiceImplComponentsPage.countDeleteButtons();
        await testServiceImplComponentsPage.clickOnLastDeleteButton();

        testServiceImplDeleteDialog = new TestServiceImplDeleteDialog();
        expect(await testServiceImplDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Test Service Impl?');
        await testServiceImplDeleteDialog.clickOnConfirmButton();

        expect(await testServiceImplComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
