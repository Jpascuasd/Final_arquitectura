import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDetalleMovimiento, DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';

@Component({
  selector: 'jhi-detalle-movimiento-update',
  templateUrl: './detalle-movimiento-update.component.html'
})
export class DetalleMovimientoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    nombre: [],
    producto: [],
    cantidad: [],
    fecha: []
  });

  constructor(
    protected detalleMovimientoService: DetalleMovimientoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalleMovimiento }) => {
      if (!detalleMovimiento.id) {
        const today = moment().startOf('day');
        detalleMovimiento.fecha = today;
      }

      this.updateForm(detalleMovimiento);
    });
  }

  updateForm(detalleMovimiento: IDetalleMovimiento): void {
    this.editForm.patchValue({
      id: detalleMovimiento.id,
      codigo: detalleMovimiento.codigo,
      nombre: detalleMovimiento.nombre,
      producto: detalleMovimiento.producto,
      cantidad: detalleMovimiento.cantidad,
      fecha: detalleMovimiento.fecha ? detalleMovimiento.fecha.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detalleMovimiento = this.createFromForm();
    if (detalleMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleMovimientoService.update(detalleMovimiento));
    } else {
      this.subscribeToSaveResponse(this.detalleMovimientoService.create(detalleMovimiento));
    }
  }

  private createFromForm(): IDetalleMovimiento {
    return {
      ...new DetalleMovimiento(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      producto: this.editForm.get(['producto'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleMovimiento>>): void {
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
