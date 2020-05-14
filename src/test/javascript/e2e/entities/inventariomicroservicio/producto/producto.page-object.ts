import { element, by, ElementFinder } from 'protractor';

export class ProductoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-producto div table .btn-danger'));
  title = element.all(by.css('jhi-producto div h2#page-heading span')).first();
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

export class ProductoUpdatePage {
  pageTitle = element(by.id('jhi-producto-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreInput = element(by.id('field_nombre'));
  referenciaInput = element(by.id('field_referencia'));
  descripcionInput = element(by.id('field_descripcion'));
  codigoInput = element(by.id('field_codigo'));
  proveedorInput = element(by.id('field_proveedor'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setReferenciaInput(referencia: string): Promise<void> {
    await this.referenciaInput.sendKeys(referencia);
  }

  async getReferenciaInput(): Promise<string> {
    return await this.referenciaInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion: string): Promise<void> {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput(): Promise<string> {
    return await this.descripcionInput.getAttribute('value');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async setProveedorInput(proveedor: string): Promise<void> {
    await this.proveedorInput.sendKeys(proveedor);
  }

  async getProveedorInput(): Promise<string> {
    return await this.proveedorInput.getAttribute('value');
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

export class ProductoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-producto-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-producto'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
