/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithServiceClassAndDTOComponentsPage,
    EntityWithServiceClassAndDTODeleteDialog,
    EntityWithServiceClassAndDTOUpdatePage
} from './entity-with-service-class-and-dto.page-object';

const expect = chai.expect;

describe('EntityWithServiceClassAndDTO e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithServiceClassAndDTOUpdatePage: EntityWithServiceClassAndDTOUpdatePage;
    let entityWithServiceClassAndDTOComponentsPage: EntityWithServiceClassAndDTOComponentsPage;
    let entityWithServiceClassAndDTODeleteDialog: EntityWithServiceClassAndDTODeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithServiceClassAndDTOS', async () => {
        await navBarPage.goToEntity('entity-with-service-class-and-dto');
        entityWithServiceClassAndDTOComponentsPage = new EntityWithServiceClassAndDTOComponentsPage();
        expect(await entityWithServiceClassAndDTOComponentsPage.getTitle()).to.eq('Entity With Service Class And DTOS');
    });

    it('should load create EntityWithServiceClassAndDTO page', async () => {
        await entityWithServiceClassAndDTOComponentsPage.clickOnCreateButton();
        entityWithServiceClassAndDTOUpdatePage = new EntityWithServiceClassAndDTOUpdatePage();
        expect(await entityWithServiceClassAndDTOUpdatePage.getPageTitle()).to.eq('Create or edit a Entity With Service Class And DTO');
        await entityWithServiceClassAndDTOUpdatePage.cancel();
    });

    it('should create and save EntityWithServiceClassAndDTOS', async () => {
        const nbButtonsBeforeCreate = await entityWithServiceClassAndDTOComponentsPage.countDeleteButtons();

        await entityWithServiceClassAndDTOComponentsPage.clickOnCreateButton();
        await entityWithServiceClassAndDTOUpdatePage.setLucasInput('lucas');
        expect(await entityWithServiceClassAndDTOUpdatePage.getLucasInput()).to.eq('lucas');
        await entityWithServiceClassAndDTOUpdatePage.save();
        expect(await entityWithServiceClassAndDTOUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithServiceClassAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithServiceClassAndDTO', async () => {
        const nbButtonsBeforeDelete = await entityWithServiceClassAndDTOComponentsPage.countDeleteButtons();
        await entityWithServiceClassAndDTOComponentsPage.clickOnLastDeleteButton();

        entityWithServiceClassAndDTODeleteDialog = new EntityWithServiceClassAndDTODeleteDialog();
        expect(await entityWithServiceClassAndDTODeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Service Class And DTO?'
        );
        await entityWithServiceClassAndDTODeleteDialog.clickOnConfirmButton();

        expect(await entityWithServiceClassAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
