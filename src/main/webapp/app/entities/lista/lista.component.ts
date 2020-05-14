import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILista } from 'app/shared/model/lista.model';
import { ListaService } from './lista.service';
import { ListaDeleteDialogComponent } from './lista-delete-dialog.component';

@Component({
  selector: 'jhi-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit, OnDestroy {
  listas?: ILista[];
  eventSubscriber?: Subscription;

  constructor(
    protected listaService: ListaService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.listaService.query().subscribe((res: HttpResponse<ILista[]>) => (this.listas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInListas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILista): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInListas(): void {
    this.eventSubscriber = this.eventManager.subscribe('listaListModification', () => this.loadAll());
  }

  delete(lista: ILista): void {
    const modalRef = this.modalService.open(ListaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lista = lista;
  }
}
