/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithServiceImplAndDTOComponentsPage,
    EntityWithServiceImplAndDTODeleteDialog,
    EntityWithServiceImplAndDTOUpdatePage
} from './entity-with-service-impl-and-dto.page-object';

const expect = chai.expect;

describe('EntityWithServiceImplAndDTO e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithServiceImplAndDTOUpdatePage: EntityWithServiceImplAndDTOUpdatePage;
    let entityWithServiceImplAndDTOComponentsPage: EntityWithServiceImplAndDTOComponentsPage;
    let entityWithServiceImplAndDTODeleteDialog: EntityWithServiceImplAndDTODeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithServiceImplAndDTOS', async () => {
        await navBarPage.goToEntity('entity-with-service-impl-and-dto');
        entityWithServiceImplAndDTOComponentsPage = new EntityWithServiceImplAndDTOComponentsPage();
        expect(await entityWithServiceImplAndDTOComponentsPage.getTitle()).to.eq('Entity With Service Impl And DTOS');
    });

    it('should load create EntityWithServiceImplAndDTO page', async () => {
        await entityWithServiceImplAndDTOComponentsPage.clickOnCreateButton();
        entityWithServiceImplAndDTOUpdatePage = new EntityWithServiceImplAndDTOUpdatePage();
        expect(await entityWithServiceImplAndDTOUpdatePage.getPageTitle()).to.eq('Create or edit a Entity With Service Impl And DTO');
        await entityWithServiceImplAndDTOUpdatePage.cancel();
    });

    it('should create and save EntityWithServiceImplAndDTOS', async () => {
        const nbButtonsBeforeCreate = await entityWithServiceImplAndDTOComponentsPage.countDeleteButtons();

        await entityWithServiceImplAndDTOComponentsPage.clickOnCreateButton();
        await entityWithServiceImplAndDTOUpdatePage.setLouisInput('louis');
        expect(await entityWithServiceImplAndDTOUpdatePage.getLouisInput()).to.eq('louis');
        await entityWithServiceImplAndDTOUpdatePage.save();
        expect(await entityWithServiceImplAndDTOUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithServiceImplAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithServiceImplAndDTO', async () => {
        const nbButtonsBeforeDelete = await entityWithServiceImplAndDTOComponentsPage.countDeleteButtons();
        await entityWithServiceImplAndDTOComponentsPage.clickOnLastDeleteButton();

        entityWithServiceImplAndDTODeleteDialog = new EntityWithServiceImplAndDTODeleteDialog();
        expect(await entityWithServiceImplAndDTODeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Service Impl And DTO?'
        );
        await entityWithServiceImplAndDTODeleteDialog.clickOnConfirmButton();

        expect(await entityWithServiceImplAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
