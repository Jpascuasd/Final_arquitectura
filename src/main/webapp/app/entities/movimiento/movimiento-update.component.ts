import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMovimiento, Movimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';

@Component({
  selector: 'jhi-movimiento-update',
  templateUrl: './movimiento-update.component.html'
})
export class MovimientoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    fecha: [],
    sucursal: [],
    motivo: [],
    observacion: []
  });

  constructor(protected movimientoService: MovimientoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimiento }) => {
      if (!movimiento.id) {
        const today = moment().startOf('day');
        movimiento.fecha = today;
      }

      this.updateForm(movimiento);
    });
  }

  updateForm(movimiento: IMovimiento): void {
    this.editForm.patchValue({
      id: movimiento.id,
      tipo: movimiento.tipo,
      fecha: movimiento.fecha ? movimiento.fecha.format(DATE_TIME_FORMAT) : null,
      sucursal: movimiento.sucursal,
      motivo: movimiento.motivo,
      observacion: movimiento.observacion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimiento = this.createFromForm();
    if (movimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoService.update(movimiento));
    } else {
      this.subscribeToSaveResponse(this.movimientoService.create(movimiento));
    }
  }

  private createFromForm(): IMovimiento {
    return {
      ...new Movimiento(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      sucursal: this.editForm.get(['sucursal'])!.value,
      motivo: this.editForm.get(['motivo'])!.value,
      observacion: this.editForm.get(['observacion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimiento>>): void {
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
