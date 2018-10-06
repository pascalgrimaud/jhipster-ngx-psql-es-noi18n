import { element, by, ElementFinder } from 'protractor';

export class FieldTestServiceClassEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-field-test-service-class-entity div table .btn-danger'));
    title = element.all(by.css('jhi-field-test-service-class-entity div h2#page-heading span')).first();

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

export class FieldTestServiceClassEntityUpdatePage {
    pageTitle = element(by.id('jhi-field-test-service-class-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stringBobInput = element(by.id('field_stringBob'));
    stringRequiredBobInput = element(by.id('field_stringRequiredBob'));
    stringMinlengthBobInput = element(by.id('field_stringMinlengthBob'));
    stringMaxlengthBobInput = element(by.id('field_stringMaxlengthBob'));
    stringPatternBobInput = element(by.id('field_stringPatternBob'));
    integerBobInput = element(by.id('field_integerBob'));
    integerRequiredBobInput = element(by.id('field_integerRequiredBob'));
    integerMinBobInput = element(by.id('field_integerMinBob'));
    integerMaxBobInput = element(by.id('field_integerMaxBob'));
    longBobInput = element(by.id('field_longBob'));
    longRequiredBobInput = element(by.id('field_longRequiredBob'));
    longMinBobInput = element(by.id('field_longMinBob'));
    longMaxBobInput = element(by.id('field_longMaxBob'));
    floatBobInput = element(by.id('field_floatBob'));
    floatRequiredBobInput = element(by.id('field_floatRequiredBob'));
    floatMinBobInput = element(by.id('field_floatMinBob'));
    floatMaxBobInput = element(by.id('field_floatMaxBob'));
    doubleRequiredBobInput = element(by.id('field_doubleRequiredBob'));
    doubleMinBobInput = element(by.id('field_doubleMinBob'));
    doubleMaxBobInput = element(by.id('field_doubleMaxBob'));
    bigDecimalRequiredBobInput = element(by.id('field_bigDecimalRequiredBob'));
    bigDecimalMinBobInput = element(by.id('field_bigDecimalMinBob'));
    bigDecimalMaxBobInput = element(by.id('field_bigDecimalMaxBob'));
    localDateBobInput = element(by.id('field_localDateBob'));
    localDateRequiredBobInput = element(by.id('field_localDateRequiredBob'));
    instantBobInput = element(by.id('field_instantBob'));
    instanteRequiredBobInput = element(by.id('field_instanteRequiredBob'));
    zonedDateTimeBobInput = element(by.id('field_zonedDateTimeBob'));
    zonedDateTimeRequiredBobInput = element(by.id('field_zonedDateTimeRequiredBob'));
    booleanBobInput = element(by.id('field_booleanBob'));
    booleanRequiredBobInput = element(by.id('field_booleanRequiredBob'));
    enumBobSelect = element(by.id('field_enumBob'));
    enumRequiredBobSelect = element(by.id('field_enumRequiredBob'));
    byteImageBobInput = element(by.id('file_byteImageBob'));
    byteImageRequiredBobInput = element(by.id('file_byteImageRequiredBob'));
    byteImageMinbytesBobInput = element(by.id('file_byteImageMinbytesBob'));
    byteImageMaxbytesBobInput = element(by.id('file_byteImageMaxbytesBob'));
    byteAnyBobInput = element(by.id('file_byteAnyBob'));
    byteAnyRequiredBobInput = element(by.id('file_byteAnyRequiredBob'));
    byteAnyMinbytesBobInput = element(by.id('file_byteAnyMinbytesBob'));
    byteAnyMaxbytesBobInput = element(by.id('file_byteAnyMaxbytesBob'));
    byteTextBobInput = element(by.id('field_byteTextBob'));
    byteTextRequiredBobInput = element(by.id('field_byteTextRequiredBob'));
    byteTextMinbytesBobInput = element(by.id('field_byteTextMinbytesBob'));
    byteTextMaxbytesBobInput = element(by.id('field_byteTextMaxbytesBob'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStringBobInput(stringBob) {
        await this.stringBobInput.sendKeys(stringBob);
    }

    async getStringBobInput() {
        return this.stringBobInput.getAttribute('value');
    }

    async setStringRequiredBobInput(stringRequiredBob) {
        await this.stringRequiredBobInput.sendKeys(stringRequiredBob);
    }

    async getStringRequiredBobInput() {
        return this.stringRequiredBobInput.getAttribute('value');
    }

    async setStringMinlengthBobInput(stringMinlengthBob) {
        await this.stringMinlengthBobInput.sendKeys(stringMinlengthBob);
    }

    async getStringMinlengthBobInput() {
        return this.stringMinlengthBobInput.getAttribute('value');
    }

    async setStringMaxlengthBobInput(stringMaxlengthBob) {
        await this.stringMaxlengthBobInput.sendKeys(stringMaxlengthBob);
    }

    async getStringMaxlengthBobInput() {
        return this.stringMaxlengthBobInput.getAttribute('value');
    }

    async setStringPatternBobInput(stringPatternBob) {
        await this.stringPatternBobInput.sendKeys(stringPatternBob);
    }

    async getStringPatternBobInput() {
        return this.stringPatternBobInput.getAttribute('value');
    }

    async setIntegerBobInput(integerBob) {
        await this.integerBobInput.sendKeys(integerBob);
    }

    async getIntegerBobInput() {
        return this.integerBobInput.getAttribute('value');
    }

    async setIntegerRequiredBobInput(integerRequiredBob) {
        await this.integerRequiredBobInput.sendKeys(integerRequiredBob);
    }

    async getIntegerRequiredBobInput() {
        return this.integerRequiredBobInput.getAttribute('value');
    }

    async setIntegerMinBobInput(integerMinBob) {
        await this.integerMinBobInput.sendKeys(integerMinBob);
    }

    async getIntegerMinBobInput() {
        return this.integerMinBobInput.getAttribute('value');
    }

    async setIntegerMaxBobInput(integerMaxBob) {
        await this.integerMaxBobInput.sendKeys(integerMaxBob);
    }

    async getIntegerMaxBobInput() {
        return this.integerMaxBobInput.getAttribute('value');
    }

    async setLongBobInput(longBob) {
        await this.longBobInput.sendKeys(longBob);
    }

    async getLongBobInput() {
        return this.longBobInput.getAttribute('value');
    }

    async setLongRequiredBobInput(longRequiredBob) {
        await this.longRequiredBobInput.sendKeys(longRequiredBob);
    }

    async getLongRequiredBobInput() {
        return this.longRequiredBobInput.getAttribute('value');
    }

    async setLongMinBobInput(longMinBob) {
        await this.longMinBobInput.sendKeys(longMinBob);
    }

    async getLongMinBobInput() {
        return this.longMinBobInput.getAttribute('value');
    }

    async setLongMaxBobInput(longMaxBob) {
        await this.longMaxBobInput.sendKeys(longMaxBob);
    }

    async getLongMaxBobInput() {
        return this.longMaxBobInput.getAttribute('value');
    }

    async setFloatBobInput(floatBob) {
        await this.floatBobInput.sendKeys(floatBob);
    }

    async getFloatBobInput() {
        return this.floatBobInput.getAttribute('value');
    }

    async setFloatRequiredBobInput(floatRequiredBob) {
        await this.floatRequiredBobInput.sendKeys(floatRequiredBob);
    }

    async getFloatRequiredBobInput() {
        return this.floatRequiredBobInput.getAttribute('value');
    }

    async setFloatMinBobInput(floatMinBob) {
        await this.floatMinBobInput.sendKeys(floatMinBob);
    }

    async getFloatMinBobInput() {
        return this.floatMinBobInput.getAttribute('value');
    }

    async setFloatMaxBobInput(floatMaxBob) {
        await this.floatMaxBobInput.sendKeys(floatMaxBob);
    }

    async getFloatMaxBobInput() {
        return this.floatMaxBobInput.getAttribute('value');
    }

    async setDoubleRequiredBobInput(doubleRequiredBob) {
        await this.doubleRequiredBobInput.sendKeys(doubleRequiredBob);
    }

    async getDoubleRequiredBobInput() {
        return this.doubleRequiredBobInput.getAttribute('value');
    }

    async setDoubleMinBobInput(doubleMinBob) {
        await this.doubleMinBobInput.sendKeys(doubleMinBob);
    }

    async getDoubleMinBobInput() {
        return this.doubleMinBobInput.getAttribute('value');
    }

    async setDoubleMaxBobInput(doubleMaxBob) {
        await this.doubleMaxBobInput.sendKeys(doubleMaxBob);
    }

    async getDoubleMaxBobInput() {
        return this.doubleMaxBobInput.getAttribute('value');
    }

    async setBigDecimalRequiredBobInput(bigDecimalRequiredBob) {
        await this.bigDecimalRequiredBobInput.sendKeys(bigDecimalRequiredBob);
    }

    async getBigDecimalRequiredBobInput() {
        return this.bigDecimalRequiredBobInput.getAttribute('value');
    }

    async setBigDecimalMinBobInput(bigDecimalMinBob) {
        await this.bigDecimalMinBobInput.sendKeys(bigDecimalMinBob);
    }

    async getBigDecimalMinBobInput() {
        return this.bigDecimalMinBobInput.getAttribute('value');
    }

    async setBigDecimalMaxBobInput(bigDecimalMaxBob) {
        await this.bigDecimalMaxBobInput.sendKeys(bigDecimalMaxBob);
    }

    async getBigDecimalMaxBobInput() {
        return this.bigDecimalMaxBobInput.getAttribute('value');
    }

    async setLocalDateBobInput(localDateBob) {
        await this.localDateBobInput.sendKeys(localDateBob);
    }

    async getLocalDateBobInput() {
        return this.localDateBobInput.getAttribute('value');
    }

    async setLocalDateRequiredBobInput(localDateRequiredBob) {
        await this.localDateRequiredBobInput.sendKeys(localDateRequiredBob);
    }

    async getLocalDateRequiredBobInput() {
        return this.localDateRequiredBobInput.getAttribute('value');
    }

    async setInstantBobInput(instantBob) {
        await this.instantBobInput.sendKeys(instantBob);
    }

    async getInstantBobInput() {
        return this.instantBobInput.getAttribute('value');
    }

    async setInstanteRequiredBobInput(instanteRequiredBob) {
        await this.instanteRequiredBobInput.sendKeys(instanteRequiredBob);
    }

    async getInstanteRequiredBobInput() {
        return this.instanteRequiredBobInput.getAttribute('value');
    }

    async setZonedDateTimeBobInput(zonedDateTimeBob) {
        await this.zonedDateTimeBobInput.sendKeys(zonedDateTimeBob);
    }

    async getZonedDateTimeBobInput() {
        return this.zonedDateTimeBobInput.getAttribute('value');
    }

    async setZonedDateTimeRequiredBobInput(zonedDateTimeRequiredBob) {
        await this.zonedDateTimeRequiredBobInput.sendKeys(zonedDateTimeRequiredBob);
    }

    async getZonedDateTimeRequiredBobInput() {
        return this.zonedDateTimeRequiredBobInput.getAttribute('value');
    }

    getBooleanBobInput() {
        return this.booleanBobInput;
    }
    getBooleanRequiredBobInput() {
        return this.booleanRequiredBobInput;
    }
    async setEnumBobSelect(enumBob) {
        await this.enumBobSelect.sendKeys(enumBob);
    }

    async getEnumBobSelect() {
        return this.enumBobSelect.element(by.css('option:checked')).getText();
    }

    async enumBobSelectLastOption() {
        await this.enumBobSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEnumRequiredBobSelect(enumRequiredBob) {
        await this.enumRequiredBobSelect.sendKeys(enumRequiredBob);
    }

    async getEnumRequiredBobSelect() {
        return this.enumRequiredBobSelect.element(by.css('option:checked')).getText();
    }

    async enumRequiredBobSelectLastOption() {
        await this.enumRequiredBobSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setByteImageBobInput(byteImageBob) {
        await this.byteImageBobInput.sendKeys(byteImageBob);
    }

    async getByteImageBobInput() {
        return this.byteImageBobInput.getAttribute('value');
    }

    async setByteImageRequiredBobInput(byteImageRequiredBob) {
        await this.byteImageRequiredBobInput.sendKeys(byteImageRequiredBob);
    }

    async getByteImageRequiredBobInput() {
        return this.byteImageRequiredBobInput.getAttribute('value');
    }

    async setByteImageMinbytesBobInput(byteImageMinbytesBob) {
        await this.byteImageMinbytesBobInput.sendKeys(byteImageMinbytesBob);
    }

    async getByteImageMinbytesBobInput() {
        return this.byteImageMinbytesBobInput.getAttribute('value');
    }

    async setByteImageMaxbytesBobInput(byteImageMaxbytesBob) {
        await this.byteImageMaxbytesBobInput.sendKeys(byteImageMaxbytesBob);
    }

    async getByteImageMaxbytesBobInput() {
        return this.byteImageMaxbytesBobInput.getAttribute('value');
    }

    async setByteAnyBobInput(byteAnyBob) {
        await this.byteAnyBobInput.sendKeys(byteAnyBob);
    }

    async getByteAnyBobInput() {
        return this.byteAnyBobInput.getAttribute('value');
    }

    async setByteAnyRequiredBobInput(byteAnyRequiredBob) {
        await this.byteAnyRequiredBobInput.sendKeys(byteAnyRequiredBob);
    }

    async getByteAnyRequiredBobInput() {
        return this.byteAnyRequiredBobInput.getAttribute('value');
    }

    async setByteAnyMinbytesBobInput(byteAnyMinbytesBob) {
        await this.byteAnyMinbytesBobInput.sendKeys(byteAnyMinbytesBob);
    }

    async getByteAnyMinbytesBobInput() {
        return this.byteAnyMinbytesBobInput.getAttribute('value');
    }

    async setByteAnyMaxbytesBobInput(byteAnyMaxbytesBob) {
        await this.byteAnyMaxbytesBobInput.sendKeys(byteAnyMaxbytesBob);
    }

    async getByteAnyMaxbytesBobInput() {
        return this.byteAnyMaxbytesBobInput.getAttribute('value');
    }

    async setByteTextBobInput(byteTextBob) {
        await this.byteTextBobInput.sendKeys(byteTextBob);
    }

    async getByteTextBobInput() {
        return this.byteTextBobInput.getAttribute('value');
    }

    async setByteTextRequiredBobInput(byteTextRequiredBob) {
        await this.byteTextRequiredBobInput.sendKeys(byteTextRequiredBob);
    }

    async getByteTextRequiredBobInput() {
        return this.byteTextRequiredBobInput.getAttribute('value');
    }

    async setByteTextMinbytesBobInput(byteTextMinbytesBob) {
        await this.byteTextMinbytesBobInput.sendKeys(byteTextMinbytesBob);
    }

    async getByteTextMinbytesBobInput() {
        return this.byteTextMinbytesBobInput.getAttribute('value');
    }

    async setByteTextMaxbytesBobInput(byteTextMaxbytesBob) {
        await this.byteTextMaxbytesBobInput.sendKeys(byteTextMaxbytesBob);
    }

    async getByteTextMaxbytesBobInput() {
        return this.byteTextMaxbytesBobInput.getAttribute('value');
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

export class FieldTestServiceClassEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-fieldTestServiceClassEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-fieldTestServiceClassEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
