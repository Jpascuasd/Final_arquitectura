import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DetalleFacturaComponentsPage, DetalleFacturaDeleteDialog, DetalleFacturaUpdatePage } from './detalle-factura.page-object';

const expect = chai.expect;

describe('DetalleFactura e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let detalleFacturaComponentsPage: DetalleFacturaComponentsPage;
  let detalleFacturaUpdatePage: DetalleFacturaUpdatePage;
  let detalleFacturaDeleteDialog: DetalleFacturaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DetalleFacturas', async () => {
    await navBarPage.goToEntity('detalle-factura');
    detalleFacturaComponentsPage = new DetalleFacturaComponentsPage();
    await browser.wait(ec.visibilityOf(detalleFacturaComponentsPage.title), 5000);
    expect(await detalleFacturaComponentsPage.getTitle()).to.eq('fleastoreApp.detalleFactura.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(detalleFacturaComponentsPage.entities), ec.visibilityOf(detalleFacturaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DetalleFactura page', async () => {
    await detalleFacturaComponentsPage.clickOnCreateButton();
    detalleFacturaUpdatePage = new DetalleFacturaUpdatePage();
    expect(await detalleFacturaUpdatePage.getPageTitle()).to.eq('fleastoreApp.detalleFactura.home.createOrEditLabel');
    await detalleFacturaUpdatePage.cancel();
  });

  it('should create and save DetalleFacturas', async () => {
    const nbButtonsBeforeCreate = await detalleFacturaComponentsPage.countDeleteButtons();

    await detalleFacturaComponentsPage.clickOnCreateButton();

    await promise.all([
      detalleFacturaUpdatePage.setProductoInput('producto'),
      detalleFacturaUpdatePage.setCodigoProductoInput('codigoProducto'),
      detalleFacturaUpdatePage.setCantidadInput('cantidad')
    ]);

    expect(await detalleFacturaUpdatePage.getProductoInput()).to.eq('producto', 'Expected Producto value to be equals to producto');
    expect(await detalleFacturaUpdatePage.getCodigoProductoInput()).to.eq(
      'codigoProducto',
      'Expected CodigoProducto value to be equals to codigoProducto'
    );
    expect(await detalleFacturaUpdatePage.getCantidadInput()).to.eq('cantidad', 'Expected Cantidad value to be equals to cantidad');

    await detalleFacturaUpdatePage.save();
    expect(await detalleFacturaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await detalleFacturaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DetalleFactura', async () => {
    const nbButtonsBeforeDelete = await detalleFacturaComponentsPage.countDeleteButtons();
    await detalleFacturaComponentsPage.clickOnLastDeleteButton();

    detalleFacturaDeleteDialog = new DetalleFacturaDeleteDialog();
    expect(await detalleFacturaDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.detalleFactura.delete.question');
    await detalleFacturaDeleteDialog.clickOnConfirmButton();

    expect(await detalleFacturaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
