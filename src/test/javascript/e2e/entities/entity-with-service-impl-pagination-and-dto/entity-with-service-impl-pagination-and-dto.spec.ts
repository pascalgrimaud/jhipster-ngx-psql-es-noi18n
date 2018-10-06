/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithServiceImplPaginationAndDTOComponentsPage,
    EntityWithServiceImplPaginationAndDTODeleteDialog,
    EntityWithServiceImplPaginationAndDTOUpdatePage
} from './entity-with-service-impl-pagination-and-dto.page-object';

const expect = chai.expect;

describe('EntityWithServiceImplPaginationAndDTO e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithServiceImplPaginationAndDTOUpdatePage: EntityWithServiceImplPaginationAndDTOUpdatePage;
    let entityWithServiceImplPaginationAndDTOComponentsPage: EntityWithServiceImplPaginationAndDTOComponentsPage;
    let entityWithServiceImplPaginationAndDTODeleteDialog: EntityWithServiceImplPaginationAndDTODeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithServiceImplPaginationAndDTOS', async () => {
        await navBarPage.goToEntity('entity-with-service-impl-pagination-and-dto');
        entityWithServiceImplPaginationAndDTOComponentsPage = new EntityWithServiceImplPaginationAndDTOComponentsPage();
        expect(await entityWithServiceImplPaginationAndDTOComponentsPage.getTitle()).to.eq('Entity With Service Impl Pagination And DTOS');
    });

    it('should load create EntityWithServiceImplPaginationAndDTO page', async () => {
        await entityWithServiceImplPaginationAndDTOComponentsPage.clickOnCreateButton();
        entityWithServiceImplPaginationAndDTOUpdatePage = new EntityWithServiceImplPaginationAndDTOUpdatePage();
        expect(await entityWithServiceImplPaginationAndDTOUpdatePage.getPageTitle()).to.eq(
            'Create or edit a Entity With Service Impl Pagination And DTO'
        );
        await entityWithServiceImplPaginationAndDTOUpdatePage.cancel();
    });

    it('should create and save EntityWithServiceImplPaginationAndDTOS', async () => {
        const nbButtonsBeforeCreate = await entityWithServiceImplPaginationAndDTOComponentsPage.countDeleteButtons();

        await entityWithServiceImplPaginationAndDTOComponentsPage.clickOnCreateButton();
        await entityWithServiceImplPaginationAndDTOUpdatePage.setTheoInput('theo');
        expect(await entityWithServiceImplPaginationAndDTOUpdatePage.getTheoInput()).to.eq('theo');
        await entityWithServiceImplPaginationAndDTOUpdatePage.save();
        expect(await entityWithServiceImplPaginationAndDTOUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithServiceImplPaginationAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithServiceImplPaginationAndDTO', async () => {
        const nbButtonsBeforeDelete = await entityWithServiceImplPaginationAndDTOComponentsPage.countDeleteButtons();
        await entityWithServiceImplPaginationAndDTOComponentsPage.clickOnLastDeleteButton();

        entityWithServiceImplPaginationAndDTODeleteDialog = new EntityWithServiceImplPaginationAndDTODeleteDialog();
        expect(await entityWithServiceImplPaginationAndDTODeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Service Impl Pagination And DTO?'
        );
        await entityWithServiceImplPaginationAndDTODeleteDialog.clickOnConfirmButton();

        expect(await entityWithServiceImplPaginationAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
