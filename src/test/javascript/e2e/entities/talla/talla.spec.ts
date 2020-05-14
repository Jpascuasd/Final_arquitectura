import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TallaComponentsPage, TallaDeleteDialog, TallaUpdatePage } from './talla.page-object';

const expect = chai.expect;

describe('Talla e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tallaComponentsPage: TallaComponentsPage;
  let tallaUpdatePage: TallaUpdatePage;
  let tallaDeleteDialog: TallaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tallas', async () => {
    await navBarPage.goToEntity('talla');
    tallaComponentsPage = new TallaComponentsPage();
    await browser.wait(ec.visibilityOf(tallaComponentsPage.title), 5000);
    expect(await tallaComponentsPage.getTitle()).to.eq('fleastoreApp.talla.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tallaComponentsPage.entities), ec.visibilityOf(tallaComponentsPage.noResult)), 1000);
  });

  it('should load create Talla page', async () => {
    await tallaComponentsPage.clickOnCreateButton();
    tallaUpdatePage = new TallaUpdatePage();
    expect(await tallaUpdatePage.getPageTitle()).to.eq('fleastoreApp.talla.home.createOrEditLabel');
    await tallaUpdatePage.cancel();
  });

  it('should create and save Tallas', async () => {
    const nbButtonsBeforeCreate = await tallaComponentsPage.countDeleteButtons();

    await tallaComponentsPage.clickOnCreateButton();

    await promise.all([tallaUpdatePage.setNombreInput('nombre')]);

    expect(await tallaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');

    await tallaUpdatePage.save();
    expect(await tallaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tallaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Talla', async () => {
    const nbButtonsBeforeDelete = await tallaComponentsPage.countDeleteButtons();
    await tallaComponentsPage.clickOnLastDeleteButton();

    tallaDeleteDialog = new TallaDeleteDialog();
    expect(await tallaDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.talla.delete.question');
    await tallaDeleteDialog.clickOnConfirmButton();

    expect(await tallaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
