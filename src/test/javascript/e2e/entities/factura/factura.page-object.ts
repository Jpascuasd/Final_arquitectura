import { element, by, ElementFinder } from 'protractor';

export class FacturaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-factura div table .btn-danger'));
  title = element.all(by.css('jhi-factura div h2#page-heading span')).first();
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

export class FacturaUpdatePage {
  pageTitle = element(by.id('jhi-factura-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codigoInput = element(by.id('field_codigo'));
  estadoSelect = element(by.id('field_estado'));
  fechaInput = element(by.id('field_fecha'));
  modoPagoSelect = element(by.id('field_modoPago'));
  tipoFacturaSelect = element(by.id('field_tipoFactura'));
  fechaPagoInput = element(by.id('field_fechaPago'));
  cantidadInput = element(by.id('field_cantidad'));
  sucursalInput = element(by.id('field_sucursal'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async setEstadoSelect(estado: string): Promise<void> {
    await this.estadoSelect.sendKeys(estado);
  }

  async getEstadoSelect(): Promise<string> {
    return await this.estadoSelect.element(by.css('option:checked')).getText();
  }

  async estadoSelectLastOption(): Promise<void> {
    await this.estadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFechaInput(fecha: string): Promise<void> {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput(): Promise<string> {
    return await this.fechaInput.getAttribute('value');
  }

  async setModoPagoSelect(modoPago: string): Promise<void> {
    await this.modoPagoSelect.sendKeys(modoPago);
  }

  async getModoPagoSelect(): Promise<string> {
    return await this.modoPagoSelect.element(by.css('option:checked')).getText();
  }

  async modoPagoSelectLastOption(): Promise<void> {
    await this.modoPagoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setTipoFacturaSelect(tipoFactura: string): Promise<void> {
    await this.tipoFacturaSelect.sendKeys(tipoFactura);
  }

  async getTipoFacturaSelect(): Promise<string> {
    return await this.tipoFacturaSelect.element(by.css('option:checked')).getText();
  }

  async tipoFacturaSelectLastOption(): Promise<void> {
    await this.tipoFacturaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFechaPagoInput(fechaPago: string): Promise<void> {
    await this.fechaPagoInput.sendKeys(fechaPago);
  }

  async getFechaPagoInput(): Promise<string> {
    return await this.fechaPagoInput.getAttribute('value');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
  }

  async setSucursalInput(sucursal: string): Promise<void> {
    await this.sucursalInput.sendKeys(sucursal);
  }

  async getSucursalInput(): Promise<string> {
    return await this.sucursalInput.getAttribute('value');
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

export class FacturaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-factura-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-factura'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
