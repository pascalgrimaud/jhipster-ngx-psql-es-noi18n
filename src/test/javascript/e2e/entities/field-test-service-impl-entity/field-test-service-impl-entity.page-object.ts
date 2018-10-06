import { element, by, ElementFinder } from 'protractor';

export class FieldTestServiceImplEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-test-service-impl-entity div table .btn-danger'));
    title = element.all(by.css('jhi-field-test-service-impl-entity div h2#page-heading span')).first();

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

export class FieldTestServiceImplEntityUpdatePage {
    pageTitle = element(by.id('jhi-field-test-service-impl-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stringMikaInput = element(by.id('field_stringMika'));
    stringRequiredMikaInput = element(by.id('field_stringRequiredMika'));
    stringMinlengthMikaInput = element(by.id('field_stringMinlengthMika'));
    stringMaxlengthMikaInput = element(by.id('field_stringMaxlengthMika'));
    stringPatternMikaInput = element(by.id('field_stringPatternMika'));
    integerMikaInput = element(by.id('field_integerMika'));
    integerRequiredMikaInput = element(by.id('field_integerRequiredMika'));
    integerMinMikaInput = element(by.id('field_integerMinMika'));
    integerMaxMikaInput = element(by.id('field_integerMaxMika'));
    longMikaInput = element(by.id('field_longMika'));
    longRequiredMikaInput = element(by.id('field_longRequiredMika'));
    longMinMikaInput = element(by.id('field_longMinMika'));
    longMaxMikaInput = element(by.id('field_longMaxMika'));
    floatMikaInput = element(by.id('field_floatMika'));
    floatRequiredMikaInput = element(by.id('field_floatRequiredMika'));
    floatMinMikaInput = element(by.id('field_floatMinMika'));
    floatMaxMikaInput = element(by.id('field_floatMaxMika'));
    doubleRequiredMikaInput = element(by.id('field_doubleRequiredMika'));
    doubleMinMikaInput = element(by.id('field_doubleMinMika'));
    doubleMaxMikaInput = element(by.id('field_doubleMaxMika'));
    bigDecimalRequiredMikaInput = element(by.id('field_bigDecimalRequiredMika'));
    bigDecimalMinMikaInput = element(by.id('field_bigDecimalMinMika'));
    bigDecimalMaxMikaInput = element(by.id('field_bigDecimalMaxMika'));
    localDateMikaInput = element(by.id('field_localDateMika'));
    localDateRequiredMikaInput = element(by.id('field_localDateRequiredMika'));
    instantMikaInput = element(by.id('field_instantMika'));
    instanteRequiredMikaInput = element(by.id('field_instanteRequiredMika'));
    zonedDateTimeMikaInput = element(by.id('field_zonedDateTimeMika'));
    zonedDateTimeRequiredMikaInput = element(by.id('field_zonedDateTimeRequiredMika'));
    booleanMikaInput = element(by.id('field_booleanMika'));
    booleanRequiredMikaInput = element(by.id('field_booleanRequiredMika'));
    enumMikaSelect = element(by.id('field_enumMika'));
    enumRequiredMikaSelect = element(by.id('field_enumRequiredMika'));
    byteImageMikaInput = element(by.id('file_byteImageMika'));
    byteImageRequiredMikaInput = element(by.id('file_byteImageRequiredMika'));
    byteImageMinbytesMikaInput = element(by.id('file_byteImageMinbytesMika'));
    byteImageMaxbytesMikaInput = element(by.id('file_byteImageMaxbytesMika'));
    byteAnyMikaInput = element(by.id('file_byteAnyMika'));
    byteAnyRequiredMikaInput = element(by.id('file_byteAnyRequiredMika'));
    byteAnyMinbytesMikaInput = element(by.id('file_byteAnyMinbytesMika'));
    byteAnyMaxbytesMikaInput = element(by.id('file_byteAnyMaxbytesMika'));
    byteTextMikaInput = element(by.id('field_byteTextMika'));
    byteTextRequiredMikaInput = element(by.id('field_byteTextRequiredMika'));
    byteTextMinbytesMikaInput = element(by.id('field_byteTextMinbytesMika'));
    byteTextMaxbytesMikaInput = element(by.id('field_byteTextMaxbytesMika'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStringMikaInput(stringMika) {
        await this.stringMikaInput.sendKeys(stringMika);
    }

    async getStringMikaInput() {
        return this.stringMikaInput.getAttribute('value');
    }

    async setStringRequiredMikaInput(stringRequiredMika) {
        await this.stringRequiredMikaInput.sendKeys(stringRequiredMika);
    }

    async getStringRequiredMikaInput() {
        return this.stringRequiredMikaInput.getAttribute('value');
    }

    async setStringMinlengthMikaInput(stringMinlengthMika) {
        await this.stringMinlengthMikaInput.sendKeys(stringMinlengthMika);
    }

    async getStringMinlengthMikaInput() {
        return this.stringMinlengthMikaInput.getAttribute('value');
    }

    async setStringMaxlengthMikaInput(stringMaxlengthMika) {
        await this.stringMaxlengthMikaInput.sendKeys(stringMaxlengthMika);
    }

    async getStringMaxlengthMikaInput() {
        return this.stringMaxlengthMikaInput.getAttribute('value');
    }

    async setStringPatternMikaInput(stringPatternMika) {
        await this.stringPatternMikaInput.sendKeys(stringPatternMika);
    }

    async getStringPatternMikaInput() {
        return this.stringPatternMikaInput.getAttribute('value');
    }

    async setIntegerMikaInput(integerMika) {
        await this.integerMikaInput.sendKeys(integerMika);
    }

    async getIntegerMikaInput() {
        return this.integerMikaInput.getAttribute('value');
    }

    async setIntegerRequiredMikaInput(integerRequiredMika) {
        await this.integerRequiredMikaInput.sendKeys(integerRequiredMika);
    }

    async getIntegerRequiredMikaInput() {
        return this.integerRequiredMikaInput.getAttribute('value');
    }

    async setIntegerMinMikaInput(integerMinMika) {
        await this.integerMinMikaInput.sendKeys(integerMinMika);
    }

    async getIntegerMinMikaInput() {
        return this.integerMinMikaInput.getAttribute('value');
    }

    async setIntegerMaxMikaInput(integerMaxMika) {
        await this.integerMaxMikaInput.sendKeys(integerMaxMika);
    }

    async getIntegerMaxMikaInput() {
        return this.integerMaxMikaInput.getAttribute('value');
    }

    async setLongMikaInput(longMika) {
        await this.longMikaInput.sendKeys(longMika);
    }

    async getLongMikaInput() {
        return this.longMikaInput.getAttribute('value');
    }

    async setLongRequiredMikaInput(longRequiredMika) {
        await this.longRequiredMikaInput.sendKeys(longRequiredMika);
    }

    async getLongRequiredMikaInput() {
        return this.longRequiredMikaInput.getAttribute('value');
    }

    async setLongMinMikaInput(longMinMika) {
        await this.longMinMikaInput.sendKeys(longMinMika);
    }

    async getLongMinMikaInput() {
        return this.longMinMikaInput.getAttribute('value');
    }

    async setLongMaxMikaInput(longMaxMika) {
        await this.longMaxMikaInput.sendKeys(longMaxMika);
    }

    async getLongMaxMikaInput() {
        return this.longMaxMikaInput.getAttribute('value');
    }

    async setFloatMikaInput(floatMika) {
        await this.floatMikaInput.sendKeys(floatMika);
    }

    async getFloatMikaInput() {
        return this.floatMikaInput.getAttribute('value');
    }

    async setFloatRequiredMikaInput(floatRequiredMika) {
        await this.floatRequiredMikaInput.sendKeys(floatRequiredMika);
    }

    async getFloatRequiredMikaInput() {
        return this.floatRequiredMikaInput.getAttribute('value');
    }

    async setFloatMinMikaInput(floatMinMika) {
        await this.floatMinMikaInput.sendKeys(floatMinMika);
    }

    async getFloatMinMikaInput() {
        return this.floatMinMikaInput.getAttribute('value');
    }

    async setFloatMaxMikaInput(floatMaxMika) {
        await this.floatMaxMikaInput.sendKeys(floatMaxMika);
    }

    async getFloatMaxMikaInput() {
        return this.floatMaxMikaInput.getAttribute('value');
    }

    async setDoubleRequiredMikaInput(doubleRequiredMika) {
        await this.doubleRequiredMikaInput.sendKeys(doubleRequiredMika);
    }

    async getDoubleRequiredMikaInput() {
        return this.doubleRequiredMikaInput.getAttribute('value');
    }

    async setDoubleMinMikaInput(doubleMinMika) {
        await this.doubleMinMikaInput.sendKeys(doubleMinMika);
    }

    async getDoubleMinMikaInput() {
        return this.doubleMinMikaInput.getAttribute('value');
    }

    async setDoubleMaxMikaInput(doubleMaxMika) {
        await this.doubleMaxMikaInput.sendKeys(doubleMaxMika);
    }

    async getDoubleMaxMikaInput() {
        return this.doubleMaxMikaInput.getAttribute('value');
    }

    async setBigDecimalRequiredMikaInput(bigDecimalRequiredMika) {
        await this.bigDecimalRequiredMikaInput.sendKeys(bigDecimalRequiredMika);
    }

    async getBigDecimalRequiredMikaInput() {
        return this.bigDecimalRequiredMikaInput.getAttribute('value');
    }

    async setBigDecimalMinMikaInput(bigDecimalMinMika) {
        await this.bigDecimalMinMikaInput.sendKeys(bigDecimalMinMika);
    }

    async getBigDecimalMinMikaInput() {
        return this.bigDecimalMinMikaInput.getAttribute('value');
    }

    async setBigDecimalMaxMikaInput(bigDecimalMaxMika) {
        await this.bigDecimalMaxMikaInput.sendKeys(bigDecimalMaxMika);
    }

    async getBigDecimalMaxMikaInput() {
        return this.bigDecimalMaxMikaInput.getAttribute('value');
    }

    async setLocalDateMikaInput(localDateMika) {
        await this.localDateMikaInput.sendKeys(localDateMika);
    }

    async getLocalDateMikaInput() {
        return this.localDateMikaInput.getAttribute('value');
    }

    async setLocalDateRequiredMikaInput(localDateRequiredMika) {
        await this.localDateRequiredMikaInput.sendKeys(localDateRequiredMika);
    }

    async getLocalDateRequiredMikaInput() {
        return this.localDateRequiredMikaInput.getAttribute('value');
    }

    async setInstantMikaInput(instantMika) {
        await this.instantMikaInput.sendKeys(instantMika);
    }

    async getInstantMikaInput() {
        return this.instantMikaInput.getAttribute('value');
    }

    async setInstanteRequiredMikaInput(instanteRequiredMika) {
        await this.instanteRequiredMikaInput.sendKeys(instanteRequiredMika);
    }

    async getInstanteRequiredMikaInput() {
        return this.instanteRequiredMikaInput.getAttribute('value');
    }

    async setZonedDateTimeMikaInput(zonedDateTimeMika) {
        await this.zonedDateTimeMikaInput.sendKeys(zonedDateTimeMika);
    }

    async getZonedDateTimeMikaInput() {
        return this.zonedDateTimeMikaInput.getAttribute('value');
    }

    async setZonedDateTimeRequiredMikaInput(zonedDateTimeRequiredMika) {
        await this.zonedDateTimeRequiredMikaInput.sendKeys(zonedDateTimeRequiredMika);
    }

    async getZonedDateTimeRequiredMikaInput() {
        return this.zonedDateTimeRequiredMikaInput.getAttribute('value');
    }

    getBooleanMikaInput() {
        return this.booleanMikaInput;
    }
    getBooleanRequiredMikaInput() {
        return this.booleanRequiredMikaInput;
    }
    async setEnumMikaSelect(enumMika) {
        await this.enumMikaSelect.sendKeys(enumMika);
    }

    async getEnumMikaSelect() {
        return this.enumMikaSelect.element(by.css('option:checked')).getText();
    }

    async enumMikaSelectLastOption() {
        await this.enumMikaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEnumRequiredMikaSelect(enumRequiredMika) {
        await this.enumRequiredMikaSelect.sendKeys(enumRequiredMika);
    }

    async getEnumRequiredMikaSelect() {
        return this.enumRequiredMikaSelect.element(by.css('option:checked')).getText();
    }

    async enumRequiredMikaSelectLastOption() {
        await this.enumRequiredMikaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setByteImageMikaInput(byteImageMika) {
        await this.byteImageMikaInput.sendKeys(byteImageMika);
    }

    async getByteImageMikaInput() {
        return this.byteImageMikaInput.getAttribute('value');
    }

    async setByteImageRequiredMikaInput(byteImageRequiredMika) {
        await this.byteImageRequiredMikaInput.sendKeys(byteImageRequiredMika);
    }

    async getByteImageRequiredMikaInput() {
        return this.byteImageRequiredMikaInput.getAttribute('value');
    }

    async setByteImageMinbytesMikaInput(byteImageMinbytesMika) {
        await this.byteImageMinbytesMikaInput.sendKeys(byteImageMinbytesMika);
    }

    async getByteImageMinbytesMikaInput() {
        return this.byteImageMinbytesMikaInput.getAttribute('value');
    }

    async setByteImageMaxbytesMikaInput(byteImageMaxbytesMika) {
        await this.byteImageMaxbytesMikaInput.sendKeys(byteImageMaxbytesMika);
    }

    async getByteImageMaxbytesMikaInput() {
        return this.byteImageMaxbytesMikaInput.getAttribute('value');
    }

    async setByteAnyMikaInput(byteAnyMika) {
        await this.byteAnyMikaInput.sendKeys(byteAnyMika);
    }

    async getByteAnyMikaInput() {
        return this.byteAnyMikaInput.getAttribute('value');
    }

    async setByteAnyRequiredMikaInput(byteAnyRequiredMika) {
        await this.byteAnyRequiredMikaInput.sendKeys(byteAnyRequiredMika);
    }

    async getByteAnyRequiredMikaInput() {
        return this.byteAnyRequiredMikaInput.getAttribute('value');
    }

    async setByteAnyMinbytesMikaInput(byteAnyMinbytesMika) {
        await this.byteAnyMinbytesMikaInput.sendKeys(byteAnyMinbytesMika);
    }

    async getByteAnyMinbytesMikaInput() {
        return this.byteAnyMinbytesMikaInput.getAttribute('value');
    }

    async setByteAnyMaxbytesMikaInput(byteAnyMaxbytesMika) {
        await this.byteAnyMaxbytesMikaInput.sendKeys(byteAnyMaxbytesMika);
    }

    async getByteAnyMaxbytesMikaInput() {
        return this.byteAnyMaxbytesMikaInput.getAttribute('value');
    }

    async setByteTextMikaInput(byteTextMika) {
        await this.byteTextMikaInput.sendKeys(byteTextMika);
    }

    async getByteTextMikaInput() {
        return this.byteTextMikaInput.getAttribute('value');
    }

    async setByteTextRequiredMikaInput(byteTextRequiredMika) {
        await this.byteTextRequiredMikaInput.sendKeys(byteTextRequiredMika);
    }

    async getByteTextRequiredMikaInput() {
        return this.byteTextRequiredMikaInput.getAttribute('value');
    }

    async setByteTextMinbytesMikaInput(byteTextMinbytesMika) {
        await this.byteTextMinbytesMikaInput.sendKeys(byteTextMinbytesMika);
    }

    async getByteTextMinbytesMikaInput() {
        return this.byteTextMinbytesMikaInput.getAttribute('value');
    }

    async setByteTextMaxbytesMikaInput(byteTextMaxbytesMika) {
        await this.byteTextMaxbytesMikaInput.sendKeys(byteTextMaxbytesMika);
    }

    async getByteTextMaxbytesMikaInput() {
        return this.byteTextMaxbytesMikaInput.getAttribute('value');
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

export class FieldTestServiceImplEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldTestServiceImplEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldTestServiceImplEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
