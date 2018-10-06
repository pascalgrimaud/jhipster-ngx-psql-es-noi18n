/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    FieldTestPagerEntityComponentsPage,
    FieldTestPagerEntityDeleteDialog,
    FieldTestPagerEntityUpdatePage
} from './field-test-pager-entity.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FieldTestPagerEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldTestPagerEntityUpdatePage: FieldTestPagerEntityUpdatePage;
    let fieldTestPagerEntityComponentsPage: FieldTestPagerEntityComponentsPage;
    let fieldTestPagerEntityDeleteDialog: FieldTestPagerEntityDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldTestPagerEntities', async () => {
        await navBarPage.goToEntity('field-test-pager-entity');
        fieldTestPagerEntityComponentsPage = new FieldTestPagerEntityComponentsPage();
        expect(await fieldTestPagerEntityComponentsPage.getTitle()).to.eq('Field Test Pager Entities');
    });

    it('should load create FieldTestPagerEntity page', async () => {
        await fieldTestPagerEntityComponentsPage.clickOnCreateButton();
        fieldTestPagerEntityUpdatePage = new FieldTestPagerEntityUpdatePage();
        expect(await fieldTestPagerEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Field Test Pager Entity');
        await fieldTestPagerEntityUpdatePage.cancel();
    });

    it('should create and save FieldTestPagerEntities', async () => {
        const nbButtonsBeforeCreate = await fieldTestPagerEntityComponentsPage.countDeleteButtons();

        await fieldTestPagerEntityComponentsPage.clickOnCreateButton();
        await fieldTestPagerEntityUpdatePage.setStringJadeInput('stringJade');
        expect(await fieldTestPagerEntityUpdatePage.getStringJadeInput()).to.eq('stringJade');
        await fieldTestPagerEntityUpdatePage.setStringRequiredJadeInput('stringRequiredJade');
        expect(await fieldTestPagerEntityUpdatePage.getStringRequiredJadeInput()).to.eq('stringRequiredJade');
        await fieldTestPagerEntityUpdatePage.setStringMinlengthJadeInput('stringMinlengthJade');
        expect(await fieldTestPagerEntityUpdatePage.getStringMinlengthJadeInput()).to.eq('stringMinlengthJade');
        await fieldTestPagerEntityUpdatePage.setStringMaxlengthJadeInput('stringMaxlengthJade');
        expect(await fieldTestPagerEntityUpdatePage.getStringMaxlengthJadeInput()).to.eq('stringMaxlengthJade');
        await fieldTestPagerEntityUpdatePage.setStringPatternJadeInput('stringPatternJade');
        expect(await fieldTestPagerEntityUpdatePage.getStringPatternJadeInput()).to.eq('stringPatternJade');
        await fieldTestPagerEntityUpdatePage.setIntegerJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getIntegerJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setIntegerRequiredJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getIntegerRequiredJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setIntegerMinJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getIntegerMinJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setIntegerMaxJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getIntegerMaxJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setLongJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getLongJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setLongRequiredJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getLongRequiredJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setLongMinJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getLongMinJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setLongMaxJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getLongMaxJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setFloatJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getFloatJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setFloatRequiredJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getFloatRequiredJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setFloatMinJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getFloatMinJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setFloatMaxJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getFloatMaxJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setDoubleRequiredJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getDoubleRequiredJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setDoubleMinJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getDoubleMinJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setDoubleMaxJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getDoubleMaxJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setBigDecimalRequiredJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getBigDecimalRequiredJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setBigDecimalMinJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getBigDecimalMinJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setBigDecimalMaxJadeInput('5');
        expect(await fieldTestPagerEntityUpdatePage.getBigDecimalMaxJadeInput()).to.eq('5');
        await fieldTestPagerEntityUpdatePage.setLocalDateJadeInput('2000-12-31');
        expect(await fieldTestPagerEntityUpdatePage.getLocalDateJadeInput()).to.eq('2000-12-31');
        await fieldTestPagerEntityUpdatePage.setLocalDateRequiredJadeInput('2000-12-31');
        expect(await fieldTestPagerEntityUpdatePage.getLocalDateRequiredJadeInput()).to.eq('2000-12-31');
        await fieldTestPagerEntityUpdatePage.setInstantJadeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPagerEntityUpdatePage.getInstantJadeInput()).to.contain('2001-01-01T02:30');
        await fieldTestPagerEntityUpdatePage.setInstanteRequiredJadeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPagerEntityUpdatePage.getInstanteRequiredJadeInput()).to.contain('2001-01-01T02:30');
        await fieldTestPagerEntityUpdatePage.setZonedDateTimeJadeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPagerEntityUpdatePage.getZonedDateTimeJadeInput()).to.contain('2001-01-01T02:30');
        await fieldTestPagerEntityUpdatePage.setZonedDateTimeRequiredJadeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPagerEntityUpdatePage.getZonedDateTimeRequiredJadeInput()).to.contain('2001-01-01T02:30');
        const selectedBooleanJade = fieldTestPagerEntityUpdatePage.getBooleanJadeInput();
        if (await selectedBooleanJade.isSelected()) {
            await fieldTestPagerEntityUpdatePage.getBooleanJadeInput().click();
            expect(await fieldTestPagerEntityUpdatePage.getBooleanJadeInput().isSelected()).to.be.false;
        } else {
            await fieldTestPagerEntityUpdatePage.getBooleanJadeInput().click();
            expect(await fieldTestPagerEntityUpdatePage.getBooleanJadeInput().isSelected()).to.be.true;
        }
        const selectedBooleanRequiredJade = fieldTestPagerEntityUpdatePage.getBooleanRequiredJadeInput();
        if (await selectedBooleanRequiredJade.isSelected()) {
            await fieldTestPagerEntityUpdatePage.getBooleanRequiredJadeInput().click();
            expect(await fieldTestPagerEntityUpdatePage.getBooleanRequiredJadeInput().isSelected()).to.be.false;
        } else {
            await fieldTestPagerEntityUpdatePage.getBooleanRequiredJadeInput().click();
            expect(await fieldTestPagerEntityUpdatePage.getBooleanRequiredJadeInput().isSelected()).to.be.true;
        }
        await fieldTestPagerEntityUpdatePage.enumJadeSelectLastOption();
        await fieldTestPagerEntityUpdatePage.enumRequiredJadeSelectLastOption();
        await fieldTestPagerEntityUpdatePage.setByteImageJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteImageRequiredJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteImageMinbytesJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteImageMaxbytesJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteAnyJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteAnyRequiredJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteAnyMinbytesJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteAnyMaxbytesJadeInput(absolutePath);
        await fieldTestPagerEntityUpdatePage.setByteTextJadeInput('byteTextJade');
        expect(await fieldTestPagerEntityUpdatePage.getByteTextJadeInput()).to.eq('byteTextJade');
        await fieldTestPagerEntityUpdatePage.setByteTextRequiredJadeInput('byteTextRequiredJade');
        expect(await fieldTestPagerEntityUpdatePage.getByteTextRequiredJadeInput()).to.eq('byteTextRequiredJade');
        await fieldTestPagerEntityUpdatePage.setByteTextMinbytesJadeInput('byteTextMinbytesJade');
        expect(await fieldTestPagerEntityUpdatePage.getByteTextMinbytesJadeInput()).to.eq('byteTextMinbytesJade');
        await fieldTestPagerEntityUpdatePage.setByteTextMaxbytesJadeInput('byteTextMaxbytesJade');
        expect(await fieldTestPagerEntityUpdatePage.getByteTextMaxbytesJadeInput()).to.eq('byteTextMaxbytesJade');
        await fieldTestPagerEntityUpdatePage.save();
        expect(await fieldTestPagerEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldTestPagerEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldTestPagerEntity', async () => {
        const nbButtonsBeforeDelete = await fieldTestPagerEntityComponentsPage.countDeleteButtons();
        await fieldTestPagerEntityComponentsPage.clickOnLastDeleteButton();

        fieldTestPagerEntityDeleteDialog = new FieldTestPagerEntityDeleteDialog();
        expect(await fieldTestPagerEntityDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Field Test Pager Entity?'
        );
        await fieldTestPagerEntityDeleteDialog.clickOnConfirmButton();

        expect(await fieldTestPagerEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
