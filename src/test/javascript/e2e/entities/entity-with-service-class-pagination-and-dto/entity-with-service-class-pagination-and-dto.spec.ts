/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithServiceClassPaginationAndDTOComponentsPage,
    EntityWithServiceClassPaginationAndDTODeleteDialog,
    EntityWithServiceClassPaginationAndDTOUpdatePage
} from './entity-with-service-class-pagination-and-dto.page-object';

const expect = chai.expect;

describe('EntityWithServiceClassPaginationAndDTO e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithServiceClassPaginationAndDTOUpdatePage: EntityWithServiceClassPaginationAndDTOUpdatePage;
    let entityWithServiceClassPaginationAndDTOComponentsPage: EntityWithServiceClassPaginationAndDTOComponentsPage;
    let entityWithServiceClassPaginationAndDTODeleteDialog: EntityWithServiceClassPaginationAndDTODeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithServiceClassPaginationAndDTOS', async () => {
        await navBarPage.goToEntity('entity-with-service-class-pagination-and-dto');
        entityWithServiceClassPaginationAndDTOComponentsPage = new EntityWithServiceClassPaginationAndDTOComponentsPage();
        expect(await entityWithServiceClassPaginationAndDTOComponentsPage.getTitle()).to.eq(
            'Entity With Service Class Pagination And DTOS'
        );
    });

    it('should load create EntityWithServiceClassPaginationAndDTO page', async () => {
        await entityWithServiceClassPaginationAndDTOComponentsPage.clickOnCreateButton();
        entityWithServiceClassPaginationAndDTOUpdatePage = new EntityWithServiceClassPaginationAndDTOUpdatePage();
        expect(await entityWithServiceClassPaginationAndDTOUpdatePage.getPageTitle()).to.eq(
            'Create or edit a Entity With Service Class Pagination And DTO'
        );
        await entityWithServiceClassPaginationAndDTOUpdatePage.cancel();
    });

    it('should create and save EntityWithServiceClassPaginationAndDTOS', async () => {
        const nbButtonsBeforeCreate = await entityWithServiceClassPaginationAndDTOComponentsPage.countDeleteButtons();

        await entityWithServiceClassPaginationAndDTOComponentsPage.clickOnCreateButton();
        await entityWithServiceClassPaginationAndDTOUpdatePage.setLenaInput('lena');
        expect(await entityWithServiceClassPaginationAndDTOUpdatePage.getLenaInput()).to.eq('lena');
        await entityWithServiceClassPaginationAndDTOUpdatePage.save();
        expect(await entityWithServiceClassPaginationAndDTOUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithServiceClassPaginationAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithServiceClassPaginationAndDTO', async () => {
        const nbButtonsBeforeDelete = await entityWithServiceClassPaginationAndDTOComponentsPage.countDeleteButtons();
        await entityWithServiceClassPaginationAndDTOComponentsPage.clickOnLastDeleteButton();

        entityWithServiceClassPaginationAndDTODeleteDialog = new EntityWithServiceClassPaginationAndDTODeleteDialog();
        expect(await entityWithServiceClassPaginationAndDTODeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Service Class Pagination And DTO?'
        );
        await entityWithServiceClassPaginationAndDTODeleteDialog.clickOnConfirmButton();

        expect(await entityWithServiceClassPaginationAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
