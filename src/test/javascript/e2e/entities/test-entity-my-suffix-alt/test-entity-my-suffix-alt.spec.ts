/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TestEntityComponentsPage, TestEntityDeleteDialog, TestEntityUpdatePage } from './test-entity-my-suffix-alt.page-object';

const expect = chai.expect;

describe('TestEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testEntityUpdatePage: TestEntityUpdatePage;
    let testEntityComponentsPage: TestEntityComponentsPage;
    /*let testEntityDeleteDialog: TestEntityDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestEntities', async () => {
        await navBarPage.goToEntity('test-entity-my-suffix-alt');
        testEntityComponentsPage = new TestEntityComponentsPage();
        expect(await testEntityComponentsPage.getTitle()).to.eq('Test Entities');
    });

    it('should load create TestEntity page', async () => {
        await testEntityComponentsPage.clickOnCreateButton();
        testEntityUpdatePage = new TestEntityUpdatePage();
        expect(await testEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Test Entity');
        await testEntityUpdatePage.cancel();
    });

    /* it('should create and save TestEntities', async () => {
        const nbButtonsBeforeCreate = await testEntityComponentsPage.countDeleteButtons();

        await testEntityComponentsPage.clickOnCreateButton();
        await testEntityUpdatePage.userOneToManySelectLastOption();
        // testEntityUpdatePage.userManyToManySelectLastOption();
        await testEntityUpdatePage.userOneToOneSelectLastOption();
        await testEntityUpdatePage.save();
        expect(await testEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last TestEntity', async () => {
        const nbButtonsBeforeDelete = await testEntityComponentsPage.countDeleteButtons();
        await testEntityComponentsPage.clickOnLastDeleteButton();

        testEntityDeleteDialog = new TestEntityDeleteDialog();
        expect(await testEntityDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Test Entity?');
        await testEntityDeleteDialog.clickOnConfirmButton();

        expect(await testEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
