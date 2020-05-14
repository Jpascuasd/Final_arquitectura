import { element, by, ElementFinder } from 'protractor';

export class MovimientoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-movimiento div table .btn-danger'));
  title = element.all(by.css('jhi-movimiento div h2#page-heading span')).first();
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

export class MovimientoUpdatePage {
  pageTitle = element(by.id('jhi-movimiento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tipoSelect = element(by.id('field_tipo'));
  fechaInput = element(by.id('field_fecha'));
  sucursalInput = element(by.id('field_sucursal'));
  motivoInput = element(by.id('field_motivo'));
  observacionInput = element(by.id('field_observacion'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTipoSelect(tipo: string): Promise<void> {
    await this.tipoSelect.sendKeys(tipo);
  }

  async getTipoSelect(): Promise<string> {
    return await this.tipoSelect.element(by.css('option:checked')).getText();
  }

  async tipoSelectLastOption(): Promise<void> {
    await this.tipoSelect
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

  async setSucursalInput(sucursal: string): Promise<void> {
    await this.sucursalInput.sendKeys(sucursal);
  }

  async getSucursalInput(): Promise<string> {
    return await this.sucursalInput.getAttribute('value');
  }

  async setMotivoInput(motivo: string): Promise<void> {
    await this.motivoInput.sendKeys(motivo);
  }

  async getMotivoInput(): Promise<string> {
    return await this.motivoInput.getAttribute('value');
  }

  async setObservacionInput(observacion: string): Promise<void> {
    await this.observacionInput.sendKeys(observacion);
  }

  async getObservacionInput(): Promise<string> {
    return await this.observacionInput.getAttribute('value');
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

export class MovimientoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-movimiento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-movimiento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
