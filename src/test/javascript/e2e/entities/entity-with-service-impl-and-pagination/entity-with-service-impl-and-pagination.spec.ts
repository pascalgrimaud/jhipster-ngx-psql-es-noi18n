/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithServiceImplAndPaginationComponentsPage,
    EntityWithServiceImplAndPaginationDeleteDialog,
    EntityWithServiceImplAndPaginationUpdatePage
} from './entity-with-service-impl-and-pagination.page-object';

const expect = chai.expect;

describe('EntityWithServiceImplAndPagination e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithServiceImplAndPaginationUpdatePage: EntityWithServiceImplAndPaginationUpdatePage;
    let entityWithServiceImplAndPaginationComponentsPage: EntityWithServiceImplAndPaginationComponentsPage;
    let entityWithServiceImplAndPaginationDeleteDialog: EntityWithServiceImplAndPaginationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithServiceImplAndPaginations', async () => {
        await navBarPage.goToEntity('entity-with-service-impl-and-pagination');
        entityWithServiceImplAndPaginationComponentsPage = new EntityWithServiceImplAndPaginationComponentsPage();
        expect(await entityWithServiceImplAndPaginationComponentsPage.getTitle()).to.eq('Entity With Service Impl And Paginations');
    });

    it('should load create EntityWithServiceImplAndPagination page', async () => {
        await entityWithServiceImplAndPaginationComponentsPage.clickOnCreateButton();
        entityWithServiceImplAndPaginationUpdatePage = new EntityWithServiceImplAndPaginationUpdatePage();
        expect(await entityWithServiceImplAndPaginationUpdatePage.getPageTitle()).to.eq(
            'Create or edit a Entity With Service Impl And Pagination'
        );
        await entityWithServiceImplAndPaginationUpdatePage.cancel();
    });

    it('should create and save EntityWithServiceImplAndPaginations', async () => {
        const nbButtonsBeforeCreate = await entityWithServiceImplAndPaginationComponentsPage.countDeleteButtons();

        await entityWithServiceImplAndPaginationComponentsPage.clickOnCreateButton();
        await entityWithServiceImplAndPaginationUpdatePage.setHugoInput('hugo');
        expect(await entityWithServiceImplAndPaginationUpdatePage.getHugoInput()).to.eq('hugo');
        await entityWithServiceImplAndPaginationUpdatePage.save();
        expect(await entityWithServiceImplAndPaginationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithServiceImplAndPaginationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithServiceImplAndPagination', async () => {
        const nbButtonsBeforeDelete = await entityWithServiceImplAndPaginationComponentsPage.countDeleteButtons();
        await entityWithServiceImplAndPaginationComponentsPage.clickOnLastDeleteButton();

        entityWithServiceImplAndPaginationDeleteDialog = new EntityWithServiceImplAndPaginationDeleteDialog();
        expect(await entityWithServiceImplAndPaginationDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Service Impl And Pagination?'
        );
        await entityWithServiceImplAndPaginationDeleteDialog.clickOnConfirmButton();

        expect(await entityWithServiceImplAndPaginationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
