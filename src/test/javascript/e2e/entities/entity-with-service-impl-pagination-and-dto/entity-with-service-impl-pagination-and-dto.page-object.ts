import { element, by, ElementFinder } from 'protractor';

export class EntityWithServiceImplPaginationAndDTOComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entity-with-service-impl-pagination-and-dto div table .btn-danger'));
    title = element.all(by.css('jhi-entity-with-service-impl-pagination-and-dto div h2#page-heading span')).first();

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

export class EntityWithServiceImplPaginationAndDTOUpdatePage {
    pageTitle = element(by.id('jhi-entity-with-service-impl-pagination-and-dto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    theoInput = element(by.id('field_theo'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setTheoInput(theo) {
        await this.theoInput.sendKeys(theo);
    }

    async getTheoInput() {
        return this.theoInput.getAttribute('value');
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

export class EntityWithServiceImplPaginationAndDTODeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entityWithServiceImplPaginationAndDTO-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entityWithServiceImplPaginationAndDTO'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
