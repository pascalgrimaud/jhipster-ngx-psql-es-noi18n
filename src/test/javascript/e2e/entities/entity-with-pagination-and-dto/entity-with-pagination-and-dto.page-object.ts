import { element, by, ElementFinder } from 'protractor';

export class EntityWithPaginationAndDTOComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entity-with-pagination-and-dto div table .btn-danger'));
    title = element.all(by.css('jhi-entity-with-pagination-and-dto div h2#page-heading span')).first();

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

export class EntityWithPaginationAndDTOUpdatePage {
    pageTitle = element(by.id('jhi-entity-with-pagination-and-dto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    leaInput = element(by.id('field_lea'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setLeaInput(lea) {
        await this.leaInput.sendKeys(lea);
    }

    async getLeaInput() {
        return this.leaInput.getAttribute('value');
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

export class EntityWithPaginationAndDTODeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entityWithPaginationAndDTO-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entityWithPaginationAndDTO'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
