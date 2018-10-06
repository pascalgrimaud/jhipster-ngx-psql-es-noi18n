import { element, by, ElementFinder } from 'protractor';

export class FieldTestMapstructEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-test-mapstruct-entity div table .btn-danger'));
    title = element.all(by.css('jhi-field-test-mapstruct-entity div h2#page-heading span')).first();

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

export class FieldTestMapstructEntityUpdatePage {
    pageTitle = element(by.id('jhi-field-test-mapstruct-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stringEvaInput = element(by.id('field_stringEva'));
    stringRequiredEvaInput = element(by.id('field_stringRequiredEva'));
    stringMinlengthEvaInput = element(by.id('field_stringMinlengthEva'));
    stringMaxlengthEvaInput = element(by.id('field_stringMaxlengthEva'));
    stringPatternEvaInput = element(by.id('field_stringPatternEva'));
    integerEvaInput = element(by.id('field_integerEva'));
    integerRequiredEvaInput = element(by.id('field_integerRequiredEva'));
    integerMinEvaInput = element(by.id('field_integerMinEva'));
    integerMaxEvaInput = element(by.id('field_integerMaxEva'));
    longEvaInput = element(by.id('field_longEva'));
    longRequiredEvaInput = element(by.id('field_longRequiredEva'));
    longMinEvaInput = element(by.id('field_longMinEva'));
    longMaxEvaInput = element(by.id('field_longMaxEva'));
    floatEvaInput = element(by.id('field_floatEva'));
    floatRequiredEvaInput = element(by.id('field_floatRequiredEva'));
    floatMinEvaInput = element(by.id('field_floatMinEva'));
    floatMaxEvaInput = element(by.id('field_floatMaxEva'));
    doubleRequiredEvaInput = element(by.id('field_doubleRequiredEva'));
    doubleMinEvaInput = element(by.id('field_doubleMinEva'));
    doubleMaxEvaInput = element(by.id('field_doubleMaxEva'));
    bigDecimalRequiredEvaInput = element(by.id('field_bigDecimalRequiredEva'));
    bigDecimalMinEvaInput = element(by.id('field_bigDecimalMinEva'));
    bigDecimalMaxEvaInput = element(by.id('field_bigDecimalMaxEva'));
    localDateEvaInput = element(by.id('field_localDateEva'));
    localDateRequiredEvaInput = element(by.id('field_localDateRequiredEva'));
    instantEvaInput = element(by.id('field_instantEva'));
    instanteRequiredEvaInput = element(by.id('field_instanteRequiredEva'));
    zonedDateTimeEvaInput = element(by.id('field_zonedDateTimeEva'));
    zonedDateTimeRequiredEvaInput = element(by.id('field_zonedDateTimeRequiredEva'));
    booleanEvaInput = element(by.id('field_booleanEva'));
    booleanRequiredEvaInput = element(by.id('field_booleanRequiredEva'));
    enumEvaSelect = element(by.id('field_enumEva'));
    enumRequiredEvaSelect = element(by.id('field_enumRequiredEva'));
    byteImageEvaInput = element(by.id('file_byteImageEva'));
    byteImageRequiredEvaInput = element(by.id('file_byteImageRequiredEva'));
    byteImageMinbytesEvaInput = element(by.id('file_byteImageMinbytesEva'));
    byteImageMaxbytesEvaInput = element(by.id('file_byteImageMaxbytesEva'));
    byteAnyEvaInput = element(by.id('file_byteAnyEva'));
    byteAnyRequiredEvaInput = element(by.id('file_byteAnyRequiredEva'));
    byteAnyMinbytesEvaInput = element(by.id('file_byteAnyMinbytesEva'));
    byteAnyMaxbytesEvaInput = element(by.id('file_byteAnyMaxbytesEva'));
    byteTextEvaInput = element(by.id('field_byteTextEva'));
    byteTextRequiredEvaInput = element(by.id('field_byteTextRequiredEva'));
    byteTextMinbytesEvaInput = element(by.id('field_byteTextMinbytesEva'));
    byteTextMaxbytesEvaInput = element(by.id('field_byteTextMaxbytesEva'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStringEvaInput(stringEva) {
        await this.stringEvaInput.sendKeys(stringEva);
    }

    async getStringEvaInput() {
        return this.stringEvaInput.getAttribute('value');
    }

    async setStringRequiredEvaInput(stringRequiredEva) {
        await this.stringRequiredEvaInput.sendKeys(stringRequiredEva);
    }

    async getStringRequiredEvaInput() {
        return this.stringRequiredEvaInput.getAttribute('value');
    }

    async setStringMinlengthEvaInput(stringMinlengthEva) {
        await this.stringMinlengthEvaInput.sendKeys(stringMinlengthEva);
    }

    async getStringMinlengthEvaInput() {
        return this.stringMinlengthEvaInput.getAttribute('value');
    }

    async setStringMaxlengthEvaInput(stringMaxlengthEva) {
        await this.stringMaxlengthEvaInput.sendKeys(stringMaxlengthEva);
    }

    async getStringMaxlengthEvaInput() {
        return this.stringMaxlengthEvaInput.getAttribute('value');
    }

    async setStringPatternEvaInput(stringPatternEva) {
        await this.stringPatternEvaInput.sendKeys(stringPatternEva);
    }

    async getStringPatternEvaInput() {
        return this.stringPatternEvaInput.getAttribute('value');
    }

    async setIntegerEvaInput(integerEva) {
        await this.integerEvaInput.sendKeys(integerEva);
    }

    async getIntegerEvaInput() {
        return this.integerEvaInput.getAttribute('value');
    }

    async setIntegerRequiredEvaInput(integerRequiredEva) {
        await this.integerRequiredEvaInput.sendKeys(integerRequiredEva);
    }

    async getIntegerRequiredEvaInput() {
        return this.integerRequiredEvaInput.getAttribute('value');
    }

    async setIntegerMinEvaInput(integerMinEva) {
        await this.integerMinEvaInput.sendKeys(integerMinEva);
    }

    async getIntegerMinEvaInput() {
        return this.integerMinEvaInput.getAttribute('value');
    }

    async setIntegerMaxEvaInput(integerMaxEva) {
        await this.integerMaxEvaInput.sendKeys(integerMaxEva);
    }

    async getIntegerMaxEvaInput() {
        return this.integerMaxEvaInput.getAttribute('value');
    }

    async setLongEvaInput(longEva) {
        await this.longEvaInput.sendKeys(longEva);
    }

    async getLongEvaInput() {
        return this.longEvaInput.getAttribute('value');
    }

    async setLongRequiredEvaInput(longRequiredEva) {
        await this.longRequiredEvaInput.sendKeys(longRequiredEva);
    }

    async getLongRequiredEvaInput() {
        return this.longRequiredEvaInput.getAttribute('value');
    }

    async setLongMinEvaInput(longMinEva) {
        await this.longMinEvaInput.sendKeys(longMinEva);
    }

    async getLongMinEvaInput() {
        return this.longMinEvaInput.getAttribute('value');
    }

    async setLongMaxEvaInput(longMaxEva) {
        await this.longMaxEvaInput.sendKeys(longMaxEva);
    }

    async getLongMaxEvaInput() {
        return this.longMaxEvaInput.getAttribute('value');
    }

    async setFloatEvaInput(floatEva) {
        await this.floatEvaInput.sendKeys(floatEva);
    }

    async getFloatEvaInput() {
        return this.floatEvaInput.getAttribute('value');
    }

    async setFloatRequiredEvaInput(floatRequiredEva) {
        await this.floatRequiredEvaInput.sendKeys(floatRequiredEva);
    }

    async getFloatRequiredEvaInput() {
        return this.floatRequiredEvaInput.getAttribute('value');
    }

    async setFloatMinEvaInput(floatMinEva) {
        await this.floatMinEvaInput.sendKeys(floatMinEva);
    }

    async getFloatMinEvaInput() {
        return this.floatMinEvaInput.getAttribute('value');
    }

    async setFloatMaxEvaInput(floatMaxEva) {
        await this.floatMaxEvaInput.sendKeys(floatMaxEva);
    }

    async getFloatMaxEvaInput() {
        return this.floatMaxEvaInput.getAttribute('value');
    }

    async setDoubleRequiredEvaInput(doubleRequiredEva) {
        await this.doubleRequiredEvaInput.sendKeys(doubleRequiredEva);
    }

    async getDoubleRequiredEvaInput() {
        return this.doubleRequiredEvaInput.getAttribute('value');
    }

    async setDoubleMinEvaInput(doubleMinEva) {
        await this.doubleMinEvaInput.sendKeys(doubleMinEva);
    }

    async getDoubleMinEvaInput() {
        return this.doubleMinEvaInput.getAttribute('value');
    }

    async setDoubleMaxEvaInput(doubleMaxEva) {
        await this.doubleMaxEvaInput.sendKeys(doubleMaxEva);
    }

    async getDoubleMaxEvaInput() {
        return this.doubleMaxEvaInput.getAttribute('value');
    }

    async setBigDecimalRequiredEvaInput(bigDecimalRequiredEva) {
        await this.bigDecimalRequiredEvaInput.sendKeys(bigDecimalRequiredEva);
    }

    async getBigDecimalRequiredEvaInput() {
        return this.bigDecimalRequiredEvaInput.getAttribute('value');
    }

    async setBigDecimalMinEvaInput(bigDecimalMinEva) {
        await this.bigDecimalMinEvaInput.sendKeys(bigDecimalMinEva);
    }

    async getBigDecimalMinEvaInput() {
        return this.bigDecimalMinEvaInput.getAttribute('value');
    }

    async setBigDecimalMaxEvaInput(bigDecimalMaxEva) {
        await this.bigDecimalMaxEvaInput.sendKeys(bigDecimalMaxEva);
    }

    async getBigDecimalMaxEvaInput() {
        return this.bigDecimalMaxEvaInput.getAttribute('value');
    }

    async setLocalDateEvaInput(localDateEva) {
        await this.localDateEvaInput.sendKeys(localDateEva);
    }

    async getLocalDateEvaInput() {
        return this.localDateEvaInput.getAttribute('value');
    }

    async setLocalDateRequiredEvaInput(localDateRequiredEva) {
        await this.localDateRequiredEvaInput.sendKeys(localDateRequiredEva);
    }

    async getLocalDateRequiredEvaInput() {
        return this.localDateRequiredEvaInput.getAttribute('value');
    }

    async setInstantEvaInput(instantEva) {
        await this.instantEvaInput.sendKeys(instantEva);
    }

    async getInstantEvaInput() {
        return this.instantEvaInput.getAttribute('value');
    }

    async setInstanteRequiredEvaInput(instanteRequiredEva) {
        await this.instanteRequiredEvaInput.sendKeys(instanteRequiredEva);
    }

    async getInstanteRequiredEvaInput() {
        return this.instanteRequiredEvaInput.getAttribute('value');
    }

    async setZonedDateTimeEvaInput(zonedDateTimeEva) {
        await this.zonedDateTimeEvaInput.sendKeys(zonedDateTimeEva);
    }

    async getZonedDateTimeEvaInput() {
        return this.zonedDateTimeEvaInput.getAttribute('value');
    }

    async setZonedDateTimeRequiredEvaInput(zonedDateTimeRequiredEva) {
        await this.zonedDateTimeRequiredEvaInput.sendKeys(zonedDateTimeRequiredEva);
    }

    async getZonedDateTimeRequiredEvaInput() {
        return this.zonedDateTimeRequiredEvaInput.getAttribute('value');
    }

    getBooleanEvaInput() {
        return this.booleanEvaInput;
    }
    getBooleanRequiredEvaInput() {
        return this.booleanRequiredEvaInput;
    }
    async setEnumEvaSelect(enumEva) {
        await this.enumEvaSelect.sendKeys(enumEva);
    }

    async getEnumEvaSelect() {
        return this.enumEvaSelect.element(by.css('option:checked')).getText();
    }

    async enumEvaSelectLastOption() {
        await this.enumEvaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEnumRequiredEvaSelect(enumRequiredEva) {
        await this.enumRequiredEvaSelect.sendKeys(enumRequiredEva);
    }

    async getEnumRequiredEvaSelect() {
        return this.enumRequiredEvaSelect.element(by.css('option:checked')).getText();
    }

    async enumRequiredEvaSelectLastOption() {
        await this.enumRequiredEvaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setByteImageEvaInput(byteImageEva) {
        await this.byteImageEvaInput.sendKeys(byteImageEva);
    }

    async getByteImageEvaInput() {
        return this.byteImageEvaInput.getAttribute('value');
    }

    async setByteImageRequiredEvaInput(byteImageRequiredEva) {
        await this.byteImageRequiredEvaInput.sendKeys(byteImageRequiredEva);
    }

    async getByteImageRequiredEvaInput() {
        return this.byteImageRequiredEvaInput.getAttribute('value');
    }

    async setByteImageMinbytesEvaInput(byteImageMinbytesEva) {
        await this.byteImageMinbytesEvaInput.sendKeys(byteImageMinbytesEva);
    }

    async getByteImageMinbytesEvaInput() {
        return this.byteImageMinbytesEvaInput.getAttribute('value');
    }

    async setByteImageMaxbytesEvaInput(byteImageMaxbytesEva) {
        await this.byteImageMaxbytesEvaInput.sendKeys(byteImageMaxbytesEva);
    }

    async getByteImageMaxbytesEvaInput() {
        return this.byteImageMaxbytesEvaInput.getAttribute('value');
    }

    async setByteAnyEvaInput(byteAnyEva) {
        await this.byteAnyEvaInput.sendKeys(byteAnyEva);
    }

    async getByteAnyEvaInput() {
        return this.byteAnyEvaInput.getAttribute('value');
    }

    async setByteAnyRequiredEvaInput(byteAnyRequiredEva) {
        await this.byteAnyRequiredEvaInput.sendKeys(byteAnyRequiredEva);
    }

    async getByteAnyRequiredEvaInput() {
        return this.byteAnyRequiredEvaInput.getAttribute('value');
    }

    async setByteAnyMinbytesEvaInput(byteAnyMinbytesEva) {
        await this.byteAnyMinbytesEvaInput.sendKeys(byteAnyMinbytesEva);
    }

    async getByteAnyMinbytesEvaInput() {
        return this.byteAnyMinbytesEvaInput.getAttribute('value');
    }

    async setByteAnyMaxbytesEvaInput(byteAnyMaxbytesEva) {
        await this.byteAnyMaxbytesEvaInput.sendKeys(byteAnyMaxbytesEva);
    }

    async getByteAnyMaxbytesEvaInput() {
        return this.byteAnyMaxbytesEvaInput.getAttribute('value');
    }

    async setByteTextEvaInput(byteTextEva) {
        await this.byteTextEvaInput.sendKeys(byteTextEva);
    }

    async getByteTextEvaInput() {
        return this.byteTextEvaInput.getAttribute('value');
    }

    async setByteTextRequiredEvaInput(byteTextRequiredEva) {
        await this.byteTextRequiredEvaInput.sendKeys(byteTextRequiredEva);
    }

    async getByteTextRequiredEvaInput() {
        return this.byteTextRequiredEvaInput.getAttribute('value');
    }

    async setByteTextMinbytesEvaInput(byteTextMinbytesEva) {
        await this.byteTextMinbytesEvaInput.sendKeys(byteTextMinbytesEva);
    }

    async getByteTextMinbytesEvaInput() {
        return this.byteTextMinbytesEvaInput.getAttribute('value');
    }

    async setByteTextMaxbytesEvaInput(byteTextMaxbytesEva) {
        await this.byteTextMaxbytesEvaInput.sendKeys(byteTextMaxbytesEva);
    }

    async getByteTextMaxbytesEvaInput() {
        return this.byteTextMaxbytesEvaInput.getAttribute('value');
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

export class FieldTestMapstructEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldTestMapstructEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldTestMapstructEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
