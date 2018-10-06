import { element, by, ElementFinder } from 'protractor';

export class TestManyRelPaginDTOComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-test-many-rel-pagin-dto-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-test-many-rel-pagin-dto-my-suffix div h2#page-heading span')).first();

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

export class TestManyRelPaginDTOUpdatePage {
    pageTitle = element(by.id('jhi-test-many-rel-pagin-dto-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    testMapstructSelect = element(by.id('field_testMapstruct'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async testMapstructSelectLastOption() {
        await this.testMapstructSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testMapstructSelectOption(option) {
        await this.testMapstructSelect.sendKeys(option);
    }

    getTestMapstructSelect(): ElementFinder {
        return this.testMapstructSelect;
    }

    async getTestMapstructSelectedOption() {
        return this.testMapstructSelect.element(by.css('option:checked')).getText();
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

export class TestManyRelPaginDTODeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-testManyRelPaginDTO-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-testManyRelPaginDTO'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
