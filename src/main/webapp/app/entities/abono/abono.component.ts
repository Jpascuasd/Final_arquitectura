import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAbono } from 'app/shared/model/abono.model';
import { AbonoService } from './abono.service';
import { AbonoDeleteDialogComponent } from './abono-delete-dialog.component';

@Component({
  selector: 'jhi-abono',
  templateUrl: './abono.component.html'
})
export class AbonoComponent implements OnInit, OnDestroy {
  abonos?: IAbono[];
  eventSubscriber?: Subscription;

  constructor(protected abonoService: AbonoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.abonoService.query().subscribe((res: HttpResponse<IAbono[]>) => (this.abonos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAbonos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAbono): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAbonos(): void {
    this.eventSubscriber = this.eventManager.subscribe('abonoListModification', () => this.loadAll());
  }

  delete(abono: IAbono): void {
    const modalRef = this.modalService.open(AbonoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.abono = abono;
  }
}
