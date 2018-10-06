import { element, by, ElementFinder } from 'protractor';

export class PlaceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-place div table .btn-danger'));
    title = element.all(by.css('jhi-place div h2#page-heading span')).first();

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

export class PlaceUpdatePage {
    pageTitle = element(by.id('jhi-place-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    numberOfSeatsInput = element(by.id('field_numberOfSeats'));
    shortNameInput = element(by.id('field_shortName'));
    colorBackgroundInput = element(by.id('field_colorBackground'));
    colorTextInput = element(by.id('field_colorText'));
    descriptionInput = element(by.id('field_description'));
    preferredDivisionSelect = element(by.id('field_preferredDivision'));
    ownerSelect = element(by.id('field_owner'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setNumberOfSeatsInput(numberOfSeats) {
        await this.numberOfSeatsInput.sendKeys(numberOfSeats);
    }

    async getNumberOfSeatsInput() {
        return this.numberOfSeatsInput.getAttribute('value');
    }

    async setShortNameInput(shortName) {
        await this.shortNameInput.sendKeys(shortName);
    }

    async getShortNameInput() {
        return this.shortNameInput.getAttribute('value');
    }

    async setColorBackgroundInput(colorBackground) {
        await this.colorBackgroundInput.sendKeys(colorBackground);
    }

    async getColorBackgroundInput() {
        return this.colorBackgroundInput.getAttribute('value');
    }

    async setColorTextInput(colorText) {
        await this.colorTextInput.sendKeys(colorText);
    }

    async getColorTextInput() {
        return this.colorTextInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async preferredDivisionSelectLastOption() {
        await this.preferredDivisionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async preferredDivisionSelectOption(option) {
        await this.preferredDivisionSelect.sendKeys(option);
    }

    getPreferredDivisionSelect(): ElementFinder {
        return this.preferredDivisionSelect;
    }

    async getPreferredDivisionSelectedOption() {
        return this.preferredDivisionSelect.element(by.css('option:checked')).getText();
    }

    async ownerSelectLastOption() {
        await this.ownerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ownerSelectOption(option) {
        await this.ownerSelect.sendKeys(option);
    }

    getOwnerSelect(): ElementFinder {
        return this.ownerSelect;
    }

    async getOwnerSelectedOption() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
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

export class PlaceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-place-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-place'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
