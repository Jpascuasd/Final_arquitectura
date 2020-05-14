import { element, by, ElementFinder } from 'protractor';

export class DetalleFacturaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-detalle-factura div table .btn-danger'));
  title = element.all(by.css('jhi-detalle-factura div h2#page-heading span')).first();
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

export class DetalleFacturaUpdatePage {
  pageTitle = element(by.id('jhi-detalle-factura-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  productoInput = element(by.id('field_producto'));
  codigoProductoInput = element(by.id('field_codigoProducto'));
  cantidadInput = element(by.id('field_cantidad'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setProductoInput(producto: string): Promise<void> {
    await this.productoInput.sendKeys(producto);
  }

  async getProductoInput(): Promise<string> {
    return await this.productoInput.getAttribute('value');
  }

  async setCodigoProductoInput(codigoProducto: string): Promise<void> {
    await this.codigoProductoInput.sendKeys(codigoProducto);
  }

  async getCodigoProductoInput(): Promise<string> {
    return await this.codigoProductoInput.getAttribute('value');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
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

export class DetalleFacturaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-detalleFactura-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-detalleFactura'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
