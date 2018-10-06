import { element, by, ElementFinder } from 'protractor';

export class EntityWithServiceImplComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-entity-with-service-impl div table .btn-danger'));
    title = element.all(by.css('jhi-entity-with-service-impl div h2#page-heading span')).first();

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

export class EntityWithServiceImplUpdatePage {
    pageTitle = element(by.id('jhi-entity-with-service-impl-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    claraInput = element(by.id('field_clara'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setClaraInput(clara) {
        await this.claraInput.sendKeys(clara);
    }

    async getClaraInput() {
        return this.claraInput.getAttribute('value');
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

export class EntityWithServiceImplDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-entityWithServiceImpl-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-entityWithServiceImpl'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
