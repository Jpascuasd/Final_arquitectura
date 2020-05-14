import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RolComponentsPage, RolDeleteDialog, RolUpdatePage } from './rol.page-object';

const expect = chai.expect;

describe('Rol e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rolComponentsPage: RolComponentsPage;
  let rolUpdatePage: RolUpdatePage;
  let rolDeleteDialog: RolDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Rols', async () => {
    await navBarPage.goToEntity('rol');
    rolComponentsPage = new RolComponentsPage();
    await browser.wait(ec.visibilityOf(rolComponentsPage.title), 5000);
    expect(await rolComponentsPage.getTitle()).to.eq('fleastoreApp.rol.home.title');
    await browser.wait(ec.or(ec.visibilityOf(rolComponentsPage.entities), ec.visibilityOf(rolComponentsPage.noResult)), 1000);
  });

  it('should load create Rol page', async () => {
    await rolComponentsPage.clickOnCreateButton();
    rolUpdatePage = new RolUpdatePage();
    expect(await rolUpdatePage.getPageTitle()).to.eq('fleastoreApp.rol.home.createOrEditLabel');
    await rolUpdatePage.cancel();
  });

  it('should create and save Rols', async () => {
    const nbButtonsBeforeCreate = await rolComponentsPage.countDeleteButtons();

    await rolComponentsPage.clickOnCreateButton();

    await promise.all([rolUpdatePage.setNombreInput('nombre')]);

    expect(await rolUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');

    await rolUpdatePage.save();
    expect(await rolUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rolComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Rol', async () => {
    const nbButtonsBeforeDelete = await rolComponentsPage.countDeleteButtons();
    await rolComponentsPage.clickOnLastDeleteButton();

    rolDeleteDialog = new RolDeleteDialog();
    expect(await rolDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.rol.delete.question');
    await rolDeleteDialog.clickOnConfirmButton();

    expect(await rolComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
