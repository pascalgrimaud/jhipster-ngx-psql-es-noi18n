import { element, by, ElementFinder } from 'protractor';

export class FieldTestEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-test-entity div table .btn-danger'));
    title = element.all(by.css('jhi-field-test-entity div h2#page-heading span')).first();

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

export class FieldTestEntityUpdatePage {
    pageTitle = element(by.id('jhi-field-test-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stringTomInput = element(by.id('field_stringTom'));
    stringRequiredTomInput = element(by.id('field_stringRequiredTom'));
    stringMinlengthTomInput = element(by.id('field_stringMinlengthTom'));
    stringMaxlengthTomInput = element(by.id('field_stringMaxlengthTom'));
    stringPatternTomInput = element(by.id('field_stringPatternTom'));
    integerTomInput = element(by.id('field_integerTom'));
    integerRequiredTomInput = element(by.id('field_integerRequiredTom'));
    integerMinTomInput = element(by.id('field_integerMinTom'));
    integerMaxTomInput = element(by.id('field_integerMaxTom'));
    longTomInput = element(by.id('field_longTom'));
    longRequiredTomInput = element(by.id('field_longRequiredTom'));
    longMinTomInput = element(by.id('field_longMinTom'));
    longMaxTomInput = element(by.id('field_longMaxTom'));
    floatTomInput = element(by.id('field_floatTom'));
    floatRequiredTomInput = element(by.id('field_floatRequiredTom'));
    floatMinTomInput = element(by.id('field_floatMinTom'));
    floatMaxTomInput = element(by.id('field_floatMaxTom'));
    doubleRequiredTomInput = element(by.id('field_doubleRequiredTom'));
    doubleMinTomInput = element(by.id('field_doubleMinTom'));
    doubleMaxTomInput = element(by.id('field_doubleMaxTom'));
    bigDecimalRequiredTomInput = element(by.id('field_bigDecimalRequiredTom'));
    bigDecimalMinTomInput = element(by.id('field_bigDecimalMinTom'));
    bigDecimalMaxTomInput = element(by.id('field_bigDecimalMaxTom'));
    localDateTomInput = element(by.id('field_localDateTom'));
    localDateRequiredTomInput = element(by.id('field_localDateRequiredTom'));
    instantTomInput = element(by.id('field_instantTom'));
    instantRequiredTomInput = element(by.id('field_instantRequiredTom'));
    zonedDateTimeTomInput = element(by.id('field_zonedDateTimeTom'));
    zonedDateTimeRequiredTomInput = element(by.id('field_zonedDateTimeRequiredTom'));
    booleanTomInput = element(by.id('field_booleanTom'));
    booleanRequiredTomInput = element(by.id('field_booleanRequiredTom'));
    enumTomSelect = element(by.id('field_enumTom'));
    enumRequiredTomSelect = element(by.id('field_enumRequiredTom'));
    byteImageTomInput = element(by.id('file_byteImageTom'));
    byteImageRequiredTomInput = element(by.id('file_byteImageRequiredTom'));
    byteImageMinbytesTomInput = element(by.id('file_byteImageMinbytesTom'));
    byteImageMaxbytesTomInput = element(by.id('file_byteImageMaxbytesTom'));
    byteAnyTomInput = element(by.id('file_byteAnyTom'));
    byteAnyRequiredTomInput = element(by.id('file_byteAnyRequiredTom'));
    byteAnyMinbytesTomInput = element(by.id('file_byteAnyMinbytesTom'));
    byteAnyMaxbytesTomInput = element(by.id('file_byteAnyMaxbytesTom'));
    byteTextTomInput = element(by.id('field_byteTextTom'));
    byteTextRequiredTomInput = element(by.id('field_byteTextRequiredTom'));
    byteTextMinbytesTomInput = element(by.id('field_byteTextMinbytesTom'));
    byteTextMaxbytesTomInput = element(by.id('field_byteTextMaxbytesTom'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStringTomInput(stringTom) {
        await this.stringTomInput.sendKeys(stringTom);
    }

    async getStringTomInput() {
        return this.stringTomInput.getAttribute('value');
    }

    async setStringRequiredTomInput(stringRequiredTom) {
        await this.stringRequiredTomInput.sendKeys(stringRequiredTom);
    }

    async getStringRequiredTomInput() {
        return this.stringRequiredTomInput.getAttribute('value');
    }

    async setStringMinlengthTomInput(stringMinlengthTom) {
        await this.stringMinlengthTomInput.sendKeys(stringMinlengthTom);
    }

    async getStringMinlengthTomInput() {
        return this.stringMinlengthTomInput.getAttribute('value');
    }

    async setStringMaxlengthTomInput(stringMaxlengthTom) {
        await this.stringMaxlengthTomInput.sendKeys(stringMaxlengthTom);
    }

    async getStringMaxlengthTomInput() {
        return this.stringMaxlengthTomInput.getAttribute('value');
    }

    async setStringPatternTomInput(stringPatternTom) {
        await this.stringPatternTomInput.sendKeys(stringPatternTom);
    }

    async getStringPatternTomInput() {
        return this.stringPatternTomInput.getAttribute('value');
    }

    async setIntegerTomInput(integerTom) {
        await this.integerTomInput.sendKeys(integerTom);
    }

    async getIntegerTomInput() {
        return this.integerTomInput.getAttribute('value');
    }

    async setIntegerRequiredTomInput(integerRequiredTom) {
        await this.integerRequiredTomInput.sendKeys(integerRequiredTom);
    }

    async getIntegerRequiredTomInput() {
        return this.integerRequiredTomInput.getAttribute('value');
    }

    async setIntegerMinTomInput(integerMinTom) {
        await this.integerMinTomInput.sendKeys(integerMinTom);
    }

    async getIntegerMinTomInput() {
        return this.integerMinTomInput.getAttribute('value');
    }

    async setIntegerMaxTomInput(integerMaxTom) {
        await this.integerMaxTomInput.sendKeys(integerMaxTom);
    }

    async getIntegerMaxTomInput() {
        return this.integerMaxTomInput.getAttribute('value');
    }

    async setLongTomInput(longTom) {
        await this.longTomInput.sendKeys(longTom);
    }

    async getLongTomInput() {
        return this.longTomInput.getAttribute('value');
    }

    async setLongRequiredTomInput(longRequiredTom) {
        await this.longRequiredTomInput.sendKeys(longRequiredTom);
    }

    async getLongRequiredTomInput() {
        return this.longRequiredTomInput.getAttribute('value');
    }

    async setLongMinTomInput(longMinTom) {
        await this.longMinTomInput.sendKeys(longMinTom);
    }

    async getLongMinTomInput() {
        return this.longMinTomInput.getAttribute('value');
    }

    async setLongMaxTomInput(longMaxTom) {
        await this.longMaxTomInput.sendKeys(longMaxTom);
    }

    async getLongMaxTomInput() {
        return this.longMaxTomInput.getAttribute('value');
    }

    async setFloatTomInput(floatTom) {
        await this.floatTomInput.sendKeys(floatTom);
    }

    async getFloatTomInput() {
        return this.floatTomInput.getAttribute('value');
    }

    async setFloatRequiredTomInput(floatRequiredTom) {
        await this.floatRequiredTomInput.sendKeys(floatRequiredTom);
    }

    async getFloatRequiredTomInput() {
        return this.floatRequiredTomInput.getAttribute('value');
    }

    async setFloatMinTomInput(floatMinTom) {
        await this.floatMinTomInput.sendKeys(floatMinTom);
    }

    async getFloatMinTomInput() {
        return this.floatMinTomInput.getAttribute('value');
    }

    async setFloatMaxTomInput(floatMaxTom) {
        await this.floatMaxTomInput.sendKeys(floatMaxTom);
    }

    async getFloatMaxTomInput() {
        return this.floatMaxTomInput.getAttribute('value');
    }

    async setDoubleRequiredTomInput(doubleRequiredTom) {
        await this.doubleRequiredTomInput.sendKeys(doubleRequiredTom);
    }

    async getDoubleRequiredTomInput() {
        return this.doubleRequiredTomInput.getAttribute('value');
    }

    async setDoubleMinTomInput(doubleMinTom) {
        await this.doubleMinTomInput.sendKeys(doubleMinTom);
    }

    async getDoubleMinTomInput() {
        return this.doubleMinTomInput.getAttribute('value');
    }

    async setDoubleMaxTomInput(doubleMaxTom) {
        await this.doubleMaxTomInput.sendKeys(doubleMaxTom);
    }

    async getDoubleMaxTomInput() {
        return this.doubleMaxTomInput.getAttribute('value');
    }

    async setBigDecimalRequiredTomInput(bigDecimalRequiredTom) {
        await this.bigDecimalRequiredTomInput.sendKeys(bigDecimalRequiredTom);
    }

    async getBigDecimalRequiredTomInput() {
        return this.bigDecimalRequiredTomInput.getAttribute('value');
    }

    async setBigDecimalMinTomInput(bigDecimalMinTom) {
        await this.bigDecimalMinTomInput.sendKeys(bigDecimalMinTom);
    }

    async getBigDecimalMinTomInput() {
        return this.bigDecimalMinTomInput.getAttribute('value');
    }

    async setBigDecimalMaxTomInput(bigDecimalMaxTom) {
        await this.bigDecimalMaxTomInput.sendKeys(bigDecimalMaxTom);
    }

    async getBigDecimalMaxTomInput() {
        return this.bigDecimalMaxTomInput.getAttribute('value');
    }

    async setLocalDateTomInput(localDateTom) {
        await this.localDateTomInput.sendKeys(localDateTom);
    }

    async getLocalDateTomInput() {
        return this.localDateTomInput.getAttribute('value');
    }

    async setLocalDateRequiredTomInput(localDateRequiredTom) {
        await this.localDateRequiredTomInput.sendKeys(localDateRequiredTom);
    }

    async getLocalDateRequiredTomInput() {
        return this.localDateRequiredTomInput.getAttribute('value');
    }

    async setInstantTomInput(instantTom) {
        await this.instantTomInput.sendKeys(instantTom);
    }

    async getInstantTomInput() {
        return this.instantTomInput.getAttribute('value');
    }

    async setInstantRequiredTomInput(instantRequiredTom) {
        await this.instantRequiredTomInput.sendKeys(instantRequiredTom);
    }

    async getInstantRequiredTomInput() {
        return this.instantRequiredTomInput.getAttribute('value');
    }

    async setZonedDateTimeTomInput(zonedDateTimeTom) {
        await this.zonedDateTimeTomInput.sendKeys(zonedDateTimeTom);
    }

    async getZonedDateTimeTomInput() {
        return this.zonedDateTimeTomInput.getAttribute('value');
    }

    async setZonedDateTimeRequiredTomInput(zonedDateTimeRequiredTom) {
        await this.zonedDateTimeRequiredTomInput.sendKeys(zonedDateTimeRequiredTom);
    }

    async getZonedDateTimeRequiredTomInput() {
        return this.zonedDateTimeRequiredTomInput.getAttribute('value');
    }

    getBooleanTomInput() {
        return this.booleanTomInput;
    }
    getBooleanRequiredTomInput() {
        return this.booleanRequiredTomInput;
    }
    async setEnumTomSelect(enumTom) {
        await this.enumTomSelect.sendKeys(enumTom);
    }

    async getEnumTomSelect() {
        return this.enumTomSelect.element(by.css('option:checked')).getText();
    }

    async enumTomSelectLastOption() {
        await this.enumTomSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEnumRequiredTomSelect(enumRequiredTom) {
        await this.enumRequiredTomSelect.sendKeys(enumRequiredTom);
    }

    async getEnumRequiredTomSelect() {
        return this.enumRequiredTomSelect.element(by.css('option:checked')).getText();
    }

    async enumRequiredTomSelectLastOption() {
        await this.enumRequiredTomSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setByteImageTomInput(byteImageTom) {
        await this.byteImageTomInput.sendKeys(byteImageTom);
    }

    async getByteImageTomInput() {
        return this.byteImageTomInput.getAttribute('value');
    }

    async setByteImageRequiredTomInput(byteImageRequiredTom) {
        await this.byteImageRequiredTomInput.sendKeys(byteImageRequiredTom);
    }

    async getByteImageRequiredTomInput() {
        return this.byteImageRequiredTomInput.getAttribute('value');
    }

    async setByteImageMinbytesTomInput(byteImageMinbytesTom) {
        await this.byteImageMinbytesTomInput.sendKeys(byteImageMinbytesTom);
    }

    async getByteImageMinbytesTomInput() {
        return this.byteImageMinbytesTomInput.getAttribute('value');
    }

    async setByteImageMaxbytesTomInput(byteImageMaxbytesTom) {
        await this.byteImageMaxbytesTomInput.sendKeys(byteImageMaxbytesTom);
    }

    async getByteImageMaxbytesTomInput() {
        return this.byteImageMaxbytesTomInput.getAttribute('value');
    }

    async setByteAnyTomInput(byteAnyTom) {
        await this.byteAnyTomInput.sendKeys(byteAnyTom);
    }

    async getByteAnyTomInput() {
        return this.byteAnyTomInput.getAttribute('value');
    }

    async setByteAnyRequiredTomInput(byteAnyRequiredTom) {
        await this.byteAnyRequiredTomInput.sendKeys(byteAnyRequiredTom);
    }

    async getByteAnyRequiredTomInput() {
        return this.byteAnyRequiredTomInput.getAttribute('value');
    }

    async setByteAnyMinbytesTomInput(byteAnyMinbytesTom) {
        await this.byteAnyMinbytesTomInput.sendKeys(byteAnyMinbytesTom);
    }

    async getByteAnyMinbytesTomInput() {
        return this.byteAnyMinbytesTomInput.getAttribute('value');
    }

    async setByteAnyMaxbytesTomInput(byteAnyMaxbytesTom) {
        await this.byteAnyMaxbytesTomInput.sendKeys(byteAnyMaxbytesTom);
    }

    async getByteAnyMaxbytesTomInput() {
        return this.byteAnyMaxbytesTomInput.getAttribute('value');
    }

    async setByteTextTomInput(byteTextTom) {
        await this.byteTextTomInput.sendKeys(byteTextTom);
    }

    async getByteTextTomInput() {
        return this.byteTextTomInput.getAttribute('value');
    }

    async setByteTextRequiredTomInput(byteTextRequiredTom) {
        await this.byteTextRequiredTomInput.sendKeys(byteTextRequiredTom);
    }

    async getByteTextRequiredTomInput() {
        return this.byteTextRequiredTomInput.getAttribute('value');
    }

    async setByteTextMinbytesTomInput(byteTextMinbytesTom) {
        await this.byteTextMinbytesTomInput.sendKeys(byteTextMinbytesTom);
    }

    async getByteTextMinbytesTomInput() {
        return this.byteTextMinbytesTomInput.getAttribute('value');
    }

    async setByteTextMaxbytesTomInput(byteTextMaxbytesTom) {
        await this.byteTextMaxbytesTomInput.sendKeys(byteTextMaxbytesTom);
    }

    async getByteTextMaxbytesTomInput() {
        return this.byteTextMaxbytesTomInput.getAttribute('value');
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

export class FieldTestEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldTestEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldTestEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
