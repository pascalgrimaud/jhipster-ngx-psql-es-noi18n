import { element, by, ElementFinder } from 'protractor';

export class FieldTestInfiniteScrollEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-test-infinite-scroll-entity div table .btn-danger'));
    title = element.all(by.css('jhi-field-test-infinite-scroll-entity div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class FieldTestInfiniteScrollEntityUpdatePage {
    pageTitle = element(by.id('jhi-field-test-infinite-scroll-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stringHugoInput = element(by.id('field_stringHugo'));
    stringRequiredHugoInput = element(by.id('field_stringRequiredHugo'));
    stringMinlengthHugoInput = element(by.id('field_stringMinlengthHugo'));
    stringMaxlengthHugoInput = element(by.id('field_stringMaxlengthHugo'));
    stringPatternHugoInput = element(by.id('field_stringPatternHugo'));
    integerHugoInput = element(by.id('field_integerHugo'));
    integerRequiredHugoInput = element(by.id('field_integerRequiredHugo'));
    integerMinHugoInput = element(by.id('field_integerMinHugo'));
    integerMaxHugoInput = element(by.id('field_integerMaxHugo'));
    longHugoInput = element(by.id('field_longHugo'));
    longRequiredHugoInput = element(by.id('field_longRequiredHugo'));
    longMinHugoInput = element(by.id('field_longMinHugo'));
    longMaxHugoInput = element(by.id('field_longMaxHugo'));
    floatHugoInput = element(by.id('field_floatHugo'));
    floatRequiredHugoInput = element(by.id('field_floatRequiredHugo'));
    floatMinHugoInput = element(by.id('field_floatMinHugo'));
    floatMaxHugoInput = element(by.id('field_floatMaxHugo'));
    doubleRequiredHugoInput = element(by.id('field_doubleRequiredHugo'));
    doubleMinHugoInput = element(by.id('field_doubleMinHugo'));
    doubleMaxHugoInput = element(by.id('field_doubleMaxHugo'));
    bigDecimalRequiredHugoInput = element(by.id('field_bigDecimalRequiredHugo'));
    bigDecimalMinHugoInput = element(by.id('field_bigDecimalMinHugo'));
    bigDecimalMaxHugoInput = element(by.id('field_bigDecimalMaxHugo'));
    localDateHugoInput = element(by.id('field_localDateHugo'));
    localDateRequiredHugoInput = element(by.id('field_localDateRequiredHugo'));
    instantHugoInput = element(by.id('field_instantHugo'));
    instanteRequiredHugoInput = element(by.id('field_instanteRequiredHugo'));
    zonedDateTimeHugoInput = element(by.id('field_zonedDateTimeHugo'));
    zonedDateTimeRequiredHugoInput = element(by.id('field_zonedDateTimeRequiredHugo'));
    booleanHugoInput = element(by.id('field_booleanHugo'));
    booleanRequiredHugoInput = element(by.id('field_booleanRequiredHugo'));
    enumHugoSelect = element(by.id('field_enumHugo'));
    enumRequiredHugoSelect = element(by.id('field_enumRequiredHugo'));
    byteImageHugoInput = element(by.id('file_byteImageHugo'));
    byteImageRequiredHugoInput = element(by.id('file_byteImageRequiredHugo'));
    byteImageMinbytesHugoInput = element(by.id('file_byteImageMinbytesHugo'));
    byteImageMaxbytesHugoInput = element(by.id('file_byteImageMaxbytesHugo'));
    byteAnyHugoInput = element(by.id('file_byteAnyHugo'));
    byteAnyRequiredHugoInput = element(by.id('file_byteAnyRequiredHugo'));
    byteAnyMinbytesHugoInput = element(by.id('file_byteAnyMinbytesHugo'));
    byteAnyMaxbytesHugoInput = element(by.id('file_byteAnyMaxbytesHugo'));
    byteTextHugoInput = element(by.id('field_byteTextHugo'));
    byteTextRequiredHugoInput = element(by.id('field_byteTextRequiredHugo'));
    byteTextMinbytesHugoInput = element(by.id('field_byteTextMinbytesHugo'));
    byteTextMaxbytesHugoInput = element(by.id('field_byteTextMaxbytesHugo'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStringHugoInput(stringHugo) {
        await this.stringHugoInput.sendKeys(stringHugo);
    }

    async getStringHugoInput() {
        return this.stringHugoInput.getAttribute('value');
    }

    async setStringRequiredHugoInput(stringRequiredHugo) {
        await this.stringRequiredHugoInput.sendKeys(stringRequiredHugo);
    }

    async getStringRequiredHugoInput() {
        return this.stringRequiredHugoInput.getAttribute('value');
    }

    async setStringMinlengthHugoInput(stringMinlengthHugo) {
        await this.stringMinlengthHugoInput.sendKeys(stringMinlengthHugo);
    }

    async getStringMinlengthHugoInput() {
        return this.stringMinlengthHugoInput.getAttribute('value');
    }

    async setStringMaxlengthHugoInput(stringMaxlengthHugo) {
        await this.stringMaxlengthHugoInput.sendKeys(stringMaxlengthHugo);
    }

    async getStringMaxlengthHugoInput() {
        return this.stringMaxlengthHugoInput.getAttribute('value');
    }

    async setStringPatternHugoInput(stringPatternHugo) {
        await this.stringPatternHugoInput.sendKeys(stringPatternHugo);
    }

    async getStringPatternHugoInput() {
        return this.stringPatternHugoInput.getAttribute('value');
    }

    async setIntegerHugoInput(integerHugo) {
        await this.integerHugoInput.sendKeys(integerHugo);
    }

    async getIntegerHugoInput() {
        return this.integerHugoInput.getAttribute('value');
    }

    async setIntegerRequiredHugoInput(integerRequiredHugo) {
        await this.integerRequiredHugoInput.sendKeys(integerRequiredHugo);
    }

    async getIntegerRequiredHugoInput() {
        return this.integerRequiredHugoInput.getAttribute('value');
    }

    async setIntegerMinHugoInput(integerMinHugo) {
        await this.integerMinHugoInput.sendKeys(integerMinHugo);
    }

    async getIntegerMinHugoInput() {
        return this.integerMinHugoInput.getAttribute('value');
    }

    async setIntegerMaxHugoInput(integerMaxHugo) {
        await this.integerMaxHugoInput.sendKeys(integerMaxHugo);
    }

    async getIntegerMaxHugoInput() {
        return this.integerMaxHugoInput.getAttribute('value');
    }

    async setLongHugoInput(longHugo) {
        await this.longHugoInput.sendKeys(longHugo);
    }

    async getLongHugoInput() {
        return this.longHugoInput.getAttribute('value');
    }

    async setLongRequiredHugoInput(longRequiredHugo) {
        await this.longRequiredHugoInput.sendKeys(longRequiredHugo);
    }

    async getLongRequiredHugoInput() {
        return this.longRequiredHugoInput.getAttribute('value');
    }

    async setLongMinHugoInput(longMinHugo) {
        await this.longMinHugoInput.sendKeys(longMinHugo);
    }

    async getLongMinHugoInput() {
        return this.longMinHugoInput.getAttribute('value');
    }

    async setLongMaxHugoInput(longMaxHugo) {
        await this.longMaxHugoInput.sendKeys(longMaxHugo);
    }

    async getLongMaxHugoInput() {
        return this.longMaxHugoInput.getAttribute('value');
    }

    async setFloatHugoInput(floatHugo) {
        await this.floatHugoInput.sendKeys(floatHugo);
    }

    async getFloatHugoInput() {
        return this.floatHugoInput.getAttribute('value');
    }

    async setFloatRequiredHugoInput(floatRequiredHugo) {
        await this.floatRequiredHugoInput.sendKeys(floatRequiredHugo);
    }

    async getFloatRequiredHugoInput() {
        return this.floatRequiredHugoInput.getAttribute('value');
    }

    async setFloatMinHugoInput(floatMinHugo) {
        await this.floatMinHugoInput.sendKeys(floatMinHugo);
    }

    async getFloatMinHugoInput() {
        return this.floatMinHugoInput.getAttribute('value');
    }

    async setFloatMaxHugoInput(floatMaxHugo) {
        await this.floatMaxHugoInput.sendKeys(floatMaxHugo);
    }

    async getFloatMaxHugoInput() {
        return this.floatMaxHugoInput.getAttribute('value');
    }

    async setDoubleRequiredHugoInput(doubleRequiredHugo) {
        await this.doubleRequiredHugoInput.sendKeys(doubleRequiredHugo);
    }

    async getDoubleRequiredHugoInput() {
        return this.doubleRequiredHugoInput.getAttribute('value');
    }

    async setDoubleMinHugoInput(doubleMinHugo) {
        await this.doubleMinHugoInput.sendKeys(doubleMinHugo);
    }

    async getDoubleMinHugoInput() {
        return this.doubleMinHugoInput.getAttribute('value');
    }

    async setDoubleMaxHugoInput(doubleMaxHugo) {
        await this.doubleMaxHugoInput.sendKeys(doubleMaxHugo);
    }

    async getDoubleMaxHugoInput() {
        return this.doubleMaxHugoInput.getAttribute('value');
    }

    async setBigDecimalRequiredHugoInput(bigDecimalRequiredHugo) {
        await this.bigDecimalRequiredHugoInput.sendKeys(bigDecimalRequiredHugo);
    }

    async getBigDecimalRequiredHugoInput() {
        return this.bigDecimalRequiredHugoInput.getAttribute('value');
    }

    async setBigDecimalMinHugoInput(bigDecimalMinHugo) {
        await this.bigDecimalMinHugoInput.sendKeys(bigDecimalMinHugo);
    }

    async getBigDecimalMinHugoInput() {
        return this.bigDecimalMinHugoInput.getAttribute('value');
    }

    async setBigDecimalMaxHugoInput(bigDecimalMaxHugo) {
        await this.bigDecimalMaxHugoInput.sendKeys(bigDecimalMaxHugo);
    }

    async getBigDecimalMaxHugoInput() {
        return this.bigDecimalMaxHugoInput.getAttribute('value');
    }

    async setLocalDateHugoInput(localDateHugo) {
        await this.localDateHugoInput.sendKeys(localDateHugo);
    }

    async getLocalDateHugoInput() {
        return this.localDateHugoInput.getAttribute('value');
    }

    async setLocalDateRequiredHugoInput(localDateRequiredHugo) {
        await this.localDateRequiredHugoInput.sendKeys(localDateRequiredHugo);
    }

    async getLocalDateRequiredHugoInput() {
        return this.localDateRequiredHugoInput.getAttribute('value');
    }

    async setInstantHugoInput(instantHugo) {
        await this.instantHugoInput.sendKeys(instantHugo);
    }

    async getInstantHugoInput() {
        return this.instantHugoInput.getAttribute('value');
    }

    async setInstanteRequiredHugoInput(instanteRequiredHugo) {
        await this.instanteRequiredHugoInput.sendKeys(instanteRequiredHugo);
    }

    async getInstanteRequiredHugoInput() {
        return this.instanteRequiredHugoInput.getAttribute('value');
    }

    async setZonedDateTimeHugoInput(zonedDateTimeHugo) {
        await this.zonedDateTimeHugoInput.sendKeys(zonedDateTimeHugo);
    }

    async getZonedDateTimeHugoInput() {
        return this.zonedDateTimeHugoInput.getAttribute('value');
    }

    async setZonedDateTimeRequiredHugoInput(zonedDateTimeRequiredHugo) {
        await this.zonedDateTimeRequiredHugoInput.sendKeys(zonedDateTimeRequiredHugo);
    }

    async getZonedDateTimeRequiredHugoInput() {
        return this.zonedDateTimeRequiredHugoInput.getAttribute('value');
    }

    getBooleanHugoInput() {
        return this.booleanHugoInput;
    }
    getBooleanRequiredHugoInput() {
        return this.booleanRequiredHugoInput;
    }
    async setEnumHugoSelect(enumHugo) {
        await this.enumHugoSelect.sendKeys(enumHugo);
    }

    async getEnumHugoSelect() {
        return this.enumHugoSelect.element(by.css('option:checked')).getText();
    }

    async enumHugoSelectLastOption() {
        await this.enumHugoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEnumRequiredHugoSelect(enumRequiredHugo) {
        await this.enumRequiredHugoSelect.sendKeys(enumRequiredHugo);
    }

    async getEnumRequiredHugoSelect() {
        return this.enumRequiredHugoSelect.element(by.css('option:checked')).getText();
    }

    async enumRequiredHugoSelectLastOption() {
        await this.enumRequiredHugoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setByteImageHugoInput(byteImageHugo) {
        await this.byteImageHugoInput.sendKeys(byteImageHugo);
    }

    async getByteImageHugoInput() {
        return this.byteImageHugoInput.getAttribute('value');
    }

    async setByteImageRequiredHugoInput(byteImageRequiredHugo) {
        await this.byteImageRequiredHugoInput.sendKeys(byteImageRequiredHugo);
    }

    async getByteImageRequiredHugoInput() {
        return this.byteImageRequiredHugoInput.getAttribute('value');
    }

    async setByteImageMinbytesHugoInput(byteImageMinbytesHugo) {
        await this.byteImageMinbytesHugoInput.sendKeys(byteImageMinbytesHugo);
    }

    async getByteImageMinbytesHugoInput() {
        return this.byteImageMinbytesHugoInput.getAttribute('value');
    }

    async setByteImageMaxbytesHugoInput(byteImageMaxbytesHugo) {
        await this.byteImageMaxbytesHugoInput.sendKeys(byteImageMaxbytesHugo);
    }

    async getByteImageMaxbytesHugoInput() {
        return this.byteImageMaxbytesHugoInput.getAttribute('value');
    }

    async setByteAnyHugoInput(byteAnyHugo) {
        await this.byteAnyHugoInput.sendKeys(byteAnyHugo);
    }

    async getByteAnyHugoInput() {
        return this.byteAnyHugoInput.getAttribute('value');
    }

    async setByteAnyRequiredHugoInput(byteAnyRequiredHugo) {
        await this.byteAnyRequiredHugoInput.sendKeys(byteAnyRequiredHugo);
    }

    async getByteAnyRequiredHugoInput() {
        return this.byteAnyRequiredHugoInput.getAttribute('value');
    }

    async setByteAnyMinbytesHugoInput(byteAnyMinbytesHugo) {
        await this.byteAnyMinbytesHugoInput.sendKeys(byteAnyMinbytesHugo);
    }

    async getByteAnyMinbytesHugoInput() {
        return this.byteAnyMinbytesHugoInput.getAttribute('value');
    }

    async setByteAnyMaxbytesHugoInput(byteAnyMaxbytesHugo) {
        await this.byteAnyMaxbytesHugoInput.sendKeys(byteAnyMaxbytesHugo);
    }

    async getByteAnyMaxbytesHugoInput() {
        return this.byteAnyMaxbytesHugoInput.getAttribute('value');
    }

    async setByteTextHugoInput(byteTextHugo) {
        await this.byteTextHugoInput.sendKeys(byteTextHugo);
    }

    async getByteTextHugoInput() {
        return this.byteTextHugoInput.getAttribute('value');
    }

    async setByteTextRequiredHugoInput(byteTextRequiredHugo) {
        await this.byteTextRequiredHugoInput.sendKeys(byteTextRequiredHugo);
    }

    async getByteTextRequiredHugoInput() {
        return this.byteTextRequiredHugoInput.getAttribute('value');
    }

    async setByteTextMinbytesHugoInput(byteTextMinbytesHugo) {
        await this.byteTextMinbytesHugoInput.sendKeys(byteTextMinbytesHugo);
    }

    async getByteTextMinbytesHugoInput() {
        return this.byteTextMinbytesHugoInput.getAttribute('value');
    }

    async setByteTextMaxbytesHugoInput(byteTextMaxbytesHugo) {
        await this.byteTextMaxbytesHugoInput.sendKeys(byteTextMaxbytesHugo);
    }

    async getByteTextMaxbytesHugoInput() {
        return this.byteTextMaxbytesHugoInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class FieldTestInfiniteScrollEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldTestInfiniteScrollEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldTestInfiniteScrollEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
