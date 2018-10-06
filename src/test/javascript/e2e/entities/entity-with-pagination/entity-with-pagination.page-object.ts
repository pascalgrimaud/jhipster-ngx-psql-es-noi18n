import { element, by, ElementFinder } from 'protractor';

export class EntityWithPaginationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entity-with-pagination div table .btn-danger'));
    title = element.all(by.css('jhi-entity-with-pagination div h2#page-heading span')).first();

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

export class EntityWithPaginationUpdatePage {
    pageTitle = element(by.id('jhi-entity-with-pagination-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nathanInput = element(by.id('field_nathan'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNathanInput(nathan) {
        await this.nathanInput.sendKeys(nathan);
    }

    async getNathanInput() {
        return this.nathanInput.getAttribute('value');
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

export class EntityWithPaginationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entityWithPagination-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entityWithPagination'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
