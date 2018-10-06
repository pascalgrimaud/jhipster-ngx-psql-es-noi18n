import { element, by, ElementFinder } from 'protractor';

export class OperationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-operation div table .btn-danger'));
    title = element.all(by.css('jhi-operation div h2#page-heading span')).first();

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

export class OperationUpdatePage {
    pageTitle = element(by.id('jhi-operation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    descriptionInput = element(by.id('field_description'));
    amountInput = element(by.id('field_amount'));
    bankAccountSelect = element(by.id('field_bankAccount'));
    labelSelect = element(by.id('field_label'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async bankAccountSelectLastOption() {
        await this.bankAccountSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async bankAccountSelectOption(option) {
        await this.bankAccountSelect.sendKeys(option);
    }

    getBankAccountSelect(): ElementFinder {
        return this.bankAccountSelect;
    }

    async getBankAccountSelectedOption() {
        return this.bankAccountSelect.element(by.css('option:checked')).getText();
    }

    async labelSelectLastOption() {
        await this.labelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async labelSelectOption(option) {
        await this.labelSelect.sendKeys(option);
    }

    getLabelSelect(): ElementFinder {
        return this.labelSelect;
    }

    async getLabelSelectedOption() {
        return this.labelSelect.element(by.css('option:checked')).getText();
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

export class OperationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-operation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-operation'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
