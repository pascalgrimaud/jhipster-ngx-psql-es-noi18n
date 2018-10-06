import { element, by, ElementFinder } from 'protractor';

export class EntityWithServiceClassPaginationAndDTOComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entity-with-service-class-pagination-and-dto div table .btn-danger'));
    title = element.all(by.css('jhi-entity-with-service-class-pagination-and-dto div h2#page-heading span')).first();

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

export class EntityWithServiceClassPaginationAndDTOUpdatePage {
    pageTitle = element(by.id('jhi-entity-with-service-class-pagination-and-dto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    lenaInput = element(by.id('field_lena'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setLenaInput(lena) {
        await this.lenaInput.sendKeys(lena);
    }

    async getLenaInput() {
        return this.lenaInput.getAttribute('value');
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

export class EntityWithServiceClassPaginationAndDTODeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entityWithServiceClassPaginationAndDTO-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entityWithServiceClassPaginationAndDTO'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
