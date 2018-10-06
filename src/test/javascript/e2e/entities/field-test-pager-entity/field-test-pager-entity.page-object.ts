import { element, by, ElementFinder } from 'protractor';

export class FieldTestPagerEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-test-pager-entity div table .btn-danger'));
    title = element.all(by.css('jhi-field-test-pager-entity div h2#page-heading span')).first();

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

export class FieldTestPagerEntityUpdatePage {
    pageTitle = element(by.id('jhi-field-test-pager-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stringJadeInput = element(by.id('field_stringJade'));
    stringRequiredJadeInput = element(by.id('field_stringRequiredJade'));
    stringMinlengthJadeInput = element(by.id('field_stringMinlengthJade'));
    stringMaxlengthJadeInput = element(by.id('field_stringMaxlengthJade'));
    stringPatternJadeInput = element(by.id('field_stringPatternJade'));
    integerJadeInput = element(by.id('field_integerJade'));
    integerRequiredJadeInput = element(by.id('field_integerRequiredJade'));
    integerMinJadeInput = element(by.id('field_integerMinJade'));
    integerMaxJadeInput = element(by.id('field_integerMaxJade'));
    longJadeInput = element(by.id('field_longJade'));
    longRequiredJadeInput = element(by.id('field_longRequiredJade'));
    longMinJadeInput = element(by.id('field_longMinJade'));
    longMaxJadeInput = element(by.id('field_longMaxJade'));
    floatJadeInput = element(by.id('field_floatJade'));
    floatRequiredJadeInput = element(by.id('field_floatRequiredJade'));
    floatMinJadeInput = element(by.id('field_floatMinJade'));
    floatMaxJadeInput = element(by.id('field_floatMaxJade'));
    doubleRequiredJadeInput = element(by.id('field_doubleRequiredJade'));
    doubleMinJadeInput = element(by.id('field_doubleMinJade'));
    doubleMaxJadeInput = element(by.id('field_doubleMaxJade'));
    bigDecimalRequiredJadeInput = element(by.id('field_bigDecimalRequiredJade'));
    bigDecimalMinJadeInput = element(by.id('field_bigDecimalMinJade'));
    bigDecimalMaxJadeInput = element(by.id('field_bigDecimalMaxJade'));
    localDateJadeInput = element(by.id('field_localDateJade'));
    localDateRequiredJadeInput = element(by.id('field_localDateRequiredJade'));
    instantJadeInput = element(by.id('field_instantJade'));
    instanteRequiredJadeInput = element(by.id('field_instanteRequiredJade'));
    zonedDateTimeJadeInput = element(by.id('field_zonedDateTimeJade'));
    zonedDateTimeRequiredJadeInput = element(by.id('field_zonedDateTimeRequiredJade'));
    booleanJadeInput = element(by.id('field_booleanJade'));
    booleanRequiredJadeInput = element(by.id('field_booleanRequiredJade'));
    enumJadeSelect = element(by.id('field_enumJade'));
    enumRequiredJadeSelect = element(by.id('field_enumRequiredJade'));
    byteImageJadeInput = element(by.id('file_byteImageJade'));
    byteImageRequiredJadeInput = element(by.id('file_byteImageRequiredJade'));
    byteImageMinbytesJadeInput = element(by.id('file_byteImageMinbytesJade'));
    byteImageMaxbytesJadeInput = element(by.id('file_byteImageMaxbytesJade'));
    byteAnyJadeInput = element(by.id('file_byteAnyJade'));
    byteAnyRequiredJadeInput = element(by.id('file_byteAnyRequiredJade'));
    byteAnyMinbytesJadeInput = element(by.id('file_byteAnyMinbytesJade'));
    byteAnyMaxbytesJadeInput = element(by.id('file_byteAnyMaxbytesJade'));
    byteTextJadeInput = element(by.id('field_byteTextJade'));
    byteTextRequiredJadeInput = element(by.id('field_byteTextRequiredJade'));
    byteTextMinbytesJadeInput = element(by.id('field_byteTextMinbytesJade'));
    byteTextMaxbytesJadeInput = element(by.id('field_byteTextMaxbytesJade'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStringJadeInput(stringJade) {
        await this.stringJadeInput.sendKeys(stringJade);
    }

    async getStringJadeInput() {
        return this.stringJadeInput.getAttribute('value');
    }

    async setStringRequiredJadeInput(stringRequiredJade) {
        await this.stringRequiredJadeInput.sendKeys(stringRequiredJade);
    }

    async getStringRequiredJadeInput() {
        return this.stringRequiredJadeInput.getAttribute('value');
    }

    async setStringMinlengthJadeInput(stringMinlengthJade) {
        await this.stringMinlengthJadeInput.sendKeys(stringMinlengthJade);
    }

    async getStringMinlengthJadeInput() {
        return this.stringMinlengthJadeInput.getAttribute('value');
    }

    async setStringMaxlengthJadeInput(stringMaxlengthJade) {
        await this.stringMaxlengthJadeInput.sendKeys(stringMaxlengthJade);
    }

    async getStringMaxlengthJadeInput() {
        return this.stringMaxlengthJadeInput.getAttribute('value');
    }

    async setStringPatternJadeInput(stringPatternJade) {
        await this.stringPatternJadeInput.sendKeys(stringPatternJade);
    }

    async getStringPatternJadeInput() {
        return this.stringPatternJadeInput.getAttribute('value');
    }

    async setIntegerJadeInput(integerJade) {
        await this.integerJadeInput.sendKeys(integerJade);
    }

    async getIntegerJadeInput() {
        return this.integerJadeInput.getAttribute('value');
    }

    async setIntegerRequiredJadeInput(integerRequiredJade) {
        await this.integerRequiredJadeInput.sendKeys(integerRequiredJade);
    }

    async getIntegerRequiredJadeInput() {
        return this.integerRequiredJadeInput.getAttribute('value');
    }

    async setIntegerMinJadeInput(integerMinJade) {
        await this.integerMinJadeInput.sendKeys(integerMinJade);
    }

    async getIntegerMinJadeInput() {
        return this.integerMinJadeInput.getAttribute('value');
    }

    async setIntegerMaxJadeInput(integerMaxJade) {
        await this.integerMaxJadeInput.sendKeys(integerMaxJade);
    }

    async getIntegerMaxJadeInput() {
        return this.integerMaxJadeInput.getAttribute('value');
    }

    async setLongJadeInput(longJade) {
        await this.longJadeInput.sendKeys(longJade);
    }

    async getLongJadeInput() {
        return this.longJadeInput.getAttribute('value');
    }

    async setLongRequiredJadeInput(longRequiredJade) {
        await this.longRequiredJadeInput.sendKeys(longRequiredJade);
    }

    async getLongRequiredJadeInput() {
        return this.longRequiredJadeInput.getAttribute('value');
    }

    async setLongMinJadeInput(longMinJade) {
        await this.longMinJadeInput.sendKeys(longMinJade);
    }

    async getLongMinJadeInput() {
        return this.longMinJadeInput.getAttribute('value');
    }

    async setLongMaxJadeInput(longMaxJade) {
        await this.longMaxJadeInput.sendKeys(longMaxJade);
    }

    async getLongMaxJadeInput() {
        return this.longMaxJadeInput.getAttribute('value');
    }

    async setFloatJadeInput(floatJade) {
        await this.floatJadeInput.sendKeys(floatJade);
    }

    async getFloatJadeInput() {
        return this.floatJadeInput.getAttribute('value');
    }

    async setFloatRequiredJadeInput(floatRequiredJade) {
        await this.floatRequiredJadeInput.sendKeys(floatRequiredJade);
    }

    async getFloatRequiredJadeInput() {
        return this.floatRequiredJadeInput.getAttribute('value');
    }

    async setFloatMinJadeInput(floatMinJade) {
        await this.floatMinJadeInput.sendKeys(floatMinJade);
    }

    async getFloatMinJadeInput() {
        return this.floatMinJadeInput.getAttribute('value');
    }

    async setFloatMaxJadeInput(floatMaxJade) {
        await this.floatMaxJadeInput.sendKeys(floatMaxJade);
    }

    async getFloatMaxJadeInput() {
        return this.floatMaxJadeInput.getAttribute('value');
    }

    async setDoubleRequiredJadeInput(doubleRequiredJade) {
        await this.doubleRequiredJadeInput.sendKeys(doubleRequiredJade);
    }

    async getDoubleRequiredJadeInput() {
        return this.doubleRequiredJadeInput.getAttribute('value');
    }

    async setDoubleMinJadeInput(doubleMinJade) {
        await this.doubleMinJadeInput.sendKeys(doubleMinJade);
    }

    async getDoubleMinJadeInput() {
        return this.doubleMinJadeInput.getAttribute('value');
    }

    async setDoubleMaxJadeInput(doubleMaxJade) {
        await this.doubleMaxJadeInput.sendKeys(doubleMaxJade);
    }

    async getDoubleMaxJadeInput() {
        return this.doubleMaxJadeInput.getAttribute('value');
    }

    async setBigDecimalRequiredJadeInput(bigDecimalRequiredJade) {
        await this.bigDecimalRequiredJadeInput.sendKeys(bigDecimalRequiredJade);
    }

    async getBigDecimalRequiredJadeInput() {
        return this.bigDecimalRequiredJadeInput.getAttribute('value');
    }

    async setBigDecimalMinJadeInput(bigDecimalMinJade) {
        await this.bigDecimalMinJadeInput.sendKeys(bigDecimalMinJade);
    }

    async getBigDecimalMinJadeInput() {
        return this.bigDecimalMinJadeInput.getAttribute('value');
    }

    async setBigDecimalMaxJadeInput(bigDecimalMaxJade) {
        await this.bigDecimalMaxJadeInput.sendKeys(bigDecimalMaxJade);
    }

    async getBigDecimalMaxJadeInput() {
        return this.bigDecimalMaxJadeInput.getAttribute('value');
    }

    async setLocalDateJadeInput(localDateJade) {
        await this.localDateJadeInput.sendKeys(localDateJade);
    }

    async getLocalDateJadeInput() {
        return this.localDateJadeInput.getAttribute('value');
    }

    async setLocalDateRequiredJadeInput(localDateRequiredJade) {
        await this.localDateRequiredJadeInput.sendKeys(localDateRequiredJade);
    }

    async getLocalDateRequiredJadeInput() {
        return this.localDateRequiredJadeInput.getAttribute('value');
    }

    async setInstantJadeInput(instantJade) {
        await this.instantJadeInput.sendKeys(instantJade);
    }

    async getInstantJadeInput() {
        return this.instantJadeInput.getAttribute('value');
    }

    async setInstanteRequiredJadeInput(instanteRequiredJade) {
        await this.instanteRequiredJadeInput.sendKeys(instanteRequiredJade);
    }

    async getInstanteRequiredJadeInput() {
        return this.instanteRequiredJadeInput.getAttribute('value');
    }

    async setZonedDateTimeJadeInput(zonedDateTimeJade) {
        await this.zonedDateTimeJadeInput.sendKeys(zonedDateTimeJade);
    }

    async getZonedDateTimeJadeInput() {
        return this.zonedDateTimeJadeInput.getAttribute('value');
    }

    async setZonedDateTimeRequiredJadeInput(zonedDateTimeRequiredJade) {
        await this.zonedDateTimeRequiredJadeInput.sendKeys(zonedDateTimeRequiredJade);
    }

    async getZonedDateTimeRequiredJadeInput() {
        return this.zonedDateTimeRequiredJadeInput.getAttribute('value');
    }

    getBooleanJadeInput() {
        return this.booleanJadeInput;
    }
    getBooleanRequiredJadeInput() {
        return this.booleanRequiredJadeInput;
    }
    async setEnumJadeSelect(enumJade) {
        await this.enumJadeSelect.sendKeys(enumJade);
    }

    async getEnumJadeSelect() {
        return this.enumJadeSelect.element(by.css('option:checked')).getText();
    }

    async enumJadeSelectLastOption() {
        await this.enumJadeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEnumRequiredJadeSelect(enumRequiredJade) {
        await this.enumRequiredJadeSelect.sendKeys(enumRequiredJade);
    }

    async getEnumRequiredJadeSelect() {
        return this.enumRequiredJadeSelect.element(by.css('option:checked')).getText();
    }

    async enumRequiredJadeSelectLastOption() {
        await this.enumRequiredJadeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setByteImageJadeInput(byteImageJade) {
        await this.byteImageJadeInput.sendKeys(byteImageJade);
    }

    async getByteImageJadeInput() {
        return this.byteImageJadeInput.getAttribute('value');
    }

    async setByteImageRequiredJadeInput(byteImageRequiredJade) {
        await this.byteImageRequiredJadeInput.sendKeys(byteImageRequiredJade);
    }

    async getByteImageRequiredJadeInput() {
        return this.byteImageRequiredJadeInput.getAttribute('value');
    }

    async setByteImageMinbytesJadeInput(byteImageMinbytesJade) {
        await this.byteImageMinbytesJadeInput.sendKeys(byteImageMinbytesJade);
    }

    async getByteImageMinbytesJadeInput() {
        return this.byteImageMinbytesJadeInput.getAttribute('value');
    }

    async setByteImageMaxbytesJadeInput(byteImageMaxbytesJade) {
        await this.byteImageMaxbytesJadeInput.sendKeys(byteImageMaxbytesJade);
    }

    async getByteImageMaxbytesJadeInput() {
        return this.byteImageMaxbytesJadeInput.getAttribute('value');
    }

    async setByteAnyJadeInput(byteAnyJade) {
        await this.byteAnyJadeInput.sendKeys(byteAnyJade);
    }

    async getByteAnyJadeInput() {
        return this.byteAnyJadeInput.getAttribute('value');
    }

    async setByteAnyRequiredJadeInput(byteAnyRequiredJade) {
        await this.byteAnyRequiredJadeInput.sendKeys(byteAnyRequiredJade);
    }

    async getByteAnyRequiredJadeInput() {
        return this.byteAnyRequiredJadeInput.getAttribute('value');
    }

    async setByteAnyMinbytesJadeInput(byteAnyMinbytesJade) {
        await this.byteAnyMinbytesJadeInput.sendKeys(byteAnyMinbytesJade);
    }

    async getByteAnyMinbytesJadeInput() {
        return this.byteAnyMinbytesJadeInput.getAttribute('value');
    }

    async setByteAnyMaxbytesJadeInput(byteAnyMaxbytesJade) {
        await this.byteAnyMaxbytesJadeInput.sendKeys(byteAnyMaxbytesJade);
    }

    async getByteAnyMaxbytesJadeInput() {
        return this.byteAnyMaxbytesJadeInput.getAttribute('value');
    }

    async setByteTextJadeInput(byteTextJade) {
        await this.byteTextJadeInput.sendKeys(byteTextJade);
    }

    async getByteTextJadeInput() {
        return this.byteTextJadeInput.getAttribute('value');
    }

    async setByteTextRequiredJadeInput(byteTextRequiredJade) {
        await this.byteTextRequiredJadeInput.sendKeys(byteTextRequiredJade);
    }

    async getByteTextRequiredJadeInput() {
        return this.byteTextRequiredJadeInput.getAttribute('value');
    }

    async setByteTextMinbytesJadeInput(byteTextMinbytesJade) {
        await this.byteTextMinbytesJadeInput.sendKeys(byteTextMinbytesJade);
    }

    async getByteTextMinbytesJadeInput() {
        return this.byteTextMinbytesJadeInput.getAttribute('value');
    }

    async setByteTextMaxbytesJadeInput(byteTextMaxbytesJade) {
        await this.byteTextMaxbytesJadeInput.sendKeys(byteTextMaxbytesJade);
    }

    async getByteTextMaxbytesJadeInput() {
        return this.byteTextMaxbytesJadeInput.getAttribute('value');
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

export class FieldTestPagerEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldTestPagerEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldTestPagerEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
