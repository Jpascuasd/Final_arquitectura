import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProducto, Producto } from 'app/shared/model/inventariomicroservicio/producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'jhi-producto-update',
  templateUrl: './producto-update.component.html'
})
export class ProductoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    referencia: [],
    descripcion: [],
    codigo: [],
    proveedor: [null, [Validators.required]]
  });

  constructor(protected productoService: ProductoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ producto }) => {
      this.updateForm(producto);
    });
  }

  updateForm(producto: IProducto): void {
    this.editForm.patchValue({
      id: producto.id,
      nombre: producto.nombre,
      referencia: producto.referencia,
      descripcion: producto.descripcion,
      codigo: producto.codigo,
      proveedor: producto.proveedor
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.createFromForm();
    if (producto.id !== undefined) {
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }

  private createFromForm(): IProducto {
    return {
      ...new Producto(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      referencia: this.editForm.get(['referencia'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      proveedor: this.editForm.get(['proveedor'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
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
