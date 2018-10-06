/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    FieldTestMapstructEntityComponentsPage,
    FieldTestMapstructEntityDeleteDialog,
    FieldTestMapstructEntityUpdatePage
} from './field-test-mapstruct-entity.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FieldTestMapstructEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldTestMapstructEntityUpdatePage: FieldTestMapstructEntityUpdatePage;
    let fieldTestMapstructEntityComponentsPage: FieldTestMapstructEntityComponentsPage;
    let fieldTestMapstructEntityDeleteDialog: FieldTestMapstructEntityDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldTestMapstructEntities', async () => {
        await navBarPage.goToEntity('field-test-mapstruct-entity');
        fieldTestMapstructEntityComponentsPage = new FieldTestMapstructEntityComponentsPage();
        expect(await fieldTestMapstructEntityComponentsPage.getTitle()).to.eq('Field Test Mapstruct Entities');
    });

    it('should load create FieldTestMapstructEntity page', async () => {
        await fieldTestMapstructEntityComponentsPage.clickOnCreateButton();
        fieldTestMapstructEntityUpdatePage = new FieldTestMapstructEntityUpdatePage();
        expect(await fieldTestMapstructEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Field Test Mapstruct Entity');
        await fieldTestMapstructEntityUpdatePage.cancel();
    });

    it('should create and save FieldTestMapstructEntities', async () => {
        const nbButtonsBeforeCreate = await fieldTestMapstructEntityComponentsPage.countDeleteButtons();

        await fieldTestMapstructEntityComponentsPage.clickOnCreateButton();
        await fieldTestMapstructEntityUpdatePage.setStringEvaInput('stringEva');
        expect(await fieldTestMapstructEntityUpdatePage.getStringEvaInput()).to.eq('stringEva');
        await fieldTestMapstructEntityUpdatePage.setStringRequiredEvaInput('stringRequiredEva');
        expect(await fieldTestMapstructEntityUpdatePage.getStringRequiredEvaInput()).to.eq('stringRequiredEva');
        await fieldTestMapstructEntityUpdatePage.setStringMinlengthEvaInput('stringMinlengthEva');
        expect(await fieldTestMapstructEntityUpdatePage.getStringMinlengthEvaInput()).to.eq('stringMinlengthEva');
        await fieldTestMapstructEntityUpdatePage.setStringMaxlengthEvaInput('stringMaxlengthEva');
        expect(await fieldTestMapstructEntityUpdatePage.getStringMaxlengthEvaInput()).to.eq('stringMaxlengthEva');
        await fieldTestMapstructEntityUpdatePage.setStringPatternEvaInput('stringPatternEva');
        expect(await fieldTestMapstructEntityUpdatePage.getStringPatternEvaInput()).to.eq('stringPatternEva');
        await fieldTestMapstructEntityUpdatePage.setIntegerEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getIntegerEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setIntegerRequiredEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getIntegerRequiredEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setIntegerMinEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getIntegerMinEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setIntegerMaxEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getIntegerMaxEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setLongEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getLongEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setLongRequiredEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getLongRequiredEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setLongMinEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getLongMinEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setLongMaxEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getLongMaxEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setFloatEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getFloatEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setFloatRequiredEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getFloatRequiredEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setFloatMinEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getFloatMinEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setFloatMaxEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getFloatMaxEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setDoubleRequiredEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getDoubleRequiredEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setDoubleMinEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getDoubleMinEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setDoubleMaxEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getDoubleMaxEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setBigDecimalRequiredEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getBigDecimalRequiredEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setBigDecimalMinEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getBigDecimalMinEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setBigDecimalMaxEvaInput('5');
        expect(await fieldTestMapstructEntityUpdatePage.getBigDecimalMaxEvaInput()).to.eq('5');
        await fieldTestMapstructEntityUpdatePage.setLocalDateEvaInput('2000-12-31');
        expect(await fieldTestMapstructEntityUpdatePage.getLocalDateEvaInput()).to.eq('2000-12-31');
        await fieldTestMapstructEntityUpdatePage.setLocalDateRequiredEvaInput('2000-12-31');
        expect(await fieldTestMapstructEntityUpdatePage.getLocalDateRequiredEvaInput()).to.eq('2000-12-31');
        await fieldTestMapstructEntityUpdatePage.setInstantEvaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestMapstructEntityUpdatePage.getInstantEvaInput()).to.contain('2001-01-01T02:30');
        await fieldTestMapstructEntityUpdatePage.setInstanteRequiredEvaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestMapstructEntityUpdatePage.getInstanteRequiredEvaInput()).to.contain('2001-01-01T02:30');
        await fieldTestMapstructEntityUpdatePage.setZonedDateTimeEvaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestMapstructEntityUpdatePage.getZonedDateTimeEvaInput()).to.contain('2001-01-01T02:30');
        await fieldTestMapstructEntityUpdatePage.setZonedDateTimeRequiredEvaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestMapstructEntityUpdatePage.getZonedDateTimeRequiredEvaInput()).to.contain('2001-01-01T02:30');
        const selectedBooleanEva = fieldTestMapstructEntityUpdatePage.getBooleanEvaInput();
        if (await selectedBooleanEva.isSelected()) {
            await fieldTestMapstructEntityUpdatePage.getBooleanEvaInput().click();
            expect(await fieldTestMapstructEntityUpdatePage.getBooleanEvaInput().isSelected()).to.be.false;
        } else {
            await fieldTestMapstructEntityUpdatePage.getBooleanEvaInput().click();
            expect(await fieldTestMapstructEntityUpdatePage.getBooleanEvaInput().isSelected()).to.be.true;
        }
        const selectedBooleanRequiredEva = fieldTestMapstructEntityUpdatePage.getBooleanRequiredEvaInput();
        if (await selectedBooleanRequiredEva.isSelected()) {
            await fieldTestMapstructEntityUpdatePage.getBooleanRequiredEvaInput().click();
            expect(await fieldTestMapstructEntityUpdatePage.getBooleanRequiredEvaInput().isSelected()).to.be.false;
        } else {
            await fieldTestMapstructEntityUpdatePage.getBooleanRequiredEvaInput().click();
            expect(await fieldTestMapstructEntityUpdatePage.getBooleanRequiredEvaInput().isSelected()).to.be.true;
        }
        await fieldTestMapstructEntityUpdatePage.enumEvaSelectLastOption();
        await fieldTestMapstructEntityUpdatePage.enumRequiredEvaSelectLastOption();
        await fieldTestMapstructEntityUpdatePage.setByteImageEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteImageRequiredEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteImageMinbytesEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteImageMaxbytesEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteAnyEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteAnyRequiredEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteAnyMinbytesEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteAnyMaxbytesEvaInput(absolutePath);
        await fieldTestMapstructEntityUpdatePage.setByteTextEvaInput('byteTextEva');
        expect(await fieldTestMapstructEntityUpdatePage.getByteTextEvaInput()).to.eq('byteTextEva');
        await fieldTestMapstructEntityUpdatePage.setByteTextRequiredEvaInput('byteTextRequiredEva');
        expect(await fieldTestMapstructEntityUpdatePage.getByteTextRequiredEvaInput()).to.eq('byteTextRequiredEva');
        await fieldTestMapstructEntityUpdatePage.setByteTextMinbytesEvaInput('byteTextMinbytesEva');
        expect(await fieldTestMapstructEntityUpdatePage.getByteTextMinbytesEvaInput()).to.eq('byteTextMinbytesEva');
        await fieldTestMapstructEntityUpdatePage.setByteTextMaxbytesEvaInput('byteTextMaxbytesEva');
        expect(await fieldTestMapstructEntityUpdatePage.getByteTextMaxbytesEvaInput()).to.eq('byteTextMaxbytesEva');
        await fieldTestMapstructEntityUpdatePage.save();
        expect(await fieldTestMapstructEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldTestMapstructEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldTestMapstructEntity', async () => {
        const nbButtonsBeforeDelete = await fieldTestMapstructEntityComponentsPage.countDeleteButtons();
        await fieldTestMapstructEntityComponentsPage.clickOnLastDeleteButton();

        fieldTestMapstructEntityDeleteDialog = new FieldTestMapstructEntityDeleteDialog();
        expect(await fieldTestMapstructEntityDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Field Test Mapstruct Entity?'
        );
        await fieldTestMapstructEntityDeleteDialog.clickOnConfirmButton();

        expect(await fieldTestMapstructEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
