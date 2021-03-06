import { element, by, ElementFinder } from 'protractor';

export class TestCustomTableNameComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-test-custom-table-name div table .btn-danger'));
    title = element.all(by.css('jhi-test-custom-table-name div h2#page-heading span')).first();

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

export class TestCustomTableNameUpdatePage {
    pageTitle = element(by.id('jhi-test-custom-table-name-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    testEntitySelect = element(by.id('field_testEntity'));
    userOneToManySelect = element(by.id('field_userOneToMany'));
    userManyToManySelect = element(by.id('field_userManyToMany'));
    userOneToOneSelect = element(by.id('field_userOneToOne'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async testEntitySelectLastOption() {
        await this.testEntitySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testEntitySelectOption(option) {
        await this.testEntitySelect.sendKeys(option);
    }

    getTestEntitySelect(): ElementFinder {
        return this.testEntitySelect;
    }

    async getTestEntitySelectedOption() {
        return this.testEntitySelect.element(by.css('option:checked')).getText();
    }

    async userOneToManySelectLastOption() {
        await this.userOneToManySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userOneToManySelectOption(option) {
        await this.userOneToManySelect.sendKeys(option);
    }

    getUserOneToManySelect(): ElementFinder {
        return this.userOneToManySelect;
    }

    async getUserOneToManySelectedOption() {
        return this.userOneToManySelect.element(by.css('option:checked')).getText();
    }

    async userManyToManySelectLastOption() {
        await this.userManyToManySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userManyToManySelectOption(option) {
        await this.userManyToManySelect.sendKeys(option);
    }

    getUserManyToManySelect(): ElementFinder {
        return this.userManyToManySelect;
    }

    async getUserManyToManySelectedOption() {
        return this.userManyToManySelect.element(by.css('option:checked')).getText();
    }

    async userOneToOneSelectLastOption() {
        await this.userOneToOneSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userOneToOneSelectOption(option) {
        await this.userOneToOneSelect.sendKeys(option);
    }

    getUserOneToOneSelect(): ElementFinder {
        return this.userOneToOneSelect;
    }

    async getUserOneToOneSelectedOption() {
        return this.userOneToOneSelect.element(by.css('option:checked')).getText();
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

export class TestCustomTableNameDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-testCustomTableName-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-testCustomTableName'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
