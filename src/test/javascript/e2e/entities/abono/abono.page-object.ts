import { element, by, ElementFinder } from 'protractor';

export class AbonoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-abono div table .btn-danger'));
  title = element.all(by.css('jhi-abono div h2#page-heading span')).first();
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

export class AbonoUpdatePage {
  pageTitle = element(by.id('jhi-abono-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  usuarioInput = element(by.id('field_usuario'));
  fechaInput = element(by.id('field_fecha'));
  codigoInput = element(by.id('field_codigo'));
  cantidadValorInput = element(by.id('field_cantidadValor'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUsuarioInput(usuario: string): Promise<void> {
    await this.usuarioInput.sendKeys(usuario);
  }

  async getUsuarioInput(): Promise<string> {
    return await this.usuarioInput.getAttribute('value');
  }

  async setFechaInput(fecha: string): Promise<void> {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput(): Promise<string> {
    return await this.fechaInput.getAttribute('value');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async setCantidadValorInput(cantidadValor: string): Promise<void> {
    await this.cantidadValorInput.sendKeys(cantidadValor);
  }

  async getCantidadValorInput(): Promise<string> {
    return await this.cantidadValorInput.getAttribute('value');
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

export class AbonoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-abono-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-abono'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
