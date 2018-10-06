/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithServiceClassComponentsPage,
    EntityWithServiceClassDeleteDialog,
    EntityWithServiceClassUpdatePage
} from './entity-with-service-class.page-object';

const expect = chai.expect;

describe('EntityWithServiceClass e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithServiceClassUpdatePage: EntityWithServiceClassUpdatePage;
    let entityWithServiceClassComponentsPage: EntityWithServiceClassComponentsPage;
    let entityWithServiceClassDeleteDialog: EntityWithServiceClassDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithServiceClasses', async () => {
        await navBarPage.goToEntity('entity-with-service-class');
        entityWithServiceClassComponentsPage = new EntityWithServiceClassComponentsPage();
        expect(await entityWithServiceClassComponentsPage.getTitle()).to.eq('Entity With Service Classes');
    });

    it('should load create EntityWithServiceClass page', async () => {
        await entityWithServiceClassComponentsPage.clickOnCreateButton();
        entityWithServiceClassUpdatePage = new EntityWithServiceClassUpdatePage();
        expect(await entityWithServiceClassUpdatePage.getPageTitle()).to.eq('Create or edit a Entity With Service Class');
        await entityWithServiceClassUpdatePage.cancel();
    });

    it('should create and save EntityWithServiceClasses', async () => {
        const nbButtonsBeforeCreate = await entityWithServiceClassComponentsPage.countDeleteButtons();

        await entityWithServiceClassComponentsPage.clickOnCreateButton();
        await entityWithServiceClassUpdatePage.setZoeInput('zoe');
        expect(await entityWithServiceClassUpdatePage.getZoeInput()).to.eq('zoe');
        await entityWithServiceClassUpdatePage.save();
        expect(await entityWithServiceClassUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithServiceClassComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithServiceClass', async () => {
        const nbButtonsBeforeDelete = await entityWithServiceClassComponentsPage.countDeleteButtons();
        await entityWithServiceClassComponentsPage.clickOnLastDeleteButton();

        entityWithServiceClassDeleteDialog = new EntityWithServiceClassDeleteDialog();
        expect(await entityWithServiceClassDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Service Class?'
        );
        await entityWithServiceClassDeleteDialog.clickOnConfirmButton();

        expect(await entityWithServiceClassComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
