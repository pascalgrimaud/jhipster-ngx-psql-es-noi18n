import { element, by, ElementFinder } from 'protractor';

export class DivisionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-division div table .btn-danger'));
    title = element.all(by.css('jhi-division div h2#page-heading span')).first();

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

export class DivisionUpdatePage {
    pageTitle = element(by.id('jhi-division-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    shortNameInput = element(by.id('field_shortName'));
    numberOfPeopleInput = element(by.id('field_numberOfPeople'));
    divisionTypeSelect = element(by.id('field_divisionType'));
    colorBackgroundInput = element(by.id('field_colorBackground'));
    colorTextInput = element(by.id('field_colorText'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setShortNameInput(shortName) {
        await this.shortNameInput.sendKeys(shortName);
    }

    async getShortNameInput() {
        return this.shortNameInput.getAttribute('value');
    }

    async setNumberOfPeopleInput(numberOfPeople) {
        await this.numberOfPeopleInput.sendKeys(numberOfPeople);
    }

    async getNumberOfPeopleInput() {
        return this.numberOfPeopleInput.getAttribute('value');
    }

    async setDivisionTypeSelect(divisionType) {
        await this.divisionTypeSelect.sendKeys(divisionType);
    }

    async getDivisionTypeSelect() {
        return this.divisionTypeSelect.element(by.css('option:checked')).getText();
    }

    async divisionTypeSelectLastOption() {
        await this.divisionTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

export class DivisionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-division-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-division'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
