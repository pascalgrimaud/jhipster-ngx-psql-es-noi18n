/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PlaceComponentsPage, PlaceDeleteDialog, PlaceUpdatePage } from './place.page-object';

const expect = chai.expect;

describe('Place e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let placeUpdatePage: PlaceUpdatePage;
    let placeComponentsPage: PlaceComponentsPage;
    let placeDeleteDialog: PlaceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Places', async () => {
        await navBarPage.goToEntity('place');
        placeComponentsPage = new PlaceComponentsPage();
        expect(await placeComponentsPage.getTitle()).to.eq('Places');
    });

    it('should load create Place page', async () => {
        await placeComponentsPage.clickOnCreateButton();
        placeUpdatePage = new PlaceUpdatePage();
        expect(await placeUpdatePage.getPageTitle()).to.eq('Create or edit a Place');
        await placeUpdatePage.cancel();
    });

    it('should create and save Places', async () => {
        const nbButtonsBeforeCreate = await placeComponentsPage.countDeleteButtons();

        await placeComponentsPage.clickOnCreateButton();
        await placeUpdatePage.setNameInput('name');
        expect(await placeUpdatePage.getNameInput()).to.eq('name');
        await placeUpdatePage.setNumberOfSeatsInput('5');
        expect(await placeUpdatePage.getNumberOfSeatsInput()).to.eq('5');
        await placeUpdatePage.setShortNameInput('shortName');
        expect(await placeUpdatePage.getShortNameInput()).to.eq('shortName');
        await placeUpdatePage.setColorBackgroundInput('colorBackground');
        expect(await placeUpdatePage.getColorBackgroundInput()).to.eq('colorBackground');
        await placeUpdatePage.setColorTextInput('colorText');
        expect(await placeUpdatePage.getColorTextInput()).to.eq('colorText');
        await placeUpdatePage.setDescriptionInput('description');
        expect(await placeUpdatePage.getDescriptionInput()).to.eq('description');
        // placeUpdatePage.preferredDivisionSelectLastOption();
        await placeUpdatePage.ownerSelectLastOption();
        await placeUpdatePage.save();
        expect(await placeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await placeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Place', async () => {
        const nbButtonsBeforeDelete = await placeComponentsPage.countDeleteButtons();
        await placeComponentsPage.clickOnLastDeleteButton();

        placeDeleteDialog = new PlaceDeleteDialog();
        expect(await placeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Place?');
        await placeDeleteDialog.clickOnConfirmButton();

        expect(await placeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
