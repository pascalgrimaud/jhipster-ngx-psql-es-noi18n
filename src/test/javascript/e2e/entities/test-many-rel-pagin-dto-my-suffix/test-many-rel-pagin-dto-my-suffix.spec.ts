/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    TestManyRelPaginDTOComponentsPage,
    TestManyRelPaginDTODeleteDialog,
    TestManyRelPaginDTOUpdatePage
} from './test-many-rel-pagin-dto-my-suffix.page-object';

const expect = chai.expect;

describe('TestManyRelPaginDTO e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testManyRelPaginDTOUpdatePage: TestManyRelPaginDTOUpdatePage;
    let testManyRelPaginDTOComponentsPage: TestManyRelPaginDTOComponentsPage;
    let testManyRelPaginDTODeleteDialog: TestManyRelPaginDTODeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestManyRelPaginDTOS', async () => {
        await navBarPage.goToEntity('test-many-rel-pagin-dto-my-suffix');
        testManyRelPaginDTOComponentsPage = new TestManyRelPaginDTOComponentsPage();
        expect(await testManyRelPaginDTOComponentsPage.getTitle()).to.eq('Test Many Rel Pagin DTOS');
    });

    it('should load create TestManyRelPaginDTO page', async () => {
        await testManyRelPaginDTOComponentsPage.clickOnCreateButton();
        testManyRelPaginDTOUpdatePage = new TestManyRelPaginDTOUpdatePage();
        expect(await testManyRelPaginDTOUpdatePage.getPageTitle()).to.eq('Create or edit a Test Many Rel Pagin DTO');
        await testManyRelPaginDTOUpdatePage.cancel();
    });

    it('should create and save TestManyRelPaginDTOS', async () => {
        const nbButtonsBeforeCreate = await testManyRelPaginDTOComponentsPage.countDeleteButtons();

        await testManyRelPaginDTOComponentsPage.clickOnCreateButton();
        // testManyRelPaginDTOUpdatePage.testMapstructSelectLastOption();
        await testManyRelPaginDTOUpdatePage.save();
        expect(await testManyRelPaginDTOUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testManyRelPaginDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TestManyRelPaginDTO', async () => {
        const nbButtonsBeforeDelete = await testManyRelPaginDTOComponentsPage.countDeleteButtons();
        await testManyRelPaginDTOComponentsPage.clickOnLastDeleteButton();

        testManyRelPaginDTODeleteDialog = new TestManyRelPaginDTODeleteDialog();
        expect(await testManyRelPaginDTODeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Test Many Rel Pagin DTO?'
        );
        await testManyRelPaginDTODeleteDialog.clickOnConfirmButton();

        expect(await testManyRelPaginDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
