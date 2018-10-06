/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    FieldTestServiceClassEntityComponentsPage,
    FieldTestServiceClassEntityDeleteDialog,
    FieldTestServiceClassEntityUpdatePage
} from './field-test-service-class-entity.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FieldTestServiceClassEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldTestServiceClassEntityUpdatePage: FieldTestServiceClassEntityUpdatePage;
    let fieldTestServiceClassEntityComponentsPage: FieldTestServiceClassEntityComponentsPage;
    let fieldTestServiceClassEntityDeleteDialog: FieldTestServiceClassEntityDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldTestServiceClassEntities', async () => {
        await navBarPage.goToEntity('field-test-service-class-entity');
        fieldTestServiceClassEntityComponentsPage = new FieldTestServiceClassEntityComponentsPage();
        expect(await fieldTestServiceClassEntityComponentsPage.getTitle()).to.eq('Field Test Service Class Entities');
    });

    it('should load create FieldTestServiceClassEntity page', async () => {
        await fieldTestServiceClassEntityComponentsPage.clickOnCreateButton();
        fieldTestServiceClassEntityUpdatePage = new FieldTestServiceClassEntityUpdatePage();
        expect(await fieldTestServiceClassEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Field Test Service Class Entity');
        await fieldTestServiceClassEntityUpdatePage.cancel();
    });

    it('should create and save FieldTestServiceClassEntities', async () => {
        const nbButtonsBeforeCreate = await fieldTestServiceClassEntityComponentsPage.countDeleteButtons();

        await fieldTestServiceClassEntityComponentsPage.clickOnCreateButton();
        await fieldTestServiceClassEntityUpdatePage.setStringBobInput('stringBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getStringBobInput()).to.eq('stringBob');
        await fieldTestServiceClassEntityUpdatePage.setStringRequiredBobInput('stringRequiredBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getStringRequiredBobInput()).to.eq('stringRequiredBob');
        await fieldTestServiceClassEntityUpdatePage.setStringMinlengthBobInput('stringMinlengthBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getStringMinlengthBobInput()).to.eq('stringMinlengthBob');
        await fieldTestServiceClassEntityUpdatePage.setStringMaxlengthBobInput('stringMaxlengthBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getStringMaxlengthBobInput()).to.eq('stringMaxlengthBob');
        await fieldTestServiceClassEntityUpdatePage.setStringPatternBobInput('stringPatternBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getStringPatternBobInput()).to.eq('stringPatternBob');
        await fieldTestServiceClassEntityUpdatePage.setIntegerBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getIntegerBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setIntegerRequiredBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getIntegerRequiredBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setIntegerMinBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getIntegerMinBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setIntegerMaxBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getIntegerMaxBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setLongBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getLongBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setLongRequiredBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getLongRequiredBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setLongMinBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getLongMinBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setLongMaxBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getLongMaxBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setFloatBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getFloatBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setFloatRequiredBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getFloatRequiredBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setFloatMinBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getFloatMinBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setFloatMaxBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getFloatMaxBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setDoubleRequiredBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getDoubleRequiredBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setDoubleMinBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getDoubleMinBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setDoubleMaxBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getDoubleMaxBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setBigDecimalRequiredBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getBigDecimalRequiredBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setBigDecimalMinBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getBigDecimalMinBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setBigDecimalMaxBobInput('5');
        expect(await fieldTestServiceClassEntityUpdatePage.getBigDecimalMaxBobInput()).to.eq('5');
        await fieldTestServiceClassEntityUpdatePage.setLocalDateBobInput('2000-12-31');
        expect(await fieldTestServiceClassEntityUpdatePage.getLocalDateBobInput()).to.eq('2000-12-31');
        await fieldTestServiceClassEntityUpdatePage.setLocalDateRequiredBobInput('2000-12-31');
        expect(await fieldTestServiceClassEntityUpdatePage.getLocalDateRequiredBobInput()).to.eq('2000-12-31');
        await fieldTestServiceClassEntityUpdatePage.setInstantBobInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceClassEntityUpdatePage.getInstantBobInput()).to.contain('2001-01-01T02:30');
        await fieldTestServiceClassEntityUpdatePage.setInstanteRequiredBobInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceClassEntityUpdatePage.getInstanteRequiredBobInput()).to.contain('2001-01-01T02:30');
        await fieldTestServiceClassEntityUpdatePage.setZonedDateTimeBobInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceClassEntityUpdatePage.getZonedDateTimeBobInput()).to.contain('2001-01-01T02:30');
        await fieldTestServiceClassEntityUpdatePage.setZonedDateTimeRequiredBobInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestServiceClassEntityUpdatePage.getZonedDateTimeRequiredBobInput()).to.contain('2001-01-01T02:30');
        const selectedBooleanBob = fieldTestServiceClassEntityUpdatePage.getBooleanBobInput();
        if (await selectedBooleanBob.isSelected()) {
            await fieldTestServiceClassEntityUpdatePage.getBooleanBobInput().click();
            expect(await fieldTestServiceClassEntityUpdatePage.getBooleanBobInput().isSelected()).to.be.false;
        } else {
            await fieldTestServiceClassEntityUpdatePage.getBooleanBobInput().click();
            expect(await fieldTestServiceClassEntityUpdatePage.getBooleanBobInput().isSelected()).to.be.true;
        }
        const selectedBooleanRequiredBob = fieldTestServiceClassEntityUpdatePage.getBooleanRequiredBobInput();
        if (await selectedBooleanRequiredBob.isSelected()) {
            await fieldTestServiceClassEntityUpdatePage.getBooleanRequiredBobInput().click();
            expect(await fieldTestServiceClassEntityUpdatePage.getBooleanRequiredBobInput().isSelected()).to.be.false;
        } else {
            await fieldTestServiceClassEntityUpdatePage.getBooleanRequiredBobInput().click();
            expect(await fieldTestServiceClassEntityUpdatePage.getBooleanRequiredBobInput().isSelected()).to.be.true;
        }
        await fieldTestServiceClassEntityUpdatePage.enumBobSelectLastOption();
        await fieldTestServiceClassEntityUpdatePage.enumRequiredBobSelectLastOption();
        await fieldTestServiceClassEntityUpdatePage.setByteImageBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteImageRequiredBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteImageMinbytesBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteImageMaxbytesBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteAnyBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteAnyRequiredBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteAnyMinbytesBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteAnyMaxbytesBobInput(absolutePath);
        await fieldTestServiceClassEntityUpdatePage.setByteTextBobInput('byteTextBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getByteTextBobInput()).to.eq('byteTextBob');
        await fieldTestServiceClassEntityUpdatePage.setByteTextRequiredBobInput('byteTextRequiredBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getByteTextRequiredBobInput()).to.eq('byteTextRequiredBob');
        await fieldTestServiceClassEntityUpdatePage.setByteTextMinbytesBobInput('byteTextMinbytesBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getByteTextMinbytesBobInput()).to.eq('byteTextMinbytesBob');
        await fieldTestServiceClassEntityUpdatePage.setByteTextMaxbytesBobInput('byteTextMaxbytesBob');
        expect(await fieldTestServiceClassEntityUpdatePage.getByteTextMaxbytesBobInput()).to.eq('byteTextMaxbytesBob');
        await fieldTestServiceClassEntityUpdatePage.save();
        expect(await fieldTestServiceClassEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldTestServiceClassEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldTestServiceClassEntity', async () => {
        const nbButtonsBeforeDelete = await fieldTestServiceClassEntityComponentsPage.countDeleteButtons();
        await fieldTestServiceClassEntityComponentsPage.clickOnLastDeleteButton();

        fieldTestServiceClassEntityDeleteDialog = new FieldTestServiceClassEntityDeleteDialog();
        expect(await fieldTestServiceClassEntityDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Field Test Service Class Entity?'
        );
        await fieldTestServiceClassEntityDeleteDialog.clickOnConfirmButton();

        expect(await fieldTestServiceClassEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
