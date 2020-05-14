import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDetalleFactura, DetalleFactura } from 'app/shared/model/detalle-factura.model';
import { DetalleFacturaService } from './detalle-factura.service';

@Component({
  selector: 'jhi-detalle-factura-update',
  templateUrl: './detalle-factura-update.component.html'
})
export class DetalleFacturaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    producto: [],
    codigoProducto: [],
    cantidad: []
  });

  constructor(protected detalleFacturaService: DetalleFacturaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalleFactura }) => {
      this.updateForm(detalleFactura);
    });
  }

  updateForm(detalleFactura: IDetalleFactura): void {
    this.editForm.patchValue({
      id: detalleFactura.id,
      producto: detalleFactura.producto,
      codigoProducto: detalleFactura.codigoProducto,
      cantidad: detalleFactura.cantidad
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detalleFactura = this.createFromForm();
    if (detalleFactura.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleFacturaService.update(detalleFactura));
    } else {
      this.subscribeToSaveResponse(this.detalleFacturaService.create(detalleFactura));
    }
  }

  private createFromForm(): IDetalleFactura {
    return {
      ...new DetalleFactura(),
      id: this.editForm.get(['id'])!.value,
      producto: this.editForm.get(['producto'])!.value,
      codigoProducto: this.editForm.get(['codigoProducto'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleFactura>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
