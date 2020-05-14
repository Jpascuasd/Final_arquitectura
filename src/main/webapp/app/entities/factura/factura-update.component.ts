import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFactura, Factura } from 'app/shared/model/factura.model';
import { FacturaService } from './factura.service';

@Component({
  selector: 'jhi-factura-update',
  templateUrl: './factura-update.component.html'
})
export class FacturaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    estado: [],
    fecha: [],
    modoPago: [],
    tipoFactura: [],
    fechaPago: [],
    cantidad: [],
    sucursal: []
  });

  constructor(protected facturaService: FacturaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ factura }) => {
      if (!factura.id) {
        const today = moment().startOf('day');
        factura.fecha = today;
        factura.fechaPago = today;
      }

      this.updateForm(factura);
    });
  }

  updateForm(factura: IFactura): void {
    this.editForm.patchValue({
      id: factura.id,
      codigo: factura.codigo,
      estado: factura.estado,
      fecha: factura.fecha ? factura.fecha.format(DATE_TIME_FORMAT) : null,
      modoPago: factura.modoPago,
      tipoFactura: factura.tipoFactura,
      fechaPago: factura.fechaPago ? factura.fechaPago.format(DATE_TIME_FORMAT) : null,
      cantidad: factura.cantidad,
      sucursal: factura.sucursal
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const factura = this.createFromForm();
    if (factura.id !== undefined) {
      this.subscribeToSaveResponse(this.facturaService.update(factura));
    } else {
      this.subscribeToSaveResponse(this.facturaService.create(factura));
    }
  }

  private createFromForm(): IFactura {
    return {
      ...new Factura(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      modoPago: this.editForm.get(['modoPago'])!.value,
      tipoFactura: this.editForm.get(['tipoFactura'])!.value,
      fechaPago: this.editForm.get(['fechaPago'])!.value ? moment(this.editForm.get(['fechaPago'])!.value, DATE_TIME_FORMAT) : undefined,
      cantidad: this.editForm.get(['cantidad'])!.value,
      sucursal: this.editForm.get(['sucursal'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFactura>>): void {
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
