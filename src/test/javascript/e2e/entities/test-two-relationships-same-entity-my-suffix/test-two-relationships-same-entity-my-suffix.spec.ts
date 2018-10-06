/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    TestTwoRelationshipsSameEntityComponentsPage,
    TestTwoRelationshipsSameEntityDeleteDialog,
    TestTwoRelationshipsSameEntityUpdatePage
} from './test-two-relationships-same-entity-my-suffix.page-object';

const expect = chai.expect;

describe('TestTwoRelationshipsSameEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let testTwoRelationshipsSameEntityUpdatePage: TestTwoRelationshipsSameEntityUpdatePage;
    let testTwoRelationshipsSameEntityComponentsPage: TestTwoRelationshipsSameEntityComponentsPage;
    /*let testTwoRelationshipsSameEntityDeleteDialog: TestTwoRelationshipsSameEntityDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TestTwoRelationshipsSameEntities', async () => {
        await navBarPage.goToEntity('test-two-relationships-same-entity-my-suffix');
        testTwoRelationshipsSameEntityComponentsPage = new TestTwoRelationshipsSameEntityComponentsPage();
        expect(await testTwoRelationshipsSameEntityComponentsPage.getTitle()).to.eq('Test Two Relationships Same Entities');
    });

    it('should load create TestTwoRelationshipsSameEntity page', async () => {
        await testTwoRelationshipsSameEntityComponentsPage.clickOnCreateButton();
        testTwoRelationshipsSameEntityUpdatePage = new TestTwoRelationshipsSameEntityUpdatePage();
        expect(await testTwoRelationshipsSameEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Test Two Relationships Same Entity');
        await testTwoRelationshipsSameEntityUpdatePage.cancel();
    });

    /* it('should create and save TestTwoRelationshipsSameEntities', async () => {
        const nbButtonsBeforeCreate = await testTwoRelationshipsSameEntityComponentsPage.countDeleteButtons();

        await testTwoRelationshipsSameEntityComponentsPage.clickOnCreateButton();
        await testTwoRelationshipsSameEntityUpdatePage.firstRelationshipSelectLastOption();
        await testTwoRelationshipsSameEntityUpdatePage.secondRelationshipSelectLastOption();
        await testTwoRelationshipsSameEntityUpdatePage.userOneSelectLastOption();
        await testTwoRelationshipsSameEntityUpdatePage.userTwoSelectLastOption();
        await testTwoRelationshipsSameEntityUpdatePage.firstUniqueRequiredRelationSelectLastOption();
        await testTwoRelationshipsSameEntityUpdatePage.secondUniqueRequiredRelationSelectLastOption();
        await testTwoRelationshipsSameEntityUpdatePage.save();
        expect(await testTwoRelationshipsSameEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await testTwoRelationshipsSameEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last TestTwoRelationshipsSameEntity', async () => {
        const nbButtonsBeforeDelete = await testTwoRelationshipsSameEntityComponentsPage.countDeleteButtons();
        await testTwoRelationshipsSameEntityComponentsPage.clickOnLastDeleteButton();

        testTwoRelationshipsSameEntityDeleteDialog = new TestTwoRelationshipsSameEntityDeleteDialog();
        expect(await testTwoRelationshipsSameEntityDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Test Two Relationships Same Entity?');
        await testTwoRelationshipsSameEntityDeleteDialog.clickOnConfirmButton();

        expect(await testTwoRelationshipsSameEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
