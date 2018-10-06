/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    FieldTestInfiniteScrollEntityComponentsPage,
    FieldTestInfiniteScrollEntityDeleteDialog,
    FieldTestInfiniteScrollEntityUpdatePage
} from './field-test-infinite-scroll-entity.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('FieldTestInfiniteScrollEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fieldTestInfiniteScrollEntityUpdatePage: FieldTestInfiniteScrollEntityUpdatePage;
    let fieldTestInfiniteScrollEntityComponentsPage: FieldTestInfiniteScrollEntityComponentsPage;
    let fieldTestInfiniteScrollEntityDeleteDialog: FieldTestInfiniteScrollEntityDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FieldTestInfiniteScrollEntities', async () => {
        await navBarPage.goToEntity('field-test-infinite-scroll-entity');
        fieldTestInfiniteScrollEntityComponentsPage = new FieldTestInfiniteScrollEntityComponentsPage();
        expect(await fieldTestInfiniteScrollEntityComponentsPage.getTitle()).to.eq('Field Test Infinite Scroll Entities');
    });

    it('should load create FieldTestInfiniteScrollEntity page', async () => {
        await fieldTestInfiniteScrollEntityComponentsPage.clickOnCreateButton();
        fieldTestInfiniteScrollEntityUpdatePage = new FieldTestInfiniteScrollEntityUpdatePage();
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getPageTitle()).to.eq('Create or edit a Field Test Infinite Scroll Entity');
        await fieldTestInfiniteScrollEntityUpdatePage.cancel();
    });

    it('should create and save FieldTestInfiniteScrollEntities', async () => {
        const nbButtonsBeforeCreate = await fieldTestInfiniteScrollEntityComponentsPage.countDeleteButtons();

        await fieldTestInfiniteScrollEntityComponentsPage.clickOnCreateButton();
        await fieldTestInfiniteScrollEntityUpdatePage.setStringHugoInput('stringHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getStringHugoInput()).to.eq('stringHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setStringRequiredHugoInput('stringRequiredHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getStringRequiredHugoInput()).to.eq('stringRequiredHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setStringMinlengthHugoInput('stringMinlengthHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getStringMinlengthHugoInput()).to.eq('stringMinlengthHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setStringMaxlengthHugoInput('stringMaxlengthHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getStringMaxlengthHugoInput()).to.eq('stringMaxlengthHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setStringPatternHugoInput('stringPatternHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getStringPatternHugoInput()).to.eq('stringPatternHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setIntegerHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getIntegerHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setIntegerRequiredHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getIntegerRequiredHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setIntegerMinHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getIntegerMinHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setIntegerMaxHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getIntegerMaxHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setLongHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getLongHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setLongRequiredHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getLongRequiredHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setLongMinHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getLongMinHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setLongMaxHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getLongMaxHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setFloatHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getFloatHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setFloatRequiredHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getFloatRequiredHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setFloatMinHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getFloatMinHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setFloatMaxHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getFloatMaxHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setDoubleRequiredHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getDoubleRequiredHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setDoubleMinHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getDoubleMinHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setDoubleMaxHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getDoubleMaxHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setBigDecimalRequiredHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getBigDecimalRequiredHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setBigDecimalMinHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getBigDecimalMinHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setBigDecimalMaxHugoInput('5');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getBigDecimalMaxHugoInput()).to.eq('5');
        await fieldTestInfiniteScrollEntityUpdatePage.setLocalDateHugoInput('2000-12-31');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getLocalDateHugoInput()).to.eq('2000-12-31');
        await fieldTestInfiniteScrollEntityUpdatePage.setLocalDateRequiredHugoInput('2000-12-31');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getLocalDateRequiredHugoInput()).to.eq('2000-12-31');
        await fieldTestInfiniteScrollEntityUpdatePage.setInstantHugoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getInstantHugoInput()).to.contain('2001-01-01T02:30');
        await fieldTestInfiniteScrollEntityUpdatePage.setInstanteRequiredHugoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getInstanteRequiredHugoInput()).to.contain('2001-01-01T02:30');
        await fieldTestInfiniteScrollEntityUpdatePage.setZonedDateTimeHugoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getZonedDateTimeHugoInput()).to.contain('2001-01-01T02:30');
        await fieldTestInfiniteScrollEntityUpdatePage.setZonedDateTimeRequiredHugoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getZonedDateTimeRequiredHugoInput()).to.contain('2001-01-01T02:30');
        const selectedBooleanHugo = fieldTestInfiniteScrollEntityUpdatePage.getBooleanHugoInput();
        if (await selectedBooleanHugo.isSelected()) {
            await fieldTestInfiniteScrollEntityUpdatePage.getBooleanHugoInput().click();
            expect(await fieldTestInfiniteScrollEntityUpdatePage.getBooleanHugoInput().isSelected()).to.be.false;
        } else {
            await fieldTestInfiniteScrollEntityUpdatePage.getBooleanHugoInput().click();
            expect(await fieldTestInfiniteScrollEntityUpdatePage.getBooleanHugoInput().isSelected()).to.be.true;
        }
        const selectedBooleanRequiredHugo = fieldTestInfiniteScrollEntityUpdatePage.getBooleanRequiredHugoInput();
        if (await selectedBooleanRequiredHugo.isSelected()) {
            await fieldTestInfiniteScrollEntityUpdatePage.getBooleanRequiredHugoInput().click();
            expect(await fieldTestInfiniteScrollEntityUpdatePage.getBooleanRequiredHugoInput().isSelected()).to.be.false;
        } else {
            await fieldTestInfiniteScrollEntityUpdatePage.getBooleanRequiredHugoInput().click();
            expect(await fieldTestInfiniteScrollEntityUpdatePage.getBooleanRequiredHugoInput().isSelected()).to.be.true;
        }
        await fieldTestInfiniteScrollEntityUpdatePage.enumHugoSelectLastOption();
        await fieldTestInfiniteScrollEntityUpdatePage.enumRequiredHugoSelectLastOption();
        await fieldTestInfiniteScrollEntityUpdatePage.setByteImageHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteImageRequiredHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteImageMinbytesHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteImageMaxbytesHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteAnyHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteAnyRequiredHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteAnyMinbytesHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteAnyMaxbytesHugoInput(absolutePath);
        await fieldTestInfiniteScrollEntityUpdatePage.setByteTextHugoInput('byteTextHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getByteTextHugoInput()).to.eq('byteTextHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setByteTextRequiredHugoInput('byteTextRequiredHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getByteTextRequiredHugoInput()).to.eq('byteTextRequiredHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setByteTextMinbytesHugoInput('byteTextMinbytesHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getByteTextMinbytesHugoInput()).to.eq('byteTextMinbytesHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.setByteTextMaxbytesHugoInput('byteTextMaxbytesHugo');
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getByteTextMaxbytesHugoInput()).to.eq('byteTextMaxbytesHugo');
        await fieldTestInfiniteScrollEntityUpdatePage.save();
        expect(await fieldTestInfiniteScrollEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await fieldTestInfiniteScrollEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FieldTestInfiniteScrollEntity', async () => {
        const nbButtonsBeforeDelete = await fieldTestInfiniteScrollEntityComponentsPage.countDeleteButtons();
        await fieldTestInfiniteScrollEntityComponentsPage.clickOnLastDeleteButton();

        fieldTestInfiniteScrollEntityDeleteDialog = new FieldTestInfiniteScrollEntityDeleteDialog();
        expect(await fieldTestInfiniteScrollEntityDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Field Test Infinite Scroll Entity?'
        );
        await fieldTestInfiniteScrollEntityDeleteDialog.clickOnConfirmButton();

        expect(await fieldTestInfiniteScrollEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
