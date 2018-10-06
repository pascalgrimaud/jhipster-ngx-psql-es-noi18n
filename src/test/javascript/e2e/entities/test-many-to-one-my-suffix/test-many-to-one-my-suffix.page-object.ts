import { element, by, ElementFinder } from 'protractor';

export class TestManyToOneComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-test-many-to-one-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-test-many-to-one-my-suffix div h2#page-heading span')).first();

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

export class TestManyToOneUpdatePage {
    pageTitle = element(by.id('jhi-test-many-to-one-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    testEntitySelect = element(by.id('field_testEntity'));
    testMapstructSelect = element(by.id('field_testMapstruct'));
    testServiceClassSelect = element(by.id('field_testServiceClass'));
    testServiceImplSelect = element(by.id('field_testServiceImpl'));
    testInfiniteScrollSelect = element(by.id('field_testInfiniteScroll'));
    testPagerSelect = element(by.id('field_testPager'));
    testPaginationSelect = element(by.id('field_testPagination'));
    testCustomTableNameSelect = element(by.id('field_testCustomTableName'));

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

    async testServiceClassSelectLastOption() {
        await this.testServiceClassSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testServiceClassSelectOption(option) {
        await this.testServiceClassSelect.sendKeys(option);
    }

    getTestServiceClassSelect(): ElementFinder {
        return this.testServiceClassSelect;
    }

    async getTestServiceClassSelectedOption() {
        return this.testServiceClassSelect.element(by.css('option:checked')).getText();
    }

    async testServiceImplSelectLastOption() {
        await this.testServiceImplSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testServiceImplSelectOption(option) {
        await this.testServiceImplSelect.sendKeys(option);
    }

    getTestServiceImplSelect(): ElementFinder {
        return this.testServiceImplSelect;
    }

    async getTestServiceImplSelectedOption() {
        return this.testServiceImplSelect.element(by.css('option:checked')).getText();
    }

    async testInfiniteScrollSelectLastOption() {
        await this.testInfiniteScrollSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testInfiniteScrollSelectOption(option) {
        await this.testInfiniteScrollSelect.sendKeys(option);
    }

    getTestInfiniteScrollSelect(): ElementFinder {
        return this.testInfiniteScrollSelect;
    }

    async getTestInfiniteScrollSelectedOption() {
        return this.testInfiniteScrollSelect.element(by.css('option:checked')).getText();
    }

    async testPagerSelectLastOption() {
        await this.testPagerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testPagerSelectOption(option) {
        await this.testPagerSelect.sendKeys(option);
    }

    getTestPagerSelect(): ElementFinder {
        return this.testPagerSelect;
    }

    async getTestPagerSelectedOption() {
        return this.testPagerSelect.element(by.css('option:checked')).getText();
    }

    async testPaginationSelectLastOption() {
        await this.testPaginationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testPaginationSelectOption(option) {
        await this.testPaginationSelect.sendKeys(option);
    }

    getTestPaginationSelect(): ElementFinder {
        return this.testPaginationSelect;
    }

    async getTestPaginationSelectedOption() {
        return this.testPaginationSelect.element(by.css('option:checked')).getText();
    }

    async testCustomTableNameSelectLastOption() {
        await this.testCustomTableNameSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async testCustomTableNameSelectOption(option) {
        await this.testCustomTableNameSelect.sendKeys(option);
    }

    getTestCustomTableNameSelect(): ElementFinder {
        return this.testCustomTableNameSelect;
    }

    async getTestCustomTableNameSelectedOption() {
        return this.testCustomTableNameSelect.element(by.css('option:checked')).getText();
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

export class TestManyToOneDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-testManyToOne-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-testManyToOne'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
