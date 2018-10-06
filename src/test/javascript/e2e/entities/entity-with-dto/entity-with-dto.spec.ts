/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EntityWithDTOComponentsPage, EntityWithDTODeleteDialog, EntityWithDTOUpdatePage } from './entity-with-dto.page-object';

const expect = chai.expect;

describe('EntityWithDTO e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithDTOUpdatePage: EntityWithDTOUpdatePage;
    let entityWithDTOComponentsPage: EntityWithDTOComponentsPage;
    let entityWithDTODeleteDialog: EntityWithDTODeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithDTOS', async () => {
        await navBarPage.goToEntity('entity-with-dto');
        entityWithDTOComponentsPage = new EntityWithDTOComponentsPage();
        expect(await entityWithDTOComponentsPage.getTitle()).to.eq('Entity With DTOS');
    });

    it('should load create EntityWithDTO page', async () => {
        await entityWithDTOComponentsPage.clickOnCreateButton();
        entityWithDTOUpdatePage = new EntityWithDTOUpdatePage();
        expect(await entityWithDTOUpdatePage.getPageTitle()).to.eq('Create or edit a Entity With DTO');
        await entityWithDTOUpdatePage.cancel();
    });

    it('should create and save EntityWithDTOS', async () => {
        const nbButtonsBeforeCreate = await entityWithDTOComponentsPage.countDeleteButtons();

        await entityWithDTOComponentsPage.clickOnCreateButton();
        await entityWithDTOUpdatePage.setEmmaInput('emma');
        expect(await entityWithDTOUpdatePage.getEmmaInput()).to.eq('emma');
        await entityWithDTOUpdatePage.save();
        expect(await entityWithDTOUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithDTO', async () => {
        const nbButtonsBeforeDelete = await entityWithDTOComponentsPage.countDeleteButtons();
        await entityWithDTOComponentsPage.clickOnLastDeleteButton();

        entityWithDTODeleteDialog = new EntityWithDTODeleteDialog();
        expect(await entityWithDTODeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Entity With DTO?');
        await entityWithDTODeleteDialog.clickOnConfirmButton();

        expect(await entityWithDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
