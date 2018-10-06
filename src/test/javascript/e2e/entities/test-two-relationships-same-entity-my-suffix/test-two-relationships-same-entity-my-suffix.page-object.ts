import { element, by, ElementFinder } from 'protractor';

export class TestTwoRelationshipsSameEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-test-two-relationships-same-entity-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-test-two-relationships-same-entity-my-suffix div h2#page-heading span')).first();

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

export class TestTwoRelationshipsSameEntityUpdatePage {
    pageTitle = element(by.id('jhi-test-two-relationships-same-entity-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstRelationshipSelect = element(by.id('field_firstRelationship'));
    secondRelationshipSelect = element(by.id('field_secondRelationship'));
    userOneSelect = element(by.id('field_userOne'));
    userTwoSelect = element(by.id('field_userTwo'));
    firstUniqueRequiredRelationSelect = element(by.id('field_firstUniqueRequiredRelation'));
    secondUniqueRequiredRelationSelect = element(by.id('field_secondUniqueRequiredRelation'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async firstRelationshipSelectLastOption() {
        await this.firstRelationshipSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async firstRelationshipSelectOption(option) {
        await this.firstRelationshipSelect.sendKeys(option);
    }

    getFirstRelationshipSelect(): ElementFinder {
        return this.firstRelationshipSelect;
    }

    async getFirstRelationshipSelectedOption() {
        return this.firstRelationshipSelect.element(by.css('option:checked')).getText();
    }

    async secondRelationshipSelectLastOption() {
        await this.secondRelationshipSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async secondRelationshipSelectOption(option) {
        await this.secondRelationshipSelect.sendKeys(option);
    }

    getSecondRelationshipSelect(): ElementFinder {
        return this.secondRelationshipSelect;
    }

    async getSecondRelationshipSelectedOption() {
        return this.secondRelationshipSelect.element(by.css('option:checked')).getText();
    }

    async userOneSelectLastOption() {
        await this.userOneSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userOneSelectOption(option) {
        await this.userOneSelect.sendKeys(option);
    }

    getUserOneSelect(): ElementFinder {
        return this.userOneSelect;
    }

    async getUserOneSelectedOption() {
        return this.userOneSelect.element(by.css('option:checked')).getText();
    }

    async userTwoSelectLastOption() {
        await this.userTwoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userTwoSelectOption(option) {
        await this.userTwoSelect.sendKeys(option);
    }

    getUserTwoSelect(): ElementFinder {
        return this.userTwoSelect;
    }

    async getUserTwoSelectedOption() {
        return this.userTwoSelect.element(by.css('option:checked')).getText();
    }

    async firstUniqueRequiredRelationSelectLastOption() {
        await this.firstUniqueRequiredRelationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async firstUniqueRequiredRelationSelectOption(option) {
        await this.firstUniqueRequiredRelationSelect.sendKeys(option);
    }

    getFirstUniqueRequiredRelationSelect(): ElementFinder {
        return this.firstUniqueRequiredRelationSelect;
    }

    async getFirstUniqueRequiredRelationSelectedOption() {
        return this.firstUniqueRequiredRelationSelect.element(by.css('option:checked')).getText();
    }

    async secondUniqueRequiredRelationSelectLastOption() {
        await this.secondUniqueRequiredRelationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async secondUniqueRequiredRelationSelectOption(option) {
        await this.secondUniqueRequiredRelationSelect.sendKeys(option);
    }

    getSecondUniqueRequiredRelationSelect(): ElementFinder {
        return this.secondUniqueRequiredRelationSelect;
    }

    async getSecondUniqueRequiredRelationSelectedOption() {
        return this.secondUniqueRequiredRelationSelect.element(by.css('option:checked')).getText();
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

export class TestTwoRelationshipsSameEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-testTwoRelationshipsSameEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-testTwoRelationshipsSameEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
