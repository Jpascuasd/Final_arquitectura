import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ListaComponentsPage, ListaDeleteDialog, ListaUpdatePage } from './lista.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Lista e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let listaComponentsPage: ListaComponentsPage;
  let listaUpdatePage: ListaUpdatePage;
  let listaDeleteDialog: ListaDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Listas', async () => {
    await navBarPage.goToEntity('lista');
    listaComponentsPage = new ListaComponentsPage();
    await browser.wait(ec.visibilityOf(listaComponentsPage.title), 5000);
    expect(await listaComponentsPage.getTitle()).to.eq('fleastoreApp.lista.home.title');
    await browser.wait(ec.or(ec.visibilityOf(listaComponentsPage.entities), ec.visibilityOf(listaComponentsPage.noResult)), 1000);
  });

  it('should load create Lista page', async () => {
    await listaComponentsPage.clickOnCreateButton();
    listaUpdatePage = new ListaUpdatePage();
    expect(await listaUpdatePage.getPageTitle()).to.eq('fleastoreApp.lista.home.createOrEditLabel');
    await listaUpdatePage.cancel();
  });

  it('should create and save Listas', async () => {
    const nbButtonsBeforeCreate = await listaComponentsPage.countDeleteButtons();

    await listaComponentsPage.clickOnCreateButton();

    await promise.all([
      listaUpdatePage.setNombreInput('nombre'),
      listaUpdatePage.setCodigoInput('codigo'),
      listaUpdatePage.setDescripcionInput(absolutePath)
    ]);

    expect(await listaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await listaUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await listaUpdatePage.getDescripcionInput()).to.endsWith(
      fileNameToUpload,
      'Expected Descripcion value to be end with ' + fileNameToUpload
    );

    await listaUpdatePage.save();
    expect(await listaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await listaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Lista', async () => {
    const nbButtonsBeforeDelete = await listaComponentsPage.countDeleteButtons();
    await listaComponentsPage.clickOnLastDeleteButton();

    listaDeleteDialog = new ListaDeleteDialog();
    expect(await listaDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.lista.delete.question');
    await listaDeleteDialog.clickOnConfirmButton();

    expect(await listaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
