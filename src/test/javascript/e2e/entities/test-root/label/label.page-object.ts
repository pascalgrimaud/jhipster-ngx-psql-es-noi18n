import { element, by, ElementFinder } from 'protractor';

export class LabelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-label div table .btn-danger'));
    title = element.all(by.css('jhi-label div h2#page-heading span')).first();

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

export class LabelUpdatePage {
    pageTitle = element(by.id('jhi-label-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    labelNameInput = element(by.id('field_labelName'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setLabelNameInput(labelName) {
        await this.labelNameInput.sendKeys(labelName);
    }

    async getLabelNameInput() {
        return this.labelNameInput.getAttribute('value');
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

export class LabelDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-label-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-label'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
