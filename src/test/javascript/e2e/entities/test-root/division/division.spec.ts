/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DivisionComponentsPage, DivisionDeleteDialog, DivisionUpdatePage } from './division.page-object';

const expect = chai.expect;

describe('Division e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let divisionUpdatePage: DivisionUpdatePage;
    let divisionComponentsPage: DivisionComponentsPage;
    let divisionDeleteDialog: DivisionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Divisions', async () => {
        await navBarPage.goToEntity('division');
        divisionComponentsPage = new DivisionComponentsPage();
        expect(await divisionComponentsPage.getTitle()).to.eq('Divisions');
    });

    it('should load create Division page', async () => {
        await divisionComponentsPage.clickOnCreateButton();
        divisionUpdatePage = new DivisionUpdatePage();
        expect(await divisionUpdatePage.getPageTitle()).to.eq('Create or edit a Division');
        await divisionUpdatePage.cancel();
    });

    it('should create and save Divisions', async () => {
        const nbButtonsBeforeCreate = await divisionComponentsPage.countDeleteButtons();

        await divisionComponentsPage.clickOnCreateButton();
        await divisionUpdatePage.setNameInput('name');
        expect(await divisionUpdatePage.getNameInput()).to.eq('name');
        await divisionUpdatePage.setShortNameInput('shortName');
        expect(await divisionUpdatePage.getShortNameInput()).to.eq('shortName');
        await divisionUpdatePage.setNumberOfPeopleInput('5');
        expect(await divisionUpdatePage.getNumberOfPeopleInput()).to.eq('5');
        await divisionUpdatePage.divisionTypeSelectLastOption();
        await divisionUpdatePage.setColorBackgroundInput('colorBackground');
        expect(await divisionUpdatePage.getColorBackgroundInput()).to.eq('colorBackground');
        await divisionUpdatePage.setColorTextInput('colorText');
        expect(await divisionUpdatePage.getColorTextInput()).to.eq('colorText');
        await divisionUpdatePage.save();
        expect(await divisionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await divisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Division', async () => {
        const nbButtonsBeforeDelete = await divisionComponentsPage.countDeleteButtons();
        await divisionComponentsPage.clickOnLastDeleteButton();

        divisionDeleteDialog = new DivisionDeleteDialog();
        expect(await divisionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Division?');
        await divisionDeleteDialog.clickOnConfirmButton();

        expect(await divisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
