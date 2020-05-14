import { element, by, ElementFinder } from 'protractor';

export class UsuarioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-usuario div table .btn-danger'));
  title = element.all(by.css('jhi-usuario div h2#page-heading span')).first();
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

export class UsuarioUpdatePage {
  pageTitle = element(by.id('jhi-usuario-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreInput = element(by.id('field_nombre'));
  apellidoInput = element(by.id('field_apellido'));
  generoInput = element(by.id('field_genero'));
  rolInput = element(by.id('field_rol'));
  telefonoInput = element(by.id('field_telefono'));
  direccionInput = element(by.id('field_direccion'));

  jobSelect = element(by.id('field_job'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setApellidoInput(apellido: string): Promise<void> {
    await this.apellidoInput.sendKeys(apellido);
  }

  async getApellidoInput(): Promise<string> {
    return await this.apellidoInput.getAttribute('value');
  }

  async setGeneroInput(genero: string): Promise<void> {
    await this.generoInput.sendKeys(genero);
  }

  async getGeneroInput(): Promise<string> {
    return await this.generoInput.getAttribute('value');
  }

  async setRolInput(rol: string): Promise<void> {
    await this.rolInput.sendKeys(rol);
  }

  async getRolInput(): Promise<string> {
    return await this.rolInput.getAttribute('value');
  }

  async setTelefonoInput(telefono: string): Promise<void> {
    await this.telefonoInput.sendKeys(telefono);
  }

  async getTelefonoInput(): Promise<string> {
    return await this.telefonoInput.getAttribute('value');
  }

  async setDireccionInput(direccion: string): Promise<void> {
    await this.direccionInput.sendKeys(direccion);
  }

  async getDireccionInput(): Promise<string> {
    return await this.direccionInput.getAttribute('value');
  }

  async jobSelectLastOption(): Promise<void> {
    await this.jobSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async jobSelectOption(option: string): Promise<void> {
    await this.jobSelect.sendKeys(option);
  }

  getJobSelect(): ElementFinder {
    return this.jobSelect;
  }

  async getJobSelectedOption(): Promise<string> {
    return await this.jobSelect.element(by.css('option:checked')).getText();
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

export class UsuarioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-usuario-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-usuario'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
