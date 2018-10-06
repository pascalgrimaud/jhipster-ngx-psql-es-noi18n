/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    TestCustomTableNameComponentsPage,
    TestCustomTableNameDeleteDialog,
    TestCustomTableNameUpdatePage
} from './test-custom-table-name.page-object';

const expect = chai.expect;

describe('TestCustomTableName e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testCustomTableNameUpdatePage: TestCustomTableNameUpdatePage;
    let testCustomTableNameComponentsPage: TestCustomTableNameComponentsPage;
    /*let testCustomTableNameDeleteDialog: TestCustomTableNameDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestCustomTableNames', async () => {
        await navBarPage.goToEntity('test-custom-table-name');
        testCustomTableNameComponentsPage = new TestCustomTableNameComponentsPage();
        expect(await testCustomTableNameComponentsPage.getTitle()).to.eq('Test Custom Table Names');
    });

    it('should load create TestCustomTableName page', async () => {
        await testCustomTableNameComponentsPage.clickOnCreateButton();
        testCustomTableNameUpdatePage = new TestCustomTableNameUpdatePage();
        expect(await testCustomTableNameUpdatePage.getPageTitle()).to.eq('Create or edit a Test Custom Table Name');
        await testCustomTableNameUpdatePage.cancel();
    });

    /* it('should create and save TestCustomTableNames', async () => {
        const nbButtonsBeforeCreate = await testCustomTableNameComponentsPage.countDeleteButtons();

        await testCustomTableNameComponentsPage.clickOnCreateButton();
        await testCustomTableNameUpdatePage.testEntitySelectLastOption();
        await testCustomTableNameUpdatePage.userOneToManySelectLastOption();
        // testCustomTableNameUpdatePage.userManyToManySelectLastOption();
        await testCustomTableNameUpdatePage.userOneToOneSelectLastOption();
        await testCustomTableNameUpdatePage.save();
        expect(await testCustomTableNameUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testCustomTableNameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last TestCustomTableName', async () => {
        const nbButtonsBeforeDelete = await testCustomTableNameComponentsPage.countDeleteButtons();
        await testCustomTableNameComponentsPage.clickOnLastDeleteButton();

        testCustomTableNameDeleteDialog = new TestCustomTableNameDeleteDialog();
        expect(await testCustomTableNameDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Test Custom Table Name?');
        await testCustomTableNameDeleteDialog.clickOnConfirmButton();

        expect(await testCustomTableNameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
