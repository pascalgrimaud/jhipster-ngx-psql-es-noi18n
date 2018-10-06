import { element, by, ElementFinder } from 'protractor';

export class EntityWithServiceClassAndDTOComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entity-with-service-class-and-dto div table .btn-danger'));
    title = element.all(by.css('jhi-entity-with-service-class-and-dto div h2#page-heading span')).first();

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

export class EntityWithServiceClassAndDTOUpdatePage {
    pageTitle = element(by.id('jhi-entity-with-service-class-and-dto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    lucasInput = element(by.id('field_lucas'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setLucasInput(lucas) {
        await this.lucasInput.sendKeys(lucas);
    }

    async getLucasInput() {
        return this.lucasInput.getAttribute('value');
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

export class EntityWithServiceClassAndDTODeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entityWithServiceClassAndDTO-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entityWithServiceClassAndDTO'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
