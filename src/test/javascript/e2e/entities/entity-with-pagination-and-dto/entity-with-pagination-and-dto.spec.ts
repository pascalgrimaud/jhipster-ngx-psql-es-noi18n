/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithPaginationAndDTOComponentsPage,
    EntityWithPaginationAndDTODeleteDialog,
    EntityWithPaginationAndDTOUpdatePage
} from './entity-with-pagination-and-dto.page-object';

const expect = chai.expect;

describe('EntityWithPaginationAndDTO e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithPaginationAndDTOUpdatePage: EntityWithPaginationAndDTOUpdatePage;
    let entityWithPaginationAndDTOComponentsPage: EntityWithPaginationAndDTOComponentsPage;
    let entityWithPaginationAndDTODeleteDialog: EntityWithPaginationAndDTODeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithPaginationAndDTOS', async () => {
        await navBarPage.goToEntity('entity-with-pagination-and-dto');
        entityWithPaginationAndDTOComponentsPage = new EntityWithPaginationAndDTOComponentsPage();
        expect(await entityWithPaginationAndDTOComponentsPage.getTitle()).to.eq('Entity With Pagination And DTOS');
    });

    it('should load create EntityWithPaginationAndDTO page', async () => {
        await entityWithPaginationAndDTOComponentsPage.clickOnCreateButton();
        entityWithPaginationAndDTOUpdatePage = new EntityWithPaginationAndDTOUpdatePage();
        expect(await entityWithPaginationAndDTOUpdatePage.getPageTitle()).to.eq('Create or edit a Entity With Pagination And DTO');
        await entityWithPaginationAndDTOUpdatePage.cancel();
    });

    it('should create and save EntityWithPaginationAndDTOS', async () => {
        const nbButtonsBeforeCreate = await entityWithPaginationAndDTOComponentsPage.countDeleteButtons();

        await entityWithPaginationAndDTOComponentsPage.clickOnCreateButton();
        await entityWithPaginationAndDTOUpdatePage.setLeaInput('lea');
        expect(await entityWithPaginationAndDTOUpdatePage.getLeaInput()).to.eq('lea');
        await entityWithPaginationAndDTOUpdatePage.save();
        expect(await entityWithPaginationAndDTOUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithPaginationAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithPaginationAndDTO', async () => {
        const nbButtonsBeforeDelete = await entityWithPaginationAndDTOComponentsPage.countDeleteButtons();
        await entityWithPaginationAndDTOComponentsPage.clickOnLastDeleteButton();

        entityWithPaginationAndDTODeleteDialog = new EntityWithPaginationAndDTODeleteDialog();
        expect(await entityWithPaginationAndDTODeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Pagination And DTO?'
        );
        await entityWithPaginationAndDTODeleteDialog.clickOnConfirmButton();

        expect(await entityWithPaginationAndDTOComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
