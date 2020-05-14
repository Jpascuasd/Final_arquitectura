import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MovimientoComponentsPage, MovimientoDeleteDialog, MovimientoUpdatePage } from './movimiento.page-object';

const expect = chai.expect;

describe('Movimiento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let movimientoComponentsPage: MovimientoComponentsPage;
  let movimientoUpdatePage: MovimientoUpdatePage;
  let movimientoDeleteDialog: MovimientoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Movimientos', async () => {
    await navBarPage.goToEntity('movimiento');
    movimientoComponentsPage = new MovimientoComponentsPage();
    await browser.wait(ec.visibilityOf(movimientoComponentsPage.title), 5000);
    expect(await movimientoComponentsPage.getTitle()).to.eq('fleastoreApp.movimiento.home.title');
    await browser.wait(ec.or(ec.visibilityOf(movimientoComponentsPage.entities), ec.visibilityOf(movimientoComponentsPage.noResult)), 1000);
  });

  it('should load create Movimiento page', async () => {
    await movimientoComponentsPage.clickOnCreateButton();
    movimientoUpdatePage = new MovimientoUpdatePage();
    expect(await movimientoUpdatePage.getPageTitle()).to.eq('fleastoreApp.movimiento.home.createOrEditLabel');
    await movimientoUpdatePage.cancel();
  });

  it('should create and save Movimientos', async () => {
    const nbButtonsBeforeCreate = await movimientoComponentsPage.countDeleteButtons();

    await movimientoComponentsPage.clickOnCreateButton();

    await promise.all([
      movimientoUpdatePage.tipoSelectLastOption(),
      movimientoUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      movimientoUpdatePage.setSucursalInput('5'),
      movimientoUpdatePage.setMotivoInput('motivo'),
      movimientoUpdatePage.setObservacionInput('observacion')
    ]);

    expect(await movimientoUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30', 'Expected fecha value to be equals to 2000-12-31');
    expect(await movimientoUpdatePage.getSucursalInput()).to.eq('5', 'Expected sucursal value to be equals to 5');
    expect(await movimientoUpdatePage.getMotivoInput()).to.eq('motivo', 'Expected Motivo value to be equals to motivo');
    expect(await movimientoUpdatePage.getObservacionInput()).to.eq('observacion', 'Expected Observacion value to be equals to observacion');

    await movimientoUpdatePage.save();
    expect(await movimientoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await movimientoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Movimiento', async () => {
    const nbButtonsBeforeDelete = await movimientoComponentsPage.countDeleteButtons();
    await movimientoComponentsPage.clickOnLastDeleteButton();

    movimientoDeleteDialog = new MovimientoDeleteDialog();
    expect(await movimientoDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.movimiento.delete.question');
    await movimientoDeleteDialog.clickOnConfirmButton();

    expect(await movimientoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
