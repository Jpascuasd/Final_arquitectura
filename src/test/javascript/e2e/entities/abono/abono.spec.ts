import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AbonoComponentsPage, AbonoDeleteDialog, AbonoUpdatePage } from './abono.page-object';

const expect = chai.expect;

describe('Abono e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let abonoComponentsPage: AbonoComponentsPage;
  let abonoUpdatePage: AbonoUpdatePage;
  let abonoDeleteDialog: AbonoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Abonos', async () => {
    await navBarPage.goToEntity('abono');
    abonoComponentsPage = new AbonoComponentsPage();
    await browser.wait(ec.visibilityOf(abonoComponentsPage.title), 5000);
    expect(await abonoComponentsPage.getTitle()).to.eq('fleastoreApp.abono.home.title');
    await browser.wait(ec.or(ec.visibilityOf(abonoComponentsPage.entities), ec.visibilityOf(abonoComponentsPage.noResult)), 1000);
  });

  it('should load create Abono page', async () => {
    await abonoComponentsPage.clickOnCreateButton();
    abonoUpdatePage = new AbonoUpdatePage();
    expect(await abonoUpdatePage.getPageTitle()).to.eq('fleastoreApp.abono.home.createOrEditLabel');
    await abonoUpdatePage.cancel();
  });

  it('should create and save Abonos', async () => {
    const nbButtonsBeforeCreate = await abonoComponentsPage.countDeleteButtons();

    await abonoComponentsPage.clickOnCreateButton();

    await promise.all([
      abonoUpdatePage.setUsuarioInput('5'),
      abonoUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      abonoUpdatePage.setCodigoInput('codigo'),
      abonoUpdatePage.setCantidadValorInput('5')
    ]);

    expect(await abonoUpdatePage.getUsuarioInput()).to.eq('5', 'Expected usuario value to be equals to 5');
    expect(await abonoUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30', 'Expected fecha value to be equals to 2000-12-31');
    expect(await abonoUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await abonoUpdatePage.getCantidadValorInput()).to.eq('5', 'Expected cantidadValor value to be equals to 5');

    await abonoUpdatePage.save();
    expect(await abonoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await abonoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Abono', async () => {
    const nbButtonsBeforeDelete = await abonoComponentsPage.countDeleteButtons();
    await abonoComponentsPage.clickOnLastDeleteButton();

    abonoDeleteDialog = new AbonoDeleteDialog();
    expect(await abonoDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.abono.delete.question');
    await abonoDeleteDialog.clickOnConfirmButton();

    expect(await abonoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
