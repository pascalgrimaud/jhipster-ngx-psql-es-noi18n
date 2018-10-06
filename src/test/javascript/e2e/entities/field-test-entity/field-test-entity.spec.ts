/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FieldTestEntityComponentsPage, FieldTestEntityDeleteDialog, FieldTestEntityUpdatePage } from './field-test-entity.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FieldTestEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldTestEntityUpdatePage: FieldTestEntityUpdatePage;
    let fieldTestEntityComponentsPage: FieldTestEntityComponentsPage;
    let fieldTestEntityDeleteDialog: FieldTestEntityDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldTestEntities', async () => {
        await navBarPage.goToEntity('field-test-entity');
        fieldTestEntityComponentsPage = new FieldTestEntityComponentsPage();
        expect(await fieldTestEntityComponentsPage.getTitle()).to.eq('Field Test Entities');
    });

    it('should load create FieldTestEntity page', async () => {
        await fieldTestEntityComponentsPage.clickOnCreateButton();
        fieldTestEntityUpdatePage = new FieldTestEntityUpdatePage();
        expect(await fieldTestEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Field Test Entity');
        await fieldTestEntityUpdatePage.cancel();
    });

    it('should create and save FieldTestEntities', async () => {
        const nbButtonsBeforeCreate = await fieldTestEntityComponentsPage.countDeleteButtons();

        await fieldTestEntityComponentsPage.clickOnCreateButton();
        await fieldTestEntityUpdatePage.setStringTomInput('stringTom');
        expect(await fieldTestEntityUpdatePage.getStringTomInput()).to.eq('stringTom');
        await fieldTestEntityUpdatePage.setStringRequiredTomInput('stringRequiredTom');
        expect(await fieldTestEntityUpdatePage.getStringRequiredTomInput()).to.eq('stringRequiredTom');
        await fieldTestEntityUpdatePage.setStringMinlengthTomInput('stringMinlengthTom');
        expect(await fieldTestEntityUpdatePage.getStringMinlengthTomInput()).to.eq('stringMinlengthTom');
        await fieldTestEntityUpdatePage.setStringMaxlengthTomInput('stringMaxlengthTom');
        expect(await fieldTestEntityUpdatePage.getStringMaxlengthTomInput()).to.eq('stringMaxlengthTom');
        await fieldTestEntityUpdatePage.setStringPatternTomInput('stringPatternTom');
        expect(await fieldTestEntityUpdatePage.getStringPatternTomInput()).to.eq('stringPatternTom');
        await fieldTestEntityUpdatePage.setIntegerTomInput('5');
        expect(await fieldTestEntityUpdatePage.getIntegerTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setIntegerRequiredTomInput('5');
        expect(await fieldTestEntityUpdatePage.getIntegerRequiredTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setIntegerMinTomInput('5');
        expect(await fieldTestEntityUpdatePage.getIntegerMinTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setIntegerMaxTomInput('5');
        expect(await fieldTestEntityUpdatePage.getIntegerMaxTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setLongTomInput('5');
        expect(await fieldTestEntityUpdatePage.getLongTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setLongRequiredTomInput('5');
        expect(await fieldTestEntityUpdatePage.getLongRequiredTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setLongMinTomInput('5');
        expect(await fieldTestEntityUpdatePage.getLongMinTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setLongMaxTomInput('5');
        expect(await fieldTestEntityUpdatePage.getLongMaxTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setFloatTomInput('5');
        expect(await fieldTestEntityUpdatePage.getFloatTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setFloatRequiredTomInput('5');
        expect(await fieldTestEntityUpdatePage.getFloatRequiredTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setFloatMinTomInput('5');
        expect(await fieldTestEntityUpdatePage.getFloatMinTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setFloatMaxTomInput('5');
        expect(await fieldTestEntityUpdatePage.getFloatMaxTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setDoubleRequiredTomInput('5');
        expect(await fieldTestEntityUpdatePage.getDoubleRequiredTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setDoubleMinTomInput('5');
        expect(await fieldTestEntityUpdatePage.getDoubleMinTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setDoubleMaxTomInput('5');
        expect(await fieldTestEntityUpdatePage.getDoubleMaxTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setBigDecimalRequiredTomInput('5');
        expect(await fieldTestEntityUpdatePage.getBigDecimalRequiredTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setBigDecimalMinTomInput('5');
        expect(await fieldTestEntityUpdatePage.getBigDecimalMinTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setBigDecimalMaxTomInput('5');
        expect(await fieldTestEntityUpdatePage.getBigDecimalMaxTomInput()).to.eq('5');
        await fieldTestEntityUpdatePage.setLocalDateTomInput('2000-12-31');
        expect(await fieldTestEntityUpdatePage.getLocalDateTomInput()).to.eq('2000-12-31');
        await fieldTestEntityUpdatePage.setLocalDateRequiredTomInput('2000-12-31');
        expect(await fieldTestEntityUpdatePage.getLocalDateRequiredTomInput()).to.eq('2000-12-31');
        await fieldTestEntityUpdatePage.setInstantTomInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestEntityUpdatePage.getInstantTomInput()).to.contain('2001-01-01T02:30');
        await fieldTestEntityUpdatePage.setInstantRequiredTomInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestEntityUpdatePage.getInstantRequiredTomInput()).to.contain('2001-01-01T02:30');
        await fieldTestEntityUpdatePage.setZonedDateTimeTomInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestEntityUpdatePage.getZonedDateTimeTomInput()).to.contain('2001-01-01T02:30');
        await fieldTestEntityUpdatePage.setZonedDateTimeRequiredTomInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestEntityUpdatePage.getZonedDateTimeRequiredTomInput()).to.contain('2001-01-01T02:30');
        const selectedBooleanTom = fieldTestEntityUpdatePage.getBooleanTomInput();
        if (await selectedBooleanTom.isSelected()) {
            await fieldTestEntityUpdatePage.getBooleanTomInput().click();
            expect(await fieldTestEntityUpdatePage.getBooleanTomInput().isSelected()).to.be.false;
        } else {
            await fieldTestEntityUpdatePage.getBooleanTomInput().click();
            expect(await fieldTestEntityUpdatePage.getBooleanTomInput().isSelected()).to.be.true;
        }
        const selectedBooleanRequiredTom = fieldTestEntityUpdatePage.getBooleanRequiredTomInput();
        if (await selectedBooleanRequiredTom.isSelected()) {
            await fieldTestEntityUpdatePage.getBooleanRequiredTomInput().click();
            expect(await fieldTestEntityUpdatePage.getBooleanRequiredTomInput().isSelected()).to.be.false;
        } else {
            await fieldTestEntityUpdatePage.getBooleanRequiredTomInput().click();
            expect(await fieldTestEntityUpdatePage.getBooleanRequiredTomInput().isSelected()).to.be.true;
        }
        await fieldTestEntityUpdatePage.enumTomSelectLastOption();
        await fieldTestEntityUpdatePage.enumRequiredTomSelectLastOption();
        await fieldTestEntityUpdatePage.setByteImageTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteImageRequiredTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteImageMinbytesTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteImageMaxbytesTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteAnyTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteAnyRequiredTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteAnyMinbytesTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteAnyMaxbytesTomInput(absolutePath);
        await fieldTestEntityUpdatePage.setByteTextTomInput('byteTextTom');
        expect(await fieldTestEntityUpdatePage.getByteTextTomInput()).to.eq('byteTextTom');
        await fieldTestEntityUpdatePage.setByteTextRequiredTomInput('byteTextRequiredTom');
        expect(await fieldTestEntityUpdatePage.getByteTextRequiredTomInput()).to.eq('byteTextRequiredTom');
        await fieldTestEntityUpdatePage.setByteTextMinbytesTomInput('byteTextMinbytesTom');
        expect(await fieldTestEntityUpdatePage.getByteTextMinbytesTomInput()).to.eq('byteTextMinbytesTom');
        await fieldTestEntityUpdatePage.setByteTextMaxbytesTomInput('byteTextMaxbytesTom');
        expect(await fieldTestEntityUpdatePage.getByteTextMaxbytesTomInput()).to.eq('byteTextMaxbytesTom');
        await fieldTestEntityUpdatePage.save();
        expect(await fieldTestEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldTestEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldTestEntity', async () => {
        const nbButtonsBeforeDelete = await fieldTestEntityComponentsPage.countDeleteButtons();
        await fieldTestEntityComponentsPage.clickOnLastDeleteButton();

        fieldTestEntityDeleteDialog = new FieldTestEntityDeleteDialog();
        expect(await fieldTestEntityDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Field Test Entity?');
        await fieldTestEntityDeleteDialog.clickOnConfirmButton();

        expect(await fieldTestEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
