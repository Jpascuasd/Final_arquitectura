import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MarcaComponentsPage, MarcaDeleteDialog, MarcaUpdatePage } from './marca.page-object';

const expect = chai.expect;

describe('Marca e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let marcaComponentsPage: MarcaComponentsPage;
  let marcaUpdatePage: MarcaUpdatePage;
  let marcaDeleteDialog: MarcaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Marcas', async () => {
    await navBarPage.goToEntity('marca');
    marcaComponentsPage = new MarcaComponentsPage();
    await browser.wait(ec.visibilityOf(marcaComponentsPage.title), 5000);
    expect(await marcaComponentsPage.getTitle()).to.eq('fleastoreApp.marca.home.title');
    await browser.wait(ec.or(ec.visibilityOf(marcaComponentsPage.entities), ec.visibilityOf(marcaComponentsPage.noResult)), 1000);
  });

  it('should load create Marca page', async () => {
    await marcaComponentsPage.clickOnCreateButton();
    marcaUpdatePage = new MarcaUpdatePage();
    expect(await marcaUpdatePage.getPageTitle()).to.eq('fleastoreApp.marca.home.createOrEditLabel');
    await marcaUpdatePage.cancel();
  });

  it('should create and save Marcas', async () => {
    const nbButtonsBeforeCreate = await marcaComponentsPage.countDeleteButtons();

    await marcaComponentsPage.clickOnCreateButton();

    await promise.all([marcaUpdatePage.setNombreInput('nombre'), marcaUpdatePage.setDescripcionInput('descripcion')]);

    expect(await marcaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await marcaUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');

    await marcaUpdatePage.save();
    expect(await marcaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await marcaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Marca', async () => {
    const nbButtonsBeforeDelete = await marcaComponentsPage.countDeleteButtons();
    await marcaComponentsPage.clickOnLastDeleteButton();

    marcaDeleteDialog = new MarcaDeleteDialog();
    expect(await marcaDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.marca.delete.question');
    await marcaDeleteDialog.clickOnConfirmButton();

    expect(await marcaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
