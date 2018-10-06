import { element, by, ElementFinder } from 'protractor';

export class FieldTestPaginationEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-test-pagination-entity div table .btn-danger'));
    title = element.all(by.css('jhi-field-test-pagination-entity div h2#page-heading span')).first();

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

export class FieldTestPaginationEntityUpdatePage {
    pageTitle = element(by.id('jhi-field-test-pagination-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stringAliceInput = element(by.id('field_stringAlice'));
    stringRequiredAliceInput = element(by.id('field_stringRequiredAlice'));
    stringMinlengthAliceInput = element(by.id('field_stringMinlengthAlice'));
    stringMaxlengthAliceInput = element(by.id('field_stringMaxlengthAlice'));
    stringPatternAliceInput = element(by.id('field_stringPatternAlice'));
    integerAliceInput = element(by.id('field_integerAlice'));
    integerRequiredAliceInput = element(by.id('field_integerRequiredAlice'));
    integerMinAliceInput = element(by.id('field_integerMinAlice'));
    integerMaxAliceInput = element(by.id('field_integerMaxAlice'));
    longAliceInput = element(by.id('field_longAlice'));
    longRequiredAliceInput = element(by.id('field_longRequiredAlice'));
    longMinAliceInput = element(by.id('field_longMinAlice'));
    longMaxAliceInput = element(by.id('field_longMaxAlice'));
    floatAliceInput = element(by.id('field_floatAlice'));
    floatRequiredAliceInput = element(by.id('field_floatRequiredAlice'));
    floatMinAliceInput = element(by.id('field_floatMinAlice'));
    floatMaxAliceInput = element(by.id('field_floatMaxAlice'));
    doubleRequiredAliceInput = element(by.id('field_doubleRequiredAlice'));
    doubleMinAliceInput = element(by.id('field_doubleMinAlice'));
    doubleMaxAliceInput = element(by.id('field_doubleMaxAlice'));
    bigDecimalRequiredAliceInput = element(by.id('field_bigDecimalRequiredAlice'));
    bigDecimalMinAliceInput = element(by.id('field_bigDecimalMinAlice'));
    bigDecimalMaxAliceInput = element(by.id('field_bigDecimalMaxAlice'));
    localDateAliceInput = element(by.id('field_localDateAlice'));
    localDateRequiredAliceInput = element(by.id('field_localDateRequiredAlice'));
    instantAliceInput = element(by.id('field_instantAlice'));
    instanteRequiredAliceInput = element(by.id('field_instanteRequiredAlice'));
    zonedDateTimeAliceInput = element(by.id('field_zonedDateTimeAlice'));
    zonedDateTimeRequiredAliceInput = element(by.id('field_zonedDateTimeRequiredAlice'));
    booleanAliceInput = element(by.id('field_booleanAlice'));
    booleanRequiredAliceInput = element(by.id('field_booleanRequiredAlice'));
    enumAliceSelect = element(by.id('field_enumAlice'));
    enumRequiredAliceSelect = element(by.id('field_enumRequiredAlice'));
    byteImageAliceInput = element(by.id('file_byteImageAlice'));
    byteImageRequiredAliceInput = element(by.id('file_byteImageRequiredAlice'));
    byteImageMinbytesAliceInput = element(by.id('file_byteImageMinbytesAlice'));
    byteImageMaxbytesAliceInput = element(by.id('file_byteImageMaxbytesAlice'));
    byteAnyAliceInput = element(by.id('file_byteAnyAlice'));
    byteAnyRequiredAliceInput = element(by.id('file_byteAnyRequiredAlice'));
    byteAnyMinbytesAliceInput = element(by.id('file_byteAnyMinbytesAlice'));
    byteAnyMaxbytesAliceInput = element(by.id('file_byteAnyMaxbytesAlice'));
    byteTextAliceInput = element(by.id('field_byteTextAlice'));
    byteTextRequiredAliceInput = element(by.id('field_byteTextRequiredAlice'));
    byteTextMinbytesAliceInput = element(by.id('field_byteTextMinbytesAlice'));
    byteTextMaxbytesAliceInput = element(by.id('field_byteTextMaxbytesAlice'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStringAliceInput(stringAlice) {
        await this.stringAliceInput.sendKeys(stringAlice);
    }

    async getStringAliceInput() {
        return this.stringAliceInput.getAttribute('value');
    }

    async setStringRequiredAliceInput(stringRequiredAlice) {
        await this.stringRequiredAliceInput.sendKeys(stringRequiredAlice);
    }

    async getStringRequiredAliceInput() {
        return this.stringRequiredAliceInput.getAttribute('value');
    }

    async setStringMinlengthAliceInput(stringMinlengthAlice) {
        await this.stringMinlengthAliceInput.sendKeys(stringMinlengthAlice);
    }

    async getStringMinlengthAliceInput() {
        return this.stringMinlengthAliceInput.getAttribute('value');
    }

    async setStringMaxlengthAliceInput(stringMaxlengthAlice) {
        await this.stringMaxlengthAliceInput.sendKeys(stringMaxlengthAlice);
    }

    async getStringMaxlengthAliceInput() {
        return this.stringMaxlengthAliceInput.getAttribute('value');
    }

    async setStringPatternAliceInput(stringPatternAlice) {
        await this.stringPatternAliceInput.sendKeys(stringPatternAlice);
    }

    async getStringPatternAliceInput() {
        return this.stringPatternAliceInput.getAttribute('value');
    }

    async setIntegerAliceInput(integerAlice) {
        await this.integerAliceInput.sendKeys(integerAlice);
    }

    async getIntegerAliceInput() {
        return this.integerAliceInput.getAttribute('value');
    }

    async setIntegerRequiredAliceInput(integerRequiredAlice) {
        await this.integerRequiredAliceInput.sendKeys(integerRequiredAlice);
    }

    async getIntegerRequiredAliceInput() {
        return this.integerRequiredAliceInput.getAttribute('value');
    }

    async setIntegerMinAliceInput(integerMinAlice) {
        await this.integerMinAliceInput.sendKeys(integerMinAlice);
    }

    async getIntegerMinAliceInput() {
        return this.integerMinAliceInput.getAttribute('value');
    }

    async setIntegerMaxAliceInput(integerMaxAlice) {
        await this.integerMaxAliceInput.sendKeys(integerMaxAlice);
    }

    async getIntegerMaxAliceInput() {
        return this.integerMaxAliceInput.getAttribute('value');
    }

    async setLongAliceInput(longAlice) {
        await this.longAliceInput.sendKeys(longAlice);
    }

    async getLongAliceInput() {
        return this.longAliceInput.getAttribute('value');
    }

    async setLongRequiredAliceInput(longRequiredAlice) {
        await this.longRequiredAliceInput.sendKeys(longRequiredAlice);
    }

    async getLongRequiredAliceInput() {
        return this.longRequiredAliceInput.getAttribute('value');
    }

    async setLongMinAliceInput(longMinAlice) {
        await this.longMinAliceInput.sendKeys(longMinAlice);
    }

    async getLongMinAliceInput() {
        return this.longMinAliceInput.getAttribute('value');
    }

    async setLongMaxAliceInput(longMaxAlice) {
        await this.longMaxAliceInput.sendKeys(longMaxAlice);
    }

    async getLongMaxAliceInput() {
        return this.longMaxAliceInput.getAttribute('value');
    }

    async setFloatAliceInput(floatAlice) {
        await this.floatAliceInput.sendKeys(floatAlice);
    }

    async getFloatAliceInput() {
        return this.floatAliceInput.getAttribute('value');
    }

    async setFloatRequiredAliceInput(floatRequiredAlice) {
        await this.floatRequiredAliceInput.sendKeys(floatRequiredAlice);
    }

    async getFloatRequiredAliceInput() {
        return this.floatRequiredAliceInput.getAttribute('value');
    }

    async setFloatMinAliceInput(floatMinAlice) {
        await this.floatMinAliceInput.sendKeys(floatMinAlice);
    }

    async getFloatMinAliceInput() {
        return this.floatMinAliceInput.getAttribute('value');
    }

    async setFloatMaxAliceInput(floatMaxAlice) {
        await this.floatMaxAliceInput.sendKeys(floatMaxAlice);
    }

    async getFloatMaxAliceInput() {
        return this.floatMaxAliceInput.getAttribute('value');
    }

    async setDoubleRequiredAliceInput(doubleRequiredAlice) {
        await this.doubleRequiredAliceInput.sendKeys(doubleRequiredAlice);
    }

    async getDoubleRequiredAliceInput() {
        return this.doubleRequiredAliceInput.getAttribute('value');
    }

    async setDoubleMinAliceInput(doubleMinAlice) {
        await this.doubleMinAliceInput.sendKeys(doubleMinAlice);
    }

    async getDoubleMinAliceInput() {
        return this.doubleMinAliceInput.getAttribute('value');
    }

    async setDoubleMaxAliceInput(doubleMaxAlice) {
        await this.doubleMaxAliceInput.sendKeys(doubleMaxAlice);
    }

    async getDoubleMaxAliceInput() {
        return this.doubleMaxAliceInput.getAttribute('value');
    }

    async setBigDecimalRequiredAliceInput(bigDecimalRequiredAlice) {
        await this.bigDecimalRequiredAliceInput.sendKeys(bigDecimalRequiredAlice);
    }

    async getBigDecimalRequiredAliceInput() {
        return this.bigDecimalRequiredAliceInput.getAttribute('value');
    }

    async setBigDecimalMinAliceInput(bigDecimalMinAlice) {
        await this.bigDecimalMinAliceInput.sendKeys(bigDecimalMinAlice);
    }

    async getBigDecimalMinAliceInput() {
        return this.bigDecimalMinAliceInput.getAttribute('value');
    }

    async setBigDecimalMaxAliceInput(bigDecimalMaxAlice) {
        await this.bigDecimalMaxAliceInput.sendKeys(bigDecimalMaxAlice);
    }

    async getBigDecimalMaxAliceInput() {
        return this.bigDecimalMaxAliceInput.getAttribute('value');
    }

    async setLocalDateAliceInput(localDateAlice) {
        await this.localDateAliceInput.sendKeys(localDateAlice);
    }

    async getLocalDateAliceInput() {
        return this.localDateAliceInput.getAttribute('value');
    }

    async setLocalDateRequiredAliceInput(localDateRequiredAlice) {
        await this.localDateRequiredAliceInput.sendKeys(localDateRequiredAlice);
    }

    async getLocalDateRequiredAliceInput() {
        return this.localDateRequiredAliceInput.getAttribute('value');
    }

    async setInstantAliceInput(instantAlice) {
        await this.instantAliceInput.sendKeys(instantAlice);
    }

    async getInstantAliceInput() {
        return this.instantAliceInput.getAttribute('value');
    }

    async setInstanteRequiredAliceInput(instanteRequiredAlice) {
        await this.instanteRequiredAliceInput.sendKeys(instanteRequiredAlice);
    }

    async getInstanteRequiredAliceInput() {
        return this.instanteRequiredAliceInput.getAttribute('value');
    }

    async setZonedDateTimeAliceInput(zonedDateTimeAlice) {
        await this.zonedDateTimeAliceInput.sendKeys(zonedDateTimeAlice);
    }

    async getZonedDateTimeAliceInput() {
        return this.zonedDateTimeAliceInput.getAttribute('value');
    }

    async setZonedDateTimeRequiredAliceInput(zonedDateTimeRequiredAlice) {
        await this.zonedDateTimeRequiredAliceInput.sendKeys(zonedDateTimeRequiredAlice);
    }

    async getZonedDateTimeRequiredAliceInput() {
        return this.zonedDateTimeRequiredAliceInput.getAttribute('value');
    }

    getBooleanAliceInput() {
        return this.booleanAliceInput;
    }
    getBooleanRequiredAliceInput() {
        return this.booleanRequiredAliceInput;
    }
    async setEnumAliceSelect(enumAlice) {
        await this.enumAliceSelect.sendKeys(enumAlice);
    }

    async getEnumAliceSelect() {
        return this.enumAliceSelect.element(by.css('option:checked')).getText();
    }

    async enumAliceSelectLastOption() {
        await this.enumAliceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEnumRequiredAliceSelect(enumRequiredAlice) {
        await this.enumRequiredAliceSelect.sendKeys(enumRequiredAlice);
    }

    async getEnumRequiredAliceSelect() {
        return this.enumRequiredAliceSelect.element(by.css('option:checked')).getText();
    }

    async enumRequiredAliceSelectLastOption() {
        await this.enumRequiredAliceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setByteImageAliceInput(byteImageAlice) {
        await this.byteImageAliceInput.sendKeys(byteImageAlice);
    }

    async getByteImageAliceInput() {
        return this.byteImageAliceInput.getAttribute('value');
    }

    async setByteImageRequiredAliceInput(byteImageRequiredAlice) {
        await this.byteImageRequiredAliceInput.sendKeys(byteImageRequiredAlice);
    }

    async getByteImageRequiredAliceInput() {
        return this.byteImageRequiredAliceInput.getAttribute('value');
    }

    async setByteImageMinbytesAliceInput(byteImageMinbytesAlice) {
        await this.byteImageMinbytesAliceInput.sendKeys(byteImageMinbytesAlice);
    }

    async getByteImageMinbytesAliceInput() {
        return this.byteImageMinbytesAliceInput.getAttribute('value');
    }

    async setByteImageMaxbytesAliceInput(byteImageMaxbytesAlice) {
        await this.byteImageMaxbytesAliceInput.sendKeys(byteImageMaxbytesAlice);
    }

    async getByteImageMaxbytesAliceInput() {
        return this.byteImageMaxbytesAliceInput.getAttribute('value');
    }

    async setByteAnyAliceInput(byteAnyAlice) {
        await this.byteAnyAliceInput.sendKeys(byteAnyAlice);
    }

    async getByteAnyAliceInput() {
        return this.byteAnyAliceInput.getAttribute('value');
    }

    async setByteAnyRequiredAliceInput(byteAnyRequiredAlice) {
        await this.byteAnyRequiredAliceInput.sendKeys(byteAnyRequiredAlice);
    }

    async getByteAnyRequiredAliceInput() {
        return this.byteAnyRequiredAliceInput.getAttribute('value');
    }

    async setByteAnyMinbytesAliceInput(byteAnyMinbytesAlice) {
        await this.byteAnyMinbytesAliceInput.sendKeys(byteAnyMinbytesAlice);
    }

    async getByteAnyMinbytesAliceInput() {
        return this.byteAnyMinbytesAliceInput.getAttribute('value');
    }

    async setByteAnyMaxbytesAliceInput(byteAnyMaxbytesAlice) {
        await this.byteAnyMaxbytesAliceInput.sendKeys(byteAnyMaxbytesAlice);
    }

    async getByteAnyMaxbytesAliceInput() {
        return this.byteAnyMaxbytesAliceInput.getAttribute('value');
    }

    async setByteTextAliceInput(byteTextAlice) {
        await this.byteTextAliceInput.sendKeys(byteTextAlice);
    }

    async getByteTextAliceInput() {
        return this.byteTextAliceInput.getAttribute('value');
    }

    async setByteTextRequiredAliceInput(byteTextRequiredAlice) {
        await this.byteTextRequiredAliceInput.sendKeys(byteTextRequiredAlice);
    }

    async getByteTextRequiredAliceInput() {
        return this.byteTextRequiredAliceInput.getAttribute('value');
    }

    async setByteTextMinbytesAliceInput(byteTextMinbytesAlice) {
        await this.byteTextMinbytesAliceInput.sendKeys(byteTextMinbytesAlice);
    }

    async getByteTextMinbytesAliceInput() {
        return this.byteTextMinbytesAliceInput.getAttribute('value');
    }

    async setByteTextMaxbytesAliceInput(byteTextMaxbytesAlice) {
        await this.byteTextMaxbytesAliceInput.sendKeys(byteTextMaxbytesAlice);
    }

    async getByteTextMaxbytesAliceInput() {
        return this.byteTextMaxbytesAliceInput.getAttribute('value');
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

export class FieldTestPaginationEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldTestPaginationEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldTestPaginationEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
