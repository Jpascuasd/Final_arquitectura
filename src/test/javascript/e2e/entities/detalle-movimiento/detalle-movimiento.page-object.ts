import { element, by, ElementFinder } from 'protractor';

export class DetalleMovimientoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-detalle-movimiento div table .btn-danger'));
  title = element.all(by.css('jhi-detalle-movimiento div h2#page-heading span')).first();
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

export class DetalleMovimientoUpdatePage {
  pageTitle = element(by.id('jhi-detalle-movimiento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codigoInput = element(by.id('field_codigo'));
  nombreInput = element(by.id('field_nombre'));
  productoInput = element(by.id('field_producto'));
  cantidadInput = element(by.id('field_cantidad'));
  fechaInput = element(by.id('field_fecha'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setProductoInput(producto: string): Promise<void> {
    await this.productoInput.sendKeys(producto);
  }

  async getProductoInput(): Promise<string> {
    return await this.productoInput.getAttribute('value');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
  }

  async setFechaInput(fecha: string): Promise<void> {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput(): Promise<string> {
    return await this.fechaInput.getAttribute('value');
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

export class DetalleMovimientoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-detalleMovimiento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-detalleMovimiento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
