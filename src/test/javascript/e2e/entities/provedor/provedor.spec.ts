import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProvedorComponentsPage, ProvedorDeleteDialog, ProvedorUpdatePage } from './provedor.page-object';

const expect = chai.expect;

describe('Provedor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let provedorComponentsPage: ProvedorComponentsPage;
  let provedorUpdatePage: ProvedorUpdatePage;
  let provedorDeleteDialog: ProvedorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Provedors', async () => {
    await navBarPage.goToEntity('provedor');
    provedorComponentsPage = new ProvedorComponentsPage();
    await browser.wait(ec.visibilityOf(provedorComponentsPage.title), 5000);
    expect(await provedorComponentsPage.getTitle()).to.eq('fleastoreApp.provedor.home.title');
    await browser.wait(ec.or(ec.visibilityOf(provedorComponentsPage.entities), ec.visibilityOf(provedorComponentsPage.noResult)), 1000);
  });

  it('should load create Provedor page', async () => {
    await provedorComponentsPage.clickOnCreateButton();
    provedorUpdatePage = new ProvedorUpdatePage();
    expect(await provedorUpdatePage.getPageTitle()).to.eq('fleastoreApp.provedor.home.createOrEditLabel');
    await provedorUpdatePage.cancel();
  });

  it('should create and save Provedors', async () => {
    const nbButtonsBeforeCreate = await provedorComponentsPage.countDeleteButtons();

    await provedorComponentsPage.clickOnCreateButton();

    await promise.all([provedorUpdatePage.setCodigoInput('5')]);

    expect(await provedorUpdatePage.getCodigoInput()).to.eq('5', 'Expected codigo value to be equals to 5');

    await provedorUpdatePage.save();
    expect(await provedorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await provedorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Provedor', async () => {
    const nbButtonsBeforeDelete = await provedorComponentsPage.countDeleteButtons();
    await provedorComponentsPage.clickOnLastDeleteButton();

    provedorDeleteDialog = new ProvedorDeleteDialog();
    expect(await provedorDeleteDialog.getDialogTitle()).to.eq('fleastoreApp.provedor.delete.question');
    await provedorDeleteDialog.clickOnConfirmButton();

    expect(await provedorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
