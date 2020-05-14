import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRol } from 'app/shared/model/rol.model';
import { RolService } from './rol.service';
import { RolDeleteDialogComponent } from './rol-delete-dialog.component';

@Component({
  selector: 'jhi-rol',
  templateUrl: './rol.component.html'
})
export class RolComponent implements OnInit, OnDestroy {
  rols?: IRol[];
  eventSubscriber?: Subscription;

  constructor(protected rolService: RolService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.rolService.query().subscribe((res: HttpResponse<IRol[]>) => (this.rols = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRols();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRol): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRols(): void {
    this.eventSubscriber = this.eventManager.subscribe('rolListModification', () => this.loadAll());
  }

  delete(rol: IRol): void {
    const modalRef = this.modalService.open(RolDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rol = rol;
  }
}
