import { element, by, ElementFinder } from 'protractor';

export class EntityWithDTOComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entity-with-dto div table .btn-danger'));
    title = element.all(by.css('jhi-entity-with-dto div h2#page-heading span')).first();

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

export class EntityWithDTOUpdatePage {
    pageTitle = element(by.id('jhi-entity-with-dto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    emmaInput = element(by.id('field_emma'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setEmmaInput(emma) {
        await this.emmaInput.sendKeys(emma);
    }

    async getEmmaInput() {
        return this.emmaInput.getAttribute('value');
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

export class EntityWithDTODeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entityWithDTO-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entityWithDTO'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
