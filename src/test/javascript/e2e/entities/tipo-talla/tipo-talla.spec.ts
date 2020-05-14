import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoTallaComponentsPage, TipoTallaDeleteDialog, TipoTallaUpdatePage } from './tipo-talla.page-object';

const expect = chai.expect;

describe('TipoTalla e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoTallaComponentsPage: TipoTallaComponentsPage;
  let tipoTallaUpdatePage: TipoTallaUpdatePage;
  let tipoTallaDeleteDialog: TipoTallaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoTallas', async () => {
    await navBarPage.goToEntity('tipo-talla');
    tipoTallaComponentsPage = new TipoTallaComponentsPage();
    await browser.wait(ec.visibilityOf(tipoTallaComponentsPage.title), 5000);
    expect(await tipoTallaComponentsPage.getTitle()).to.eq('fleastoreApp.tipoTalla.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tipoTallaComponentsPage.entities), ec.visibilityOf(tipoTallaComponentsPage.noResult)), 1000);
  });

  it('should load create TipoTalla page', async () => {
    await tipoTallaComponentsPage.clickOnCreateButton();
    tipoTallaUpdatePage = new TipoTallaUpdatePage();
    expect(await tipoTallaUpdatePage.getPageTitle()).to.eq('fleastoreApp.tipoTalla.home.createOrEditLabel');
    await tipoTallaUpdatePage.cancel();
  });

  it('should create and save TipoTallas', async () => {
    const nbButtonsBeforeCreate = await tipoTallaComponentsPage.countDeleteButtons();

    await tipoTallaComponentsPage.clickOnCreateButton();

    await promise.all([tipoTallaUpdatePage.setNombreInput('nombre')]);

    expect(await tipoTallaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');

    await tipoTallaUpdatePage.save();
    expect(await tipoTallaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoTallaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoTalla', async () => {
    const nbButtonsBeforeDelete = await tipoTallaComponentsPage.countDeleteButtons();
    await tipoTallaComponentsPage.clickOnLastDeleteButton();

    tipoTallaDeleteDialog = new TipoTallaDeleteDialog();
    expect(await tipoTallaDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.tipoTalla.delete.question');
    await tipoTallaDeleteDialog.clickOnConfirmButton();

    expect(await tipoTallaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
