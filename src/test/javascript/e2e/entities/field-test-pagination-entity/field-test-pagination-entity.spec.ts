/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    FieldTestPaginationEntityComponentsPage,
    FieldTestPaginationEntityDeleteDialog,
    FieldTestPaginationEntityUpdatePage
} from './field-test-pagination-entity.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FieldTestPaginationEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldTestPaginationEntityUpdatePage: FieldTestPaginationEntityUpdatePage;
    let fieldTestPaginationEntityComponentsPage: FieldTestPaginationEntityComponentsPage;
    let fieldTestPaginationEntityDeleteDialog: FieldTestPaginationEntityDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldTestPaginationEntities', async () => {
        await navBarPage.goToEntity('field-test-pagination-entity');
        fieldTestPaginationEntityComponentsPage = new FieldTestPaginationEntityComponentsPage();
        expect(await fieldTestPaginationEntityComponentsPage.getTitle()).to.eq('Field Test Pagination Entities');
    });

    it('should load create FieldTestPaginationEntity page', async () => {
        await fieldTestPaginationEntityComponentsPage.clickOnCreateButton();
        fieldTestPaginationEntityUpdatePage = new FieldTestPaginationEntityUpdatePage();
        expect(await fieldTestPaginationEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Field Test Pagination Entity');
        await fieldTestPaginationEntityUpdatePage.cancel();
    });

    it('should create and save FieldTestPaginationEntities', async () => {
        const nbButtonsBeforeCreate = await fieldTestPaginationEntityComponentsPage.countDeleteButtons();

        await fieldTestPaginationEntityComponentsPage.clickOnCreateButton();
        await fieldTestPaginationEntityUpdatePage.setStringAliceInput('stringAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getStringAliceInput()).to.eq('stringAlice');
        await fieldTestPaginationEntityUpdatePage.setStringRequiredAliceInput('stringRequiredAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getStringRequiredAliceInput()).to.eq('stringRequiredAlice');
        await fieldTestPaginationEntityUpdatePage.setStringMinlengthAliceInput('stringMinlengthAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getStringMinlengthAliceInput()).to.eq('stringMinlengthAlice');
        await fieldTestPaginationEntityUpdatePage.setStringMaxlengthAliceInput('stringMaxlengthAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getStringMaxlengthAliceInput()).to.eq('stringMaxlengthAlice');
        await fieldTestPaginationEntityUpdatePage.setStringPatternAliceInput('stringPatternAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getStringPatternAliceInput()).to.eq('stringPatternAlice');
        await fieldTestPaginationEntityUpdatePage.setIntegerAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getIntegerAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setIntegerRequiredAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getIntegerRequiredAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setIntegerMinAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getIntegerMinAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setIntegerMaxAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getIntegerMaxAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setLongAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getLongAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setLongRequiredAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getLongRequiredAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setLongMinAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getLongMinAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setLongMaxAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getLongMaxAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setFloatAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getFloatAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setFloatRequiredAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getFloatRequiredAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setFloatMinAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getFloatMinAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setFloatMaxAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getFloatMaxAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setDoubleRequiredAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getDoubleRequiredAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setDoubleMinAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getDoubleMinAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setDoubleMaxAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getDoubleMaxAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setBigDecimalRequiredAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getBigDecimalRequiredAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setBigDecimalMinAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getBigDecimalMinAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setBigDecimalMaxAliceInput('5');
        expect(await fieldTestPaginationEntityUpdatePage.getBigDecimalMaxAliceInput()).to.eq('5');
        await fieldTestPaginationEntityUpdatePage.setLocalDateAliceInput('2000-12-31');
        expect(await fieldTestPaginationEntityUpdatePage.getLocalDateAliceInput()).to.eq('2000-12-31');
        await fieldTestPaginationEntityUpdatePage.setLocalDateRequiredAliceInput('2000-12-31');
        expect(await fieldTestPaginationEntityUpdatePage.getLocalDateRequiredAliceInput()).to.eq('2000-12-31');
        await fieldTestPaginationEntityUpdatePage.setInstantAliceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPaginationEntityUpdatePage.getInstantAliceInput()).to.contain('2001-01-01T02:30');
        await fieldTestPaginationEntityUpdatePage.setInstanteRequiredAliceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPaginationEntityUpdatePage.getInstanteRequiredAliceInput()).to.contain('2001-01-01T02:30');
        await fieldTestPaginationEntityUpdatePage.setZonedDateTimeAliceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPaginationEntityUpdatePage.getZonedDateTimeAliceInput()).to.contain('2001-01-01T02:30');
        await fieldTestPaginationEntityUpdatePage.setZonedDateTimeRequiredAliceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestPaginationEntityUpdatePage.getZonedDateTimeRequiredAliceInput()).to.contain('2001-01-01T02:30');
        const selectedBooleanAlice = fieldTestPaginationEntityUpdatePage.getBooleanAliceInput();
        if (await selectedBooleanAlice.isSelected()) {
            await fieldTestPaginationEntityUpdatePage.getBooleanAliceInput().click();
            expect(await fieldTestPaginationEntityUpdatePage.getBooleanAliceInput().isSelected()).to.be.false;
        } else {
            await fieldTestPaginationEntityUpdatePage.getBooleanAliceInput().click();
            expect(await fieldTestPaginationEntityUpdatePage.getBooleanAliceInput().isSelected()).to.be.true;
        }
        const selectedBooleanRequiredAlice = fieldTestPaginationEntityUpdatePage.getBooleanRequiredAliceInput();
        if (await selectedBooleanRequiredAlice.isSelected()) {
            await fieldTestPaginationEntityUpdatePage.getBooleanRequiredAliceInput().click();
            expect(await fieldTestPaginationEntityUpdatePage.getBooleanRequiredAliceInput().isSelected()).to.be.false;
        } else {
            await fieldTestPaginationEntityUpdatePage.getBooleanRequiredAliceInput().click();
            expect(await fieldTestPaginationEntityUpdatePage.getBooleanRequiredAliceInput().isSelected()).to.be.true;
        }
        await fieldTestPaginationEntityUpdatePage.enumAliceSelectLastOption();
        await fieldTestPaginationEntityUpdatePage.enumRequiredAliceSelectLastOption();
        await fieldTestPaginationEntityUpdatePage.setByteImageAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteImageRequiredAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteImageMinbytesAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteImageMaxbytesAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteAnyAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteAnyRequiredAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteAnyMinbytesAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteAnyMaxbytesAliceInput(absolutePath);
        await fieldTestPaginationEntityUpdatePage.setByteTextAliceInput('byteTextAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getByteTextAliceInput()).to.eq('byteTextAlice');
        await fieldTestPaginationEntityUpdatePage.setByteTextRequiredAliceInput('byteTextRequiredAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getByteTextRequiredAliceInput()).to.eq('byteTextRequiredAlice');
        await fieldTestPaginationEntityUpdatePage.setByteTextMinbytesAliceInput('byteTextMinbytesAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getByteTextMinbytesAliceInput()).to.eq('byteTextMinbytesAlice');
        await fieldTestPaginationEntityUpdatePage.setByteTextMaxbytesAliceInput('byteTextMaxbytesAlice');
        expect(await fieldTestPaginationEntityUpdatePage.getByteTextMaxbytesAliceInput()).to.eq('byteTextMaxbytesAlice');
        await fieldTestPaginationEntityUpdatePage.save();
        expect(await fieldTestPaginationEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldTestPaginationEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldTestPaginationEntity', async () => {
        const nbButtonsBeforeDelete = await fieldTestPaginationEntityComponentsPage.countDeleteButtons();
        await fieldTestPaginationEntityComponentsPage.clickOnLastDeleteButton();

        fieldTestPaginationEntityDeleteDialog = new FieldTestPaginationEntityDeleteDialog();
        expect(await fieldTestPaginationEntityDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Field Test Pagination Entity?'
        );
        await fieldTestPaginationEntityDeleteDialog.clickOnConfirmButton();

        expect(await fieldTestPaginationEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
