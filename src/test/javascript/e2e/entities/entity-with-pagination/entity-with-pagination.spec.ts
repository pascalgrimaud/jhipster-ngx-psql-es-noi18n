/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EntityWithPaginationComponentsPage,
    EntityWithPaginationDeleteDialog,
    EntityWithPaginationUpdatePage
} from './entity-with-pagination.page-object';

const expect = chai.expect;

describe('EntityWithPagination e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let entityWithPaginationUpdatePage: EntityWithPaginationUpdatePage;
    let entityWithPaginationComponentsPage: EntityWithPaginationComponentsPage;
    let entityWithPaginationDeleteDialog: EntityWithPaginationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EntityWithPaginations', async () => {
        await navBarPage.goToEntity('entity-with-pagination');
        entityWithPaginationComponentsPage = new EntityWithPaginationComponentsPage();
        expect(await entityWithPaginationComponentsPage.getTitle()).to.eq('Entity With Paginations');
    });

    it('should load create EntityWithPagination page', async () => {
        await entityWithPaginationComponentsPage.clickOnCreateButton();
        entityWithPaginationUpdatePage = new EntityWithPaginationUpdatePage();
        expect(await entityWithPaginationUpdatePage.getPageTitle()).to.eq('Create or edit a Entity With Pagination');
        await entityWithPaginationUpdatePage.cancel();
    });

    it('should create and save EntityWithPaginations', async () => {
        const nbButtonsBeforeCreate = await entityWithPaginationComponentsPage.countDeleteButtons();

        await entityWithPaginationComponentsPage.clickOnCreateButton();
        await entityWithPaginationUpdatePage.setNathanInput('nathan');
        expect(await entityWithPaginationUpdatePage.getNathanInput()).to.eq('nathan');
        await entityWithPaginationUpdatePage.save();
        expect(await entityWithPaginationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await entityWithPaginationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EntityWithPagination', async () => {
        const nbButtonsBeforeDelete = await entityWithPaginationComponentsPage.countDeleteButtons();
        await entityWithPaginationComponentsPage.clickOnLastDeleteButton();

        entityWithPaginationDeleteDialog = new EntityWithPaginationDeleteDialog();
        expect(await entityWithPaginationDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Entity With Pagination?'
        );
        await entityWithPaginationDeleteDialog.clickOnConfirmButton();

        expect(await entityWithPaginationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
