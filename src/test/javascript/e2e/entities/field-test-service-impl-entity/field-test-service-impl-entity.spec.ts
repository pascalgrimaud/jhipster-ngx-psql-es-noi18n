/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    FieldTestServiceImplEntityComponentsPage,
    FieldTestServiceImplEntityDeleteDialog,
    FieldTestServiceImplEntityUpdatePage
} from './field-test-service-impl-entity.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FieldTestServiceImplEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldTestServiceImplEntityUpdatePage: FieldTestServiceImplEntityUpdatePage;
    let fieldTestServiceImplEntityComponentsPage: FieldTestServiceImplEntityComponentsPage;
    let fieldTestServiceImplEntityDeleteDialog: FieldTestServiceImplEntityDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldTestServiceImplEntities', async () => {
        await navBarPage.goToEntity('field-test-service-impl-entity');
        fieldTestServiceImplEntityComponentsPage = new FieldTestServiceImplEntityComponentsPage();
        expect(await fieldTestServiceImplEntityComponentsPage.getTitle()).to.eq('Field Test Service Impl Entities');
    });

    it('should load create FieldTestServiceImplEntity page', async () => {
        await fieldTestServiceImplEntityComponentsPage.clickOnCreateButton();
        fieldTestServiceImplEntityUpdatePage = new FieldTestServiceImplEntityUpdatePage();
        expect(await fieldTestServiceImplEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Field Test Service Impl Entity');
        await fieldTestServiceImplEntityUpdatePage.cancel();
    });

    it('should create and save FieldTestServiceImplEntities', async () => {
        const nbButtonsBeforeCreate = await fieldTestServiceImplEntityComponentsPage.countDeleteButtons();

        await fieldTestServiceImplEntityComponentsPage.clickOnCreateButton();
        await fieldTestServiceImplEntityUpdatePage.setStringMikaInput('stringMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getStringMikaInput()).to.eq('stringMika');
        await fieldTestServiceImplEntityUpdatePage.setStringRequiredMikaInput('stringRequiredMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getStringRequiredMikaInput()).to.eq('stringRequiredMika');
        await fieldTestServiceImplEntityUpdatePage.setStringMinlengthMikaInput('stringMinlengthMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getStringMinlengthMikaInput()).to.eq('stringMinlengthMika');
        await fieldTestServiceImplEntityUpdatePage.setStringMaxlengthMikaInput('stringMaxlengthMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getStringMaxlengthMikaInput()).to.eq('stringMaxlengthMika');
        await fieldTestServiceImplEntityUpdatePage.setStringPatternMikaInput('stringPatternMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getStringPatternMikaInput()).to.eq('stringPatternMika');
        await fieldTestServiceImplEntityUpdatePage.setIntegerMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getIntegerMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setIntegerRequiredMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getIntegerRequiredMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setIntegerMinMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getIntegerMinMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setIntegerMaxMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getIntegerMaxMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setLongMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getLongMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setLongRequiredMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getLongRequiredMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setLongMinMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getLongMinMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setLongMaxMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getLongMaxMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setFloatMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getFloatMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setFloatRequiredMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getFloatRequiredMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setFloatMinMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getFloatMinMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setFloatMaxMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getFloatMaxMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setDoubleRequiredMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getDoubleRequiredMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setDoubleMinMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getDoubleMinMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setDoubleMaxMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getDoubleMaxMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setBigDecimalRequiredMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getBigDecimalRequiredMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setBigDecimalMinMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getBigDecimalMinMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setBigDecimalMaxMikaInput('5');
        expect(await fieldTestServiceImplEntityUpdatePage.getBigDecimalMaxMikaInput()).to.eq('5');
        await fieldTestServiceImplEntityUpdatePage.setLocalDateMikaInput('2000-12-31');
        expect(await fieldTestServiceImplEntityUpdatePage.getLocalDateMikaInput()).to.eq('2000-12-31');
        await fieldTestServiceImplEntityUpdatePage.setLocalDateRequiredMikaInput('2000-12-31');
        expect(await fieldTestServiceImplEntityUpdatePage.getLocalDateRequiredMikaInput()).to.eq('2000-12-31');
        await fieldTestServiceImplEntityUpdatePage.setInstantMikaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceImplEntityUpdatePage.getInstantMikaInput()).to.contain('2001-01-01T02:30');
        await fieldTestServiceImplEntityUpdatePage.setInstanteRequiredMikaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceImplEntityUpdatePage.getInstanteRequiredMikaInput()).to.contain('2001-01-01T02:30');
        await fieldTestServiceImplEntityUpdatePage.setZonedDateTimeMikaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceImplEntityUpdatePage.getZonedDateTimeMikaInput()).to.contain('2001-01-01T02:30');
        await fieldTestServiceImplEntityUpdatePage.setZonedDateTimeRequiredMikaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceImplEntityUpdatePage.getZonedDateTimeRequiredMikaInput()).to.contain('2001-01-01T02:30');
        const selectedBooleanMika = fieldTestServiceImplEntityUpdatePage.getBooleanMikaInput();
        if (await selectedBooleanMika.isSelected()) {
            await fieldTestServiceImplEntityUpdatePage.getBooleanMikaInput().click();
            expect(await fieldTestServiceImplEntityUpdatePage.getBooleanMikaInput().isSelected()).to.be.false;
        } else {
            await fieldTestServiceImplEntityUpdatePage.getBooleanMikaInput().click();
            expect(await fieldTestServiceImplEntityUpdatePage.getBooleanMikaInput().isSelected()).to.be.true;
        }
        const selectedBooleanRequiredMika = fieldTestServiceImplEntityUpdatePage.getBooleanRequiredMikaInput();
        if (await selectedBooleanRequiredMika.isSelected()) {
            await fieldTestServiceImplEntityUpdatePage.getBooleanRequiredMikaInput().click();
            expect(await fieldTestServiceImplEntityUpdatePage.getBooleanRequiredMikaInput().isSelected()).to.be.false;
        } else {
            await fieldTestServiceImplEntityUpdatePage.getBooleanRequiredMikaInput().click();
            expect(await fieldTestServiceImplEntityUpdatePage.getBooleanRequiredMikaInput().isSelected()).to.be.true;
        }
        await fieldTestServiceImplEntityUpdatePage.enumMikaSelectLastOption();
        await fieldTestServiceImplEntityUpdatePage.enumRequiredMikaSelectLastOption();
        await fieldTestServiceImplEntityUpdatePage.setByteImageMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteImageRequiredMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteImageMinbytesMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteImageMaxbytesMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteAnyMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteAnyRequiredMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteAnyMinbytesMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteAnyMaxbytesMikaInput(absolutePath);
        await fieldTestServiceImplEntityUpdatePage.setByteTextMikaInput('byteTextMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getByteTextMikaInput()).to.eq('byteTextMika');
        await fieldTestServiceImplEntityUpdatePage.setByteTextRequiredMikaInput('byteTextRequiredMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getByteTextRequiredMikaInput()).to.eq('byteTextRequiredMika');
        await fieldTestServiceImplEntityUpdatePage.setByteTextMinbytesMikaInput('byteTextMinbytesMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getByteTextMinbytesMikaInput()).to.eq('byteTextMinbytesMika');
        await fieldTestServiceImplEntityUpdatePage.setByteTextMaxbytesMikaInput('byteTextMaxbytesMika');
        expect(await fieldTestServiceImplEntityUpdatePage.getByteTextMaxbytesMikaInput()).to.eq('byteTextMaxbytesMika');
        await fieldTestServiceImplEntityUpdatePage.save();
        expect(await fieldTestServiceImplEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldTestServiceImplEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldTestServiceImplEntity', async () => {
        const nbButtonsBeforeDelete = await fieldTestServiceImplEntityComponentsPage.countDeleteButtons();
        await fieldTestServiceImplEntityComponentsPage.clickOnLastDeleteButton();

        fieldTestServiceImplEntityDeleteDialog = new FieldTestServiceImplEntityDeleteDialog();
        expect(await fieldTestServiceImplEntityDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Field Test Service Impl Entity?'
        );
        await fieldTestServiceImplEntityDeleteDialog.clickOnConfirmButton();

        expect(await fieldTestServiceImplEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
