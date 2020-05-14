import { element, by, ElementFinder } from 'protractor';

export class ListaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lista div table .btn-danger'));
  title = element.all(by.css('jhi-lista div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ListaUpdatePage {
  pageTitle = element(by.id('jhi-lista-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreInput = element(by.id('field_nombre'));
  codigoInput = element(by.id('field_codigo'));
  descripcionInput = element(by.id('file_descripcion'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion: string): Promise<void> {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput(): Promise<string> {
    return await this.descripcionInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ListaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-lista-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-lista'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
