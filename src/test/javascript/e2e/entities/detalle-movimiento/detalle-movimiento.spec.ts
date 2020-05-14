import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DetalleMovimientoComponentsPage,
  DetalleMovimientoDeleteDialog,
  DetalleMovimientoUpdatePage
} from './detalle-movimiento.page-object';

const expect = chai.expect;

describe('DetalleMovimiento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let detalleMovimientoComponentsPage: DetalleMovimientoComponentsPage;
  let detalleMovimientoUpdatePage: DetalleMovimientoUpdatePage;
  let detalleMovimientoDeleteDialog: DetalleMovimientoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DetalleMovimientos', async () => {
    await navBarPage.goToEntity('detalle-movimiento');
    detalleMovimientoComponentsPage = new DetalleMovimientoComponentsPage();
    await browser.wait(ec.visibilityOf(detalleMovimientoComponentsPage.title), 5000);
    expect(await detalleMovimientoComponentsPage.getTitle()).to.eq('fleastoreApp.detalleMovimiento.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(detalleMovimientoComponentsPage.entities), ec.visibilityOf(detalleMovimientoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DetalleMovimiento page', async () => {
    await detalleMovimientoComponentsPage.clickOnCreateButton();
    detalleMovimientoUpdatePage = new DetalleMovimientoUpdatePage();
    expect(await detalleMovimientoUpdatePage.getPageTitle()).to.eq('fleastoreApp.detalleMovimiento.home.createOrEditLabel');
    await detalleMovimientoUpdatePage.cancel();
  });

  it('should create and save DetalleMovimientos', async () => {
    const nbButtonsBeforeCreate = await detalleMovimientoComponentsPage.countDeleteButtons();

    await detalleMovimientoComponentsPage.clickOnCreateButton();

    await promise.all([
      detalleMovimientoUpdatePage.setCodigoInput('codigo'),
      detalleMovimientoUpdatePage.setNombreInput('nombre'),
      detalleMovimientoUpdatePage.setProductoInput('5'),
      detalleMovimientoUpdatePage.setCantidadInput('5'),
      detalleMovimientoUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);

    expect(await detalleMovimientoUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await detalleMovimientoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await detalleMovimientoUpdatePage.getProductoInput()).to.eq('5', 'Expected producto value to be equals to 5');
    expect(await detalleMovimientoUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');
    expect(await detalleMovimientoUpdatePage.getFechaInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fecha value to be equals to 2000-12-31'
    );

    await detalleMovimientoUpdatePage.save();
    expect(await detalleMovimientoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await detalleMovimientoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DetalleMovimiento', async () => {
    const nbButtonsBeforeDelete = await detalleMovimientoComponentsPage.countDeleteButtons();
    await detalleMovimientoComponentsPage.clickOnLastDeleteButton();

    detalleMovimientoDeleteDialog = new DetalleMovimientoDeleteDialog();
    expect(await detalleMovimientoDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.detalleMovimiento.delete.question');
    await detalleMovimientoDeleteDialog.clickOnConfirmButton();

    expect(await detalleMovimientoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
